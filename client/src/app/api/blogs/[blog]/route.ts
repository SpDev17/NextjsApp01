import { NextRequest, NextResponse } from 'next/server'
import data from '@/app/jsondata/jsframework.json';

export async function GET(req: NextRequest, context: any) {
    const { params } = context;
    const blog = data.filter(x => params.blog.toLowerCase() == x.title.toString().toLowerCase());
    return NextResponse.json({ blog })
}
