import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        return NextResponse.json({ message: 'Data Arrived To EndPoint', data: data });
    } catch (error) {
        return NextResponse.json({ message: 'Error Arrived To EndPoint'});
    }
}