import { NextRequest } from "next/server";
import Link from 'next/link';
function Blog({ params }: { params: { blog: string[] } }) {
  return <div className="flex items-center justify-left p-6 md:w-4/5 md:px-2 md:py-12 bg-gray-50">My Post: {params.blog}</div>
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
const user = async ({ params }: { params: { blog: string } }) => {
  //console.log(params.blog);
  console.log('-----------------Blog-----------------------');
  let data: any = await getBlogByTitle(params.blog);
  let blog: any = data['blog'][0];
  //console.log(data);
  function CreateMarkUp(c: any) {
    return { __html: c };
  }
  return (<div className="flex items-center justify-left p-6 md:w-4/5 md:px-2 md:py-12 bg-gray-50">

    <main>Server <hr></hr>
      <h1>{blog['title']}</h1>
      <br></br>
      <p dangerouslySetInnerHTML={CreateMarkUp(blog['content'])}></p>
      <Link href={"/dashboards/d1/blogs"}>Back</Link>
    </main>
  </div>);
}

export default user;