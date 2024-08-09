import { NextRequest, NextResponse } from 'next/server'
import data from '@/app/jsondata/jsframework.json';


export async function GET(req: NextRequest) {    
    //return NextResponse.json({ message: 'Blog from Next.js!' })
    return NextResponse.json({ data })
}