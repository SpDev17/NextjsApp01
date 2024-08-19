import React from "react";
import Link from "next/link";
//import { useState } from 'react'

async function getAllBlogs() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api/blogs",
    {
      headers: {
        Accept: "application/json",
        method: "GET",
      },
    }
  );
  return response.json();
}
/**/

export default async function Blogs() {
  console.log("-----------------Blogs-----------------------");
  let data: any = await getAllBlogs();
  let blogs: [] = [];
  if (blogs) {
    console.log(blogs);
    blogs = data.data;
  }
  return (
    <div className="flex items-top justify-left p-6 md:w-4/5 md:px-2 md:py-12 bg-gray-50 rounded-lg">
      <div>
        <ul>
          {blogs
            ? blogs.map((item) => (
                <li key={item["id"]}>
                  <Link href={`/dashboards/d1/blogs/${item["title"]}`}>
                    {item["title"]}
                  </Link>
                </li>
              ))
            : "No Blogs"}
        </ul>
      </div>
    </div>
  );
}
