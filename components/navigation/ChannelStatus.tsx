import Image from "next/image";
import Link from "next/link";
import PlaceholderChannelIcon from "@/public/Placeholder_24x24.svg";
import { Radio } from "lucide-react";

export default function ChannelPage({
	NewVideo = false,
	IsLive = false,
}: {
	NewVideo?: boolean;
	IsLive?: boolean;
}) {
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
				className="rounded-full mr-2"
			/>
			<h1 className="text-white text-left mr-2 w-24 truncate">1234567111111</h1>
			<div className="flex size-4 justify-center items-center">
				{NewVideo && !IsLive && (
					<div className="size-1 rounded-full bg-blue-600" />
				)}
				{IsLive && <Radio size={16} color="red" className="" />}
			</div>
		</Link>
	);
}
