"use client";
import { Menu, Search, Mic, Upload, Bell, User } from "lucide-react";
import YoutubeImageDark from "@/public/YouTube_Logo_Black.svg";
import YoutubeImageLight from "@/public/YouTube_Logo_White.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function NavBar({ isLoggedIn }: { isLoggedIn: boolean }) {
	const t = useTranslations("Navbar");
	const router = useRouter();
	return (
		<div className="flex h-14 mx-4 items-center justify-between text-white">
			<div className="flex">
				<button className="bg-gray-400 bg-opacity-0 hover:bg-opacity-20 p-2 rounded-full flex h-full">
					<Menu color="#fff" />
				</button>
				<a className="flex" href="">
					<Image
						className="ml-4 fill-white"
						src={YoutubeImageLight}
						alt="test"
						width={90}
						height={20}
					/>
					<span className="text-[10px] ml-1 mt-1 text-[#AAAAAA] font-semibold font-sans">
						NO
					</span>
				</a>
			</div>
			<div className="sm:flex h-10 items-center hidden">
				<div className="h-full ml-8 pl-2 bg-stone-950 border-neutral-700 float-start border has-[:focus]:border-blue-400 has-[:focus]:ml-0 rounded-l-full items-center flex flex-row-reverse left-2">
					<input
						className="flex h-full ~sm/lg:~w-32/[32rem] placeholder-neutral-500 peer bg-transparent focus:outline-none p-2 placeholder:font-medium"
						type="text"
						placeholder={t("searchPlaceholder")}
					/>
					<Search
						strokeWidth={1}
						color="#fff"
						className="peer-focus:block hidden ml-2"
					/>
				</div>
				<button className="bg-neutral-800 border border-l-0 border-neutral-700 rounded-r-full h-full items-center flex">
					<Search
						strokeWidth={1}
						color="#fff"
						className="peer-focus:block mx-5"
					/>
				</button>
				<div className="flex items-center justify-center rounded-full bg-neutral-800 mx-4 h-10 w-10 hover:bg-neutral-700">
					<Mic color="#fff" strokeWidth={1} className="" />
				</div>
			</div>
			<div className="flex items-center space-x-3">
				<div className="size-10 hover:bg-neutral-800 rounded-full flex justify-center items-center">
					<Upload strokeWidth={1} />
				</div>
				<div className="size-10 hover:bg-neutral-800 rounded-full flex relative justify-center items-center">
					<Bell strokeWidth={1} className="" />
					<span className="absolute top-0 right-[-4px] bg-red-600 rounded-full text-xs border h-4 w-7 flex justify-center items-center border-red-900">
						99+
					</span>
				</div>
				<button
					className="size-10 flex justify-center items-center hover:bg-neutral-800 rounded-full my-1 mx-7"
					onClick={() => router.push("/sign-in")}
					type="button"
				>
					{/* //TODO: Get Profile Picture if signed in. */}
					{isLoggedIn ? (
						<Image
							className="rounded-full"
							src={"https://placehold.co/40x40"}
							alt="profile picture"
							width={40}
							height={40}
						/>
					) : (
						<User strokeWidth={1} />
					)}
				</button>
			</div>
		</div>
	);
}
