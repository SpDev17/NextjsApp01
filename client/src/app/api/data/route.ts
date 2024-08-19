import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest) {
    //return NextResponse.json({ message: 'Blog from Next.js!' })
    return NextResponse.json({ "data": "root data" })
}