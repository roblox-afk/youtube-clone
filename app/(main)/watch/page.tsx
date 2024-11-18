"use client";
import { getChannel } from "@/actions/content/channel";
import { getVideo } from "@/actions/content/videos";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";
import VideoDescriptionHeader from "@/components/watch/VideoDescriptionHeader";
import { useQuery } from "@tanstack/react-query";
import {
	Ellipsis,
	Forward,
	Loader2,
	Scissors,
	ThumbsDown,
	ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function WatchVideoPage() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const router = useRouter();
	const { isPending, data: videoData } = useQuery({
		queryKey: [id],
		queryFn: () => getVideo(id ?? ""),
	});
	const { isPending: isPendingChannel, data: channelData } = useQuery({
		queryKey: [videoData],
		queryFn: () => getChannel(videoData?.channelId ?? ""),
	});

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
								/>
								<div className="mt-2"></div>
							</div>
						</div>
					</div>
					<div className="pt-6 pr-6 w-[402px]"></div>
				</>
			)}
		</div>
	);
}
