import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const data = await request.json();

        const title = data.title;
        const description = data.description;
        const fullAddress = data.fullAddress;
        const imageBlob = data.image;

        if(!session) {
            return NextResponse.json({ message: 'User is not logged in'});
        }
        const email = session.user.email;
        

        const supabase = await createClient();
        const { data: fetchedUser } = await supabase.from("user").select().eq('email', email).single();

        if(fetchedUser){
            console.log("we fetched the user", fetchedUser.id)
        }else{
            console.log("we did not get a user");
        }
        const user_id = fetchedUser.id;
        const { data: pin, error } = await supabase.from('pin').insert([{ user_id: user_id, title: title, description: description, address: fullAddress, image: imageBlob}]);
        
        if(error){
            console.error(error);
        }

        return NextResponse.json({ message: 'Data Arrived To EndPoint'});
    } catch (error) {
        return NextResponse.json({ message: 'Error Arrived To EndPoint'});
    }
}