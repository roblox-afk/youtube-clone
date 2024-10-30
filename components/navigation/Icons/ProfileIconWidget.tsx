"use client";

import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { authClient } from "@/lib/auth/auth-client";
import { ChevronRight, LoaderCircle, LogOut, User, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
			{session?.user != null ? (
				<Popover>
					<PopoverTrigger asChild>
						<button
							className="size-10 flex justify-center items-center hover:bg-neutral-800 rounded-full my-1 mx-7"
							onClick={() =>
								session?.user == null ? router.push("/sign-in") : {}
							}
							type="button"
						>
							{session.user.image != null ? (
								<Image
									className="rounded-full object-fill size-10"
									src={session.user.image}
									alt="profile picture"
									width={40}
									height={40}
								/>
							) : (
								<User strokeWidth={1} />
							)}
						</button>
					</PopoverTrigger>
					<PopoverContent className="w-[300px] flex-col space-y-2 mr-4 p-0 bg-neutral-800">
						<div className="p-4 flex flex-row border-b border-neutral-600">
							{session.user.image != null ? (
								<Image
									className="rounded-full size-10 mr-4"
									src={session.user.image}
									alt="profile picture"
									width={40}
									height={40}
								/>
							) : (
								<User strokeWidth={1} />
							)}
							<div className="flex-col flex">
								<h1 className="w-44 truncate">{session.user.name}</h1>
								<h1 className="w-44 truncate">@{session.user.slash}</h1>
								<Link
									href={"/@" + session.user.slash}
									className="text-blue-500 mt-2"
								>
									View your channel
								</Link>
							</div>
						</div>
						<div className="w-full">
							<button className="flex items-center px-4  flex-row h-10 hover:bg-neutral-700 relative w-full">
								<Users strokeWidth={1} className="mr-4" />
								<Label className="">Switch Accounts</Label>
								<ChevronRight strokeWidth={1} className="absolute right-4" />
							</button>
							<button
								className="flex items-center px-4  flex-row h-10 hover:bg-neutral-700 relative w-full"
								onClick={() => authClient.signOut()}
							>
								<LogOut strokeWidth={1} className="mr-4" />
								<Label className="">Sign out</Label>
							</button>
						</div>
						<div className="w-full my-3 h-[1px] bg-neutral-800" />
					</PopoverContent>
				</Popover>
			) : (
				<button
					className="h-10 w-24 border border-neutral-800 p-2 flex justify-center items-center hover:bg-neutral-800 rounded-full my-1 mx-7 font-medium"
					onClick={() => router.push("/sign-in")}
					type="button"
				>
					<User strokeWidth={1} className="mr-1" />
					Sign in
				</button>
			)}
		</Suspense>
	);
}
