import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET(req: NextRequest) {
    //console.log(req);
    //const searchParams = request.nextUrl.searchParams
    //const query = searchParams.get('query')
    // query is "hello" for /api/search?query=hello
    return NextResponse.json({ message: 'Hello c from Next.js!' })
}
export async function POST(request: NextRequest) {
    const res = await request.json();
    const headersList = headers();
    console.log('-------------------------------------------------------------');
    console.log(res);
    console.log('-------------------------------------------------------------');
    //const formData = request.formData();
    //const name = formData.get('name');
    //const email = formData.get('email');
    //console.log(formData);
    console.log('-------------------------------------------------------------');
    return NextResponse.json(res)
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