'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Blog = {
  "id"?: string;
  "title"?: string;
  "content"?: string;
}
async function getBlogByTitle(title: string) {
  const response = await fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL+`/api/blogs/${title}`, {
    headers: {
      Accept: "application/json",
      method: "GET"
    }
  });
  return response.json();
}
const User = ({ params }: { params: { blog: string } }) => {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState<boolean>(false);
  const getblogbytitle = async () => {
    try {
      setLoading(true);
      const response = await fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL+`/api/blogs/${params.blog}`, {
        headers: {
          Accept: "application/json",
          method: "GET"
        }
      });
      debugger;
      if (response) {
        const data = await response.json();
        console.log(data);
        setBlog(data['blog'][0]);
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getblogbytitle()
  }, [])
  return (<div className="flex items-center justify-left p-6 md:w-4/5 md:px-2 md:py-12 bg-gray-50">

    <main>
      {!loading && <div>
        {blog && <h1>{blog?.title}</h1>}
        <br></br>
        {blog && <p>{blog?.content}</p>}
        <Link href={"/dashboards/d1/blogs"}>Back</Link></div>
      }
      {loading && <div>Loading....</div>}
    </main>
  </div>);
}

export default User;