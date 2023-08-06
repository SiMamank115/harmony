import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ErrorPopup() {
	const router = useRouter();
	useEffect(() => {
		let search = new URLSearchParams(router.asPath.substring(1));
		toast.error(search.get("error"), { delay: 1000 });
		router.replace(router.pathname);
	}, []);
}
