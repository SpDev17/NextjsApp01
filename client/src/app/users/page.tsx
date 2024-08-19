'use client';
import React from "react";
import TopNav from "../UI/TopNav";
import SideNav from "../UI/SideNav";
import Footer from "../UI/Footer";
const ctrl = () => {
    return (<main className="flex min-h-screen flex-col items-left justify-between p-15">

        <TopNav></TopNav>

        <SideNav></SideNav>


    </main>);
}
const ctrl1 = () => {
    return (<main className="flex min-h-screen flex-col p-6">


        <TopNav></TopNav>
       
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
            <div className="flex flex-col justify-left gap-6 rounded-lg bg-gray-50 px-6 py-1 md:w-1/5 md:px-1">


                <SideNav></SideNav>


            </div>
            <div className="flex items-center justify-left p-6 md:w-4/5 md:px-2 md:py-12 bg-gray-50">
                {/* Add Hero Images Here */}
                sdsdsd
            </div>
        </div>


        <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-400 p-4 md:h-5">
            {<Footer></Footer>}
        </div>
    </main>);
}
export default ctrl1;