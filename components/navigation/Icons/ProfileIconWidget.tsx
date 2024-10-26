"use client";

import { authClient } from "@/lib/auth/auth-client";
import { LoaderCircle, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function ProfileIconWidget() {
	const router = useRouter();
	const { data: session } = authClient.useSession();
	return (
		<Suspense
			fallback={
				<LoaderCircle width={40} height={40} className="animate-spin" />
			}
		>
			<button
				className="size-10 flex justify-center items-center hover:bg-neutral-800 rounded-full my-1 mx-7"
				onClick={() => (session?.user == null ? router.push("/sign-in") : {})}
				type="button"
			>
				{session?.user.image != null ? (
					<Image
						className="rounded-full"
						src={session?.user.image}
						alt="profile picture"
						width={40}
						height={40}
					/>
				) : (
					<User strokeWidth={1} />
				)}
			</button>
		</Suspense>
	);
}
