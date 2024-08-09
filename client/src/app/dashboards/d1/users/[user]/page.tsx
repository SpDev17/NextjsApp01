
//import { useRouter } from "next/router";
const user = ({ params }: { params: { user: string } }) => {
    //const router = useRouter();
    return (<div className="flex items-center justify-left p-6 md:w-4/5 md:px-2 md:py-12 bg-gray-50">User :  {params.user}</div>);
}

export default user;