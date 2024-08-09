'use client';
import { useUserContext } from "@/context";
import Image from "next/image";

export default function Home() {
 
  const obj = useUserContext();
  return (
    <>
      <nav className="bg-purple-700 text-white flex md:justify-between flex-col md:flex-row min-h-10 items-center">
        <div className="logo mx-auto md:mx-0">
          <Image alt="" src="/vercel.svg" width={"100"} height={"40"}></Image>
        </div>
        <ul className="flex space-x-3 justify-center md:justify-normal">
          <li>Home</li>
          <li>Products</li>
          <li>Contact Us</li>
          <li>About Us</li>
        </ul>
      </nav>
      <main>
        Get started by editing {obj?.isLoading ? "ok" : "no"}
      </main>
      <footer></footer>
    </>
  );
}
