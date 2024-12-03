import { getChannel } from "@/actions/content/channel";
import { getAllVideos } from "@/actions/content/videos";
import VideoCard from "@/components/navigation/VideoCard";
import { VideoStatus } from "@/lib/db/schema";

export default async function Home() {
	const videos = await getAllVideos();
	return (
		<div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-4 w-full mt-6">
			{...videos?.map(async (video) => {
				const channelData = await getChannel(video.channelId);
				if (channelData == null) return;
				if (video.visibility !== VideoStatus.PUBLIC) return;
				return (
					<VideoCard key={video.id} data={video} channelData={channelData} />
				);
			})}
		</div>
	);
}
