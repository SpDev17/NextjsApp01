import { useRouter } from "next/router";
const user = () => {
    const router = useRouter();
    const id = router.query.id;
    return <p>User : {id}</p>
}

export default user;