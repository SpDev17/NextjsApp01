import NextAuth from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next"
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";

const handler = NextAuth({
    providers: [GithubProvider({ clientId: process.env.Github_clientId as string, clientSecret: process.env.Github_clientSecret as string }),
    GoogleProvider({ clientId: process.env.Google_clientId as string, clientSecret: process.env.Google_clientSecret as string }),
    AzureADProvider({
        clientId: process.env.AzureAD_clientId as string,
        clientSecret: process.env.AzureAD_SecretValue as string,
        tenantId: process.env.AzureAD_TenantId as string,
        authorization: {
            params: { scope: 'openid email profile User.Read  offline_access' },
        },
        httpOptions: { timeout: 10000 },
    }),
    CredentialsProvider({
        id: "domain-login",
        name: "Credentials",
        async authorize(credentials: any) {

            const credentialDetails = {
                email: credentials.username,
                password: credentials.password,
            };
            const promise = await fetch(`http://localhost:3000/api/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentialDetails)
            });
            let response = await promise.json();
            /*
                        fetch(`http://localhost:3000/api/login`, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(credentialDetails)
                        }).then(response => response.json())
                            .then(response => {
                                console.log(response);
                                debugger;
            
                                if (response.status != 200) {
                                    const user = {
                                        
                                    }
                                    return user as any
                                }
                                else {
            
                                    
                                    const user = {
                                       
                                    }
                                    return user as any
            
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                                const user = {
                                   
                                }
                                return user as any
                            });;
            */
            const user = response;
            if (response.status != 200) {
                return null;
            } else {
                return response.user as any
            }

        },
        credentials: {
            username: { label: "Email", type: "text ", placeholder: "email" },
            password: { label: "Password", type: "password", placeholder: "password" },
        },
    })
    ],
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    theme: {
        colorScheme: "dark",
    },
    callbacks: {
        async jwt({ token, user, session, trigger }) {
            //console.log('jwt callback', { token, user, session });
            if (trigger === 'update' && session?.name) {
                token.name = session.name;
            }
            if (user) {
                token.first_name = user.first_name
                return {
                    ...token,
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    groups: user.groups,
                    email:user.email
                }
            }
            //update the user in the database

            return token;
        },
        async session({ session, token, user }) {
            //console.log('session callback', { session, token, user });
            //https://www.youtube.com/watch?v=bkUmN9TH_hQ
            //update Next Auth - JWT & Session Callback & How to Update User Session
            return {
                ...session, user: {
                    ...session.user,
                    first_name: token.first_name,
                    last_name: token.last_name,
                    groups: token.groups,
                    name: token.name,
                    email:token.email
                }
            }
            return session;
        },
    }
})

export { handler as GET, handler as POST }