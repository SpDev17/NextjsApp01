'use client';
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const SessionWrapper = ({ children, session }: any): any => {
    return (
        <SessionProvider session={session} >
            {children}
        </SessionProvider>

    )
}

export default SessionWrapper
