import { getChannel } from "@/actions/content/channel";
import { getAllVideos } from "@/actions/content/videos";
import VideoCard from "@/components/navigation/VideoCard";
import { VideoRestrictions, VideoStatus } from "@/lib/db/schema";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function Home() {
	//const videos = await getAllVideos();
	const { data: videosData, isPending } = useMutation({
		mutationFn: () => {
			return getAllVideos();
		},
	});
	return (
		<div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full grid-rows-max mt-6">
			{!isPending && videosData != null ? (
				videosData.map(async (video) => {
					<VideoCard
						data={video}
						channelData={await getChannel(video.channelId)}
					/>;
				})
			) : (
				<Loader2 />
			)}
		</div>
	);
}
