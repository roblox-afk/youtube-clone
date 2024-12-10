"use client";
import { getChannel } from "@/actions/content/channel";
import { getVideo } from "@/actions/content/videos";
import VideoPlayer from "@/components/VideoPlayer";
import VideoDescriptionHeader from "@/components/watch/VideoDescriptionHeader";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function WatchVideoPage() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const router = useRouter();
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
		queryKey: [videoData],
		queryFn: () => getChannel(videoData?.channelId ?? ""),
	});

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
