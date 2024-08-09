import { NextRequest, NextResponse } from 'next/server'


export async function GET(req: NextRequest) {
    //console.log(req);
    return NextResponse.json({ message: 'Hello from Next.js!' })
}
export async function POST(req: NextRequest) {
    //console.log(req);
    return NextResponse.json({ message: 'Hello from Next.js!' })
}
export async function PATCH(req: NextRequest) {
    //console.log(req);
    return NextResponse.json({ message: 'Hello from Next.js!' })
}

/**/
/*
export function GET1 (req:any,res:any){
    Response.json({Msg:"your message"}, {status:200});
}
/**/