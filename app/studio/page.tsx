"use client";

import { authClient } from "@/lib/auth/auth-client";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudioRedirectPage() {
	const { data: session, isPending } = authClient.useSession();
	const router = useRouter();

	if (!session && isPending) {
		return (
			<div className="flex w-full h-full justify-center items-center">
				<LoaderCircle width={64} height={64} className="size-16 animate-spin" />
			</div>
		);
	}

	if (!session && !isPending) {
		router.replace("/");
	} else if (session && !isPending) {
		router.replace("/studio/channel/" + session.user.id);
	}

	return <div></div>;
}
