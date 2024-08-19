"use client";
import { useUserContext } from "@/context";
import Image from "next/image";

export default function Home() {
  const obj = useUserContext();
  return <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-5 grid-template-rows">
    <div className="row-span-3 xl:row-span-6 bg-gray-500"></div>
    <div className="row-span-3 xl:row-span-6 bg-gray-500"></div>
    <div className="row-span-2 xl:row-span-3 bg-gray-500 col-span-1 md:col-span-2 xl:col-span-1"></div>
    <div className="row-span-3 bg-gray-500"></div>
    <div className="bg-gray-500 md:row-span-1 xl:row-span-2 "></div>
    <div className="bg-gray-500 md:row-span-1 xl:row-span-2 "></div>
    <div className="bg-gray-500 md:row-span-1 xl:row-span-2 "></div>
  </div>;
}
