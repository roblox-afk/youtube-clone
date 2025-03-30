"use client";
import { getChannel } from "@/actions/content/channel";
import { getVideo } from "@/actions/content/videos";
import VideoPlayer from "@/components/VideoPlayer";
import VideoDescriptionHeader from "@/components/watch/VideoDescriptionHeader";
import useMetadata from "@/lib/useMetadata";
import { cn, FormatTimeSince } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2, SquarePlay, UserSquare } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function WatchVideoClientPage() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const router = useRouter();
	const [descriptionExpanded, setDescriptionExpanded] =
		useState<boolean>(false);
	const {
		isPending,
		data: videoData,
		refetch: refetchVideoData,
	} = useQuery({
		queryKey: [id],
		queryFn: () => getVideo(id ?? ""),
	});
	const {
		isPending: isPendingChannel,
		data: channelData,
		refetch: refetchChannelData,
	} = useQuery({
		queryKey: ["channelData", videoData],
		queryFn: () => getChannel(videoData?.channelId ?? ""),
	});

	useMetadata(
		(isPending ? "Loading video" : videoData?.title) + " - Youtube Clone",
		"Watch " + (isPending ? "Loading video" : videoData?.title)
	);
	function refetchData() {
		refetchChannelData();
		refetchVideoData();
	}

	useEffect(() => {
		if (id == null || id === "") router.push("/");
		if (!isPending && videoData == null) {
			toast.error("Invalid video id");
			router.push("/");
		}
	}, [id, router, videoData, isPending]);

	return (
		<div className="mx-[74.5px] flex justify-center w-full">
			{isPending ||
			videoData == null ||
			isPendingChannel ||
			channelData == null ? (
				<>
					<Loader2 className="animate-spin" />
				</>
			) : (
				<>
					<div className="ml-6 pt-6 pr-6">
						<div className="w-[853px]">
							<VideoPlayer videoData={videoData} />
						</div>
						<div>
							<div className="mt-3 mb-6">
								<VideoDescriptionHeader
									channelData={channelData}
									videoData={videoData}
									refetch={refetchData}
								/>
								<div className="mt-3 mr-3 p-3 bg-neutral-800 rounded-sm">
									<div className="mr-2 h-5 flex items-center space-x-2">
										<span className="font-medium">123K views</span>
										<span className="font-medium">
											{FormatTimeSince(videoData.createdAt, false)}
										</span>
									</div>
									<div
										className={cn(
											"w-[50%]",
											descriptionExpanded ? "h-fit" : "h-16"
										)}
									>
										<span
											className={cn(
												"overflow-hidden flex flex-col",
												descriptionExpanded === false ? "max-h-12" : ""
											)}
										>
											<span>
												Watch the new episode on My custom youtube clone.
											</span>
											<span>
												Get this amazing deal with 40% off at: 231231231232222
												www.bobtheBuiler.fakenews.dev teste23123123123
											</span>
											<span>
												www.bobtheBuiler.fakenews.dev teste23123123123
											</span>
										</span>
										{descriptionExpanded ? (
											<div className="py-4">
												<a href="" className="mb-4 flex flex-row h-9">
													<Image
														src={channelData.image}
														alt=""
														className="mr-3 rounded-full size-9"
														width={36}
														height={36}
													/>
													<div className="flex flex-col space-y-0">
														<h3 className="font-bold">{channelData.name}</h3>
														<span className="text-xs text-neutral-400">
															{new Intl.NumberFormat("en-US", {
																compactDisplay: "short",
																notation: "compact",
															}).format(
																channelData.subscribers.length ?? 0
															)}{" "}
															subscribers
														</span>
													</div>
												</a>
												<div className="mb-4 flex flex-ro h-9">
													<button className="flex flex-row items-center justify-center px-2 rounded-md border-neutral-500 border mr-2 hover:bg-neutral-500">
														<SquarePlay
															className="mr-[6px] size-6"
															size={24}
															strokeWidth={1}
														/>
														<span className="max-h-[17px] items-center flex">
															Videos
														</span>
													</button>
													<button className="flex flex-row items-center justify-center px-2 rounded-md border-neutral-500 border mr-2 hover:bg-neutral-500">
														<UserSquare
															className="mr-[6px] size-6"
															size={24}
															strokeWidth={1}
														/>
														<span className="max-h-[17px] items-center flex">
															About
														</span>
													</button>
												</div>
											</div>
										) : (
											<></>
										)}
										<button
											className="font-bold"
											onClick={() => setDescriptionExpanded((prev) => !prev)}
										>
											{descriptionExpanded ? "Show less" : "...more"}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="pt-6 pr-6 w-[402px]"></div>
				</>
			)}
		</div>
	);
}
