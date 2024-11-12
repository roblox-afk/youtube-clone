"use client";

import { authClient } from "@/lib/auth/auth-client";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StudioRedirectPage() {
	const { data: session, isPending } = authClient.useSession();
	const router = useRouter();

	useEffect(() => {
		if (!session && !isPending) {
			router.push("/");
		} else if (session && !isPending) {
			router.push("/studio/channel/" + session.user.id);
		}
	}, [isPending, router, session]);

	return (
		<div className="flex w-full h-full justify-center items-center">
			<LoaderCircle width={64} height={64} className="size-16 animate-spin" />
		</div>
	);
}
