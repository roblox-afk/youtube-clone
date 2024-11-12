import { Menu, Search, Mic } from "lucide-react";
import YoutubeStudioImageWhite from "@/public/YouTubeStudio_Logo_White.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { UploadIconWidget, ProfileIconWidget } from "../Icons";
import Link from "next/link";

export default function StudioNavbarContent() {
	const t = useTranslations("Navbar");

	return (
		<div className="flex py-[10px] pl-4 pr-6 w-full h-full justify-between">
			<div className="flex">
				<button className="bg-gray-400 bg-opacity-0 hover:bg-opacity-20 rounded-full flex h-full border-2 border-transparent p-2 mr-4">
					<Menu color="#fff" />
				</button>
				<Link className="flex pt-2 mr-24" href="/">
					<Image
						className="fill-white"
						src={YoutubeStudioImageWhite}
						alt="test"
						width={97}
						height={24}
					/>
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
				<ProfileIconWidget size={32} className="m-0" />
			</div>
		</div>
	);
}
