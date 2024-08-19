'use client';
import Link from 'next/link';
import Image from "next/image";
import { User } from 'next-auth';
import { useSession, signIn, signOut } from 'next-auth/react'
import { redirect } from 'next/navigation';

function TopNav(objProps: any, logOut: any) {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
            console.log('user is not logged in');
            //redirect('/api/auth/signin?');
        },
    });
    console.log(session);
    return (
        <header className="bg-purple-200 border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-lg">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl">Tailblocks</span>
                </a>
                <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                    <Link href={"/dashboards/d1"} className="mr-5 hover:text-gray-900" aria-current="page">Home</Link>
                    <Link href={"/dashboards/d2"} className="mr-5 hover:text-gray-900" aria-current="page">Home 2</Link>
                    <Link href={"/dashboards/inventory/dashboard"} className="mr-5 hover:text-gray-900" aria-current="page">Inventory</Link>
                    <Link href={"/dashboards/d1/about"} scroll={false} className="mr-5 hover:text-blue-900">About Us</Link>
                    <Link href={"/dashboards/d1/contact"} scroll={false} className="mr-5 hover:text-gray-900">Contact</Link>



                    <ul className="flex space-x-3 justify-center md:justify-normal">

                        <li>{status === 'authenticated' ? <><span>{session?.user?.email}</span> <input value={"Sign Out"} type="button" onClick={() => signOut()}></input> </> : <input value={"Sign In"} type="button" onClick={() => signIn()}></input>}</li>
                    </ul>
                </nav>
            </div>
        </header>

    );
}
export default TopNav;