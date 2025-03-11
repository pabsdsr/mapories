import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Session is Null'});
        }
        const accessToken = session.accessToken;
        const email = session.user.email;

        if (!accessToken) {
            return NextResponse.json({ message: email});
        }

        try {
            const oauth2client = new google.auth.OAuth2();
            oauth2client.setCredentials({ access_token: accessToken });

            const drive = google.drive({ version: 'v3', auth: oauth2client });

            const res = await drive.files.list({
                q: "mimeType contains 'image/'",
                fields: "files(id, name, mimeType, thumbnailLink)",
                spaces: 'drive',
            });
            return NextResponse.json({ files: res.data.files });
        } catch (error) {
            return NextResponse.json({ message: "error fetching files" });
        }
       
    } catch (error) {
        return NextResponse.json({ message: 'Error Arrived To EndPoint'});
    }
}