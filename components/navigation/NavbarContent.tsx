"use client";
import { Menu, Search, Mic } from "lucide-react";
import YoutubeImageLight from "@/public/YouTube_Logo_White.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
	NotificationIconWidget,
	UploadIconWidget,
	ProfileIconWidget,
} from "./Icons";
import { useSidebarStore } from "../providers/sidebarStateProvider";
import Link from "next/link";

export default function NavBarContent() {
	const t = useTranslations("Navbar");

	const { toggle } = useSidebarStore((state) => state);

	return (
		<>
			<div className="flex">
				<button
					className="bg-gray-400 bg-opacity-0 hover:bg-opacity-20 p-2 rounded-full flex h-full"
					onClick={() => toggle()}
				>
					<Menu color="#fff" />
				</button>
				<Link className="flex" href="/">
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
				</Link>
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
				<UploadIconWidget />
				<NotificationIconWidget />
				<ProfileIconWidget />
			</div>
		</>
	);
}
