"use client";

import Image from "next/image";
import Link from "next/link";
import {
	Ellipsis,
	Forward,
	Loader,
	Scissors,
	ThumbsDown,
	ThumbsUp,
} from "lucide-react";
import { User, Video } from "@/lib/db/schema";
import SubscribeButton from "./SubscribeButton";
import {
	dislikeVideo,
	likeVideo,
	undislikeVideo,
	unlikeVideo,
} from "@/actions/content/videos";
import { authClient } from "@/lib/auth/auth-client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";

export default function VideoDescriptionHeader({
	videoData,
	channelData,
	refetch,
}: {
	videoData: Video;
	channelData: User;
	refetch: () => void;
}) {
	const {
		isPending: isPending,
		data: sessionData,
		refetch: refetchSession,
	} = useQuery({
		queryKey: [],
		queryFn: () => authClient.getSession(),
	});
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
								}).format(channelData.subscribers.length ?? 0)}{" "}
								subscribers
							</span>
						</div>
					</div>
					{channelData.id === sessionData?.data?.user.id ? (
						<Button asChild variant="outline" className="bg-transparent">
							<Link href={"/studio/channel/" + channelData.id}>Manage</Link>
						</Button>
					) : (
						<SubscribeButton channelId={channelData.id} refetch={refetch} />
					)}
				</div>
				<div className="p-1 m-[-4px] flex flex-row">
					<div className="mb-1 flex flex-row items-center">
						<div className="flex items-center rounded-full bg-neutral-800 h-9">
							{isPending === false &&
							sessionData !== undefined &&
							sessionData !== null ? (
								<button
									className="px-4 flex flex-row items-center h-full hover:bg-neutral-700 rounded-l-full"
									onClick={() => {
										if (
											sessionData.data?.user.likedVideos?.includes(videoData.id)
										) {
											unlikeVideo(videoData.id, sessionData.data?.user.id);
										} else {
											likeVideo(videoData.id, sessionData.data?.user.id ?? "");
										}
										refetchSession();
									}}
								>
									<ThumbsUp
										className="flex size-6 mr-[6px] ml-[-6px]"
										strokeWidth={
											sessionData.data?.user.likedVideos?.includes(videoData.id)
												? 2
												: 1
										}
									/>
									<span>
										{new Intl.NumberFormat("en-US", {
											compactDisplay: "short",
											notation: "compact",
										}).format(videoData.likes)}
									</span>
								</button>
							) : (
								<>
									<Loader className="animate-spin" />
								</>
							)}
							<div className="w-[1px] h-[80%] bg-neutral-500"></div>
							{isPending === false &&
							sessionData !== undefined &&
							sessionData !== null ? (
								<button
									className="h-full w-[52px] flex justify-center items-center hover:bg-neutral-700 rounded-r-full"
									onClick={() => {
										if (
											sessionData.data?.user.disLikedVideos?.includes(
												videoData.id
											)
										) {
											undislikeVideo(videoData.id, sessionData.data?.user.id);
										} else {
											dislikeVideo(
												videoData.id,
												sessionData.data?.user.id ?? ""
											);
										}
										refetchSession();
									}}
								>
									<ThumbsDown
										className="flex size-6"
										strokeWidth={
											sessionData.data?.user.disLikedVideos?.includes(
												videoData.id
											)
												? 2
												: 1
										}
									/>
								</button>
							) : (
								<>
									<Loader className="animate-spin" />
								</>
							)}
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
