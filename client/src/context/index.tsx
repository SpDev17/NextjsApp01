'use client';
import * as React from 'react';
import { createContext, useState, useContext } from "react";

export interface User {
    id: string;
    name?: string;
    avatar?: string;
    email?: string;

    [key: string]: unknown;
}

export interface UserContextValue {
    user: User | null;
    error: string | null;
    //name: string | null;
    isLoading: boolean;
    checkSession?: () => Promise<void>;
}
export const UserContext = React.createContext<UserContextValue | undefined>(undefined);
//export const UserContext = React.createContext<any>(undefined);
export interface UserProviderProps {
    children: React.ReactNode;
}
export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
    //let [state, setState] = useState({ hello: 'world' });
    const [state, setState] = React.useState<{ user: User | null; error: string | null; isLoading: boolean }>({
        user: null,
        error: null,
        isLoading: true,
    });
    const checkSession = React.useCallback(async (): Promise<void> => {

    }, []);
    return (<UserContext.Provider value={{ ...state, checkSession }}>{children}</UserContext.Provider>)
}

export function AppWrapper({ children }: { children: React.ReactNode; }) {
    let [name, setName] = useState('saurabh');
    //return (<UserContext.Provider value={{ name, setName }}>{children}</UserContext.Provider>)
}

export function useUserContext() {
    return useContext(UserContext)
}
export const UserConsumer = UserContext.Consumer;