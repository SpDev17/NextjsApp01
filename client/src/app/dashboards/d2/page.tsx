'use client';

import Image from "next/image";
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home() {

  //const obj = useSession();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      console.log('user is not logged in');
    },
  });
  console.log(session);
  /*
    useEffect(() => {
      if (status === "unauthenticated") Router.replace('/api/auth/signin')
    }, [status])
  */

  return (
    <>
     
     <div className="flex items-center justify-left p-6 md:w-4/5 md:px-2 md:py-12 bg-gray-50">Dashboard 2 Home page</div>
     
    </>
  );
}
