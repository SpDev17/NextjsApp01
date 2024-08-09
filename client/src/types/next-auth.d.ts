import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session extends DefaultSession {
        user: {
            /** The user's postal address. */
            id: string,
            first_name: string
            last_name: string
            groups: any
        } & DefaultSession
    }

    interface User extends DefaultUser {
        first_name: string;
        last_name: string;
        groups: any;
    }
    /**
     * Usually contains information about the provider being used
     * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
     */

}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        first_name?: string;
        last_name?: string
        groups?: any
    }
}