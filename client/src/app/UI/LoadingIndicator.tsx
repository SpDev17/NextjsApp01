import { useRouter } from "next/navigation";
import { useEffect, useOptimistic } from "react";

export function LoadingIndicator() {
    const router = useRouter();
    const [loading, setLoading] = useOptimistic(false);
    useEffect(() => {
        if (router.push.name === "patched") return;
        const push = router.push;
        router.push = function patched(...args) {
            setLoading(true);
            push.apply(history, args);
        };
    }, []);

    return loading && <div className="bg-red-400 h-1 fixed inset-0 animate-pulse"></div>;
}