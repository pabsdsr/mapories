import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const formData = await request.formData();

        const title = formData.get('title');
        const description = formData.get('description');
        const fullAddress = formData.get('fullAddress');
        const imageBlob = formData.get('image');

        if (!(imageBlob instanceof Blob)) {
            throw new Error('Expected image to be a blob or file')
        }

        const contentType = imageBlob.type;

        const arrayBuffer = await imageBlob.arrayBuffer();


        if(!session) {
            return NextResponse.json({ message: 'User is not logged in'});
        }

        const geocodingResponse = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${fullAddress}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`);
        const geocodingData = await geocodingResponse.json();

        const first_result = geocodingData["features"][0]
        const coordinates = first_result["geometry"]["coordinates"]
        const latitude = coordinates[1]
        const longitude = coordinates[0]

        const email = session.user.email;
        

        const supabase = await createClient();
        const { data: fetchedUser } = await supabase.from("user").select().eq('email', email).single();

        const user_id = fetchedUser.user_id;

        const { data: pin, error } = await supabase.from('pin').insert([{ user_id: user_id, title: title, description: description,
             address: fullAddress, longitude: longitude, latitude: latitude, content_type: contentType}]).select();
        
        if(error){
            console.error(error);
        }

        if (pin) {
            const insertedPin = pin[0];
            const insertedPinId = insertedPin.id;
            const { data, error } = await supabase
            .storage
            .from('mapories')
            .upload(`users/${user_id}/pins/${insertedPinId}`, arrayBuffer, {
                contentType: contentType
            })

            if(error){
                console.error('Upload Error: ', error);
            }
        }

        return NextResponse.json({ message: 'Data Arrived To EndPoint'});
    } catch (error) {
        return NextResponse.json({ message: 'Error Arrived To EndPoint'});
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session) {
            return NextResponse.json({ message: 'Invalid session, please log in.'});
        }

        const email = session.user.email;
        const supabase = await createClient();
        const { data: fetchedUser } = await supabase.from("user").select().eq('email', email).single();


        // if (fetchedUser) {
        //     console.log("we fetched the user", fetchedUser.user_id)
        // }else{
        //     console.log("we did not get a user");
        // }

        const user_id = fetchedUser.user_id;
        const { data: fetchedPins, error } = await supabase.from("pin").select().eq('user_id', user_id);

        if(error){
            throw error;
        }

        const { data: pinImages, error: storageError} = await supabase
            .storage
            .from('mapories')
            .list(`users/${user_id}/pins/`);

        if(storageError){
            console.log('Storage Error: ', storageError)
        }

        if(!pinImages){
            return NextResponse.json({ "Null Pin Images": 404});
        }

        const pinsWithImages = fetchedPins.map(pin => {

            const matchingFiles = pinImages.filter(file => 
                file.name === `${pin.id}`
            );
            
            const imageUrls = matchingFiles.map(file => {
                const { data } = supabase
                    .storage
                    .from('mapories')
                    .getPublicUrl(`users/${user_id}/pins/${file.name}`);
                return data.publicUrl;
            });
            
            return {
                ...pin,
                images: imageUrls
            };
        });



        return NextResponse.json({ message: pinsWithImages});

    } catch (error) {
        return NextResponse.json({ message: error});
    }
}