import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        // const data = await request.json();

        // const id = data.id;


        if(!session) {
            return NextResponse.json({ message: 'User is not logged in'});
        }


        const email = session.user.email;
        

        const supabase = await createClient();
        const { data: fetchedPins } = await supabase.from("pin").select().eq('user_id', 1);
    

        return NextResponse.json({ message: fetchedPins});
    } catch (error) {
        return NextResponse.json({ message: 'Error Arrived To EndPoint'});
    }
}