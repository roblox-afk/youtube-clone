"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
	Ellipsis,
	Forward,
	Scissors,
	ThumbsDown,
	ThumbsUp,
} from "lucide-react";
import { User, Video } from "@/lib/db/schema";
import SubscribeButton from "./SubscribeButton";

export default function VideoDescriptionHeader({
	videoData,
	channelData,
}: {
	videoData: Video;
	channelData: User;
}) {
	return (
		<div>
			<span className="text-xl font-bold">{videoData.title}</span>
			<div className="mt-3 flex flex-row justify-between">
				<div className="mr-3 flex-row flex items-center">
					<div className="mr-6 flex flex-row w-fit h-[43px]">
						<Link
							href={"@" + channelData.slash}
							className="rounded-full w-fit h-full flex"
						>
							<Image
								src={channelData.image ?? ""}
								alt="channel Profile"
								width={40}
								height={40}
								className="mr-3 size-10 flex rounded-full object-cover"
							/>
						</Link>
						<div className="flex flex-col">
							<div className="flex flex-row h-[22px]">
								<Link href={"@" + channelData.slash} className="pr-[1px]">
									{channelData.name}
								</Link>
							</div>
							<span className="text-xs text-neutral-400 mr-1">
								{new Intl.NumberFormat("en-US", {
									compactDisplay: "short",
									notation: "compact",
								}).format(channelData.subscribers ?? 0)}{" "}
								subscribers
							</span>
						</div>
					</div>
					<SubscribeButton channelId={channelData.id} />
				</div>
				<div className="p-1 m-[-4px] flex flex-row">
					<div className="mb-1 flex flex-row items-center">
						<div className="flex items-center rounded-full bg-neutral-800 h-9">
							<button className="px-4 flex flex-row items-center h-full hover:bg-neutral-700 rounded-l-full">
								<ThumbsUp
									className="flex size-6 mr-[6px] ml-[-6px]"
									strokeWidth={1}
								/>
								<span>
									{new Intl.NumberFormat("en-US", {
										compactDisplay: "short",
										notation: "compact",
									}).format(videoData.likes)}
								</span>
							</button>
							<div className="w-[1px] h-[80%] bg-neutral-500"></div>
							<button className="h-full w-[52px] flex justify-center items-center hover:bg-neutral-700 rounded-r-full">
								<ThumbsDown className="flex size-6" strokeWidth={1} />
							</button>
						</div>
						<button className="ml-2 px-4 rounded-full h-9 bg-neutral-800 hover:bg-neutral-700 flex flex-row items-center">
							<Forward
								className="flex size-6 mr-[6px] ml-[-6px]"
								strokeWidth={1}
							/>
							<span>Share</span>
						</button>
						<button className="ml-2 px-4 rounded-full h-9 bg-neutral-800 hover:bg-neutral-700 flex flex-row items-center">
							<Scissors
								className="flex size-6 mr-[6px] ml-[-6px]"
								strokeWidth={1}
							/>
							<span>Clip</span>
						</button>
						<button className="ml-2 rounded-full size-9 bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center">
							<Ellipsis className="flex size-6" strokeWidth={1} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
