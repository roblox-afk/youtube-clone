import Image from "next/image";
import Link from "next/link";
import PlaceholderChannelIcon from "@/public/Placeholder_24x24.svg";
import { Radio } from "lucide-react";

export default function ChannelPage() {
	let NewVideo: boolean = true;
	let IsLive: boolean = true;
	return (
		<Link
			href={"#"}
			className="w-full flex px-3 h-10 hover:bg-neutral-700 items-center rounded-xl relative justify-between"
		>
			<Image
				src={PlaceholderChannelIcon}
				alt="Channel Logo"
				width={24}
				height={24}
				className="rounded-full"
			/>
			<h1 className="text-white">1234567</h1>
			{NewVideo && !IsLive && (
				<div className="flex right-0 mx-[6px] justify-self-end size-1 rounded-full bg-blue-600" />
			)}
			{IsLive && <Radio size={16} color="red" className="animate-pulse" />}
		</Link>
	);
}
