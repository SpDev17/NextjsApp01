import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { JWT } from 'next-auth/jwt';


export default withAuth(
    (req: NextRequest & { nextauth: { token: JWT | null } }) => {
        console.log('-------------------Inside middleware---------------------------------');
        //console.log(req.nextUrl.pathname);
        //console.log(req.nextauth.token);
        console.log('-------------------ends---------------------------------');
        if (req.nextUrl.pathname.startsWith('/auth') || req.nextUrl.pathname.startsWith('/_next')) {

            return NextResponse.next();
        }
        if (!req.nextauth.token) {
            const loginUrl = new URL("/api/auth/signin", req.url)
            loginUrl.searchParams.set('from', req.nextUrl.pathname)
            return NextResponse.redirect(loginUrl)
        }
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized({ token, req }) {
                if (token)
                    return true;
                else
                    return false;
            },
        }

    },

);

/*
export default withAuth(

    function middleware(request: NextRequestWithAuth) {
        console.log('-------------------Inside middleware---------------------------------');
        console.log(request.nextUrl.pathname);
        console.log(request.nextauth.token);
        console.log('-------------------ends---------------------------------');
    }, {
    authorized() {
        return true
    },
}
)
*/

export const config = {
    matcher: ["/dashboards/d1/users", "/dashboards/d2/:path*", "/api/data/:path*"]
}