import { getChannel } from "@/actions/content/channel";
import { getAllVideos } from "@/actions/content/videos";
import VideoCard from "@/components/navigation/VideoCard";

export default async function Home() {
	const videos = await getAllVideos();
	return (
		<div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full grid-rows-max mt-6">
			{...videos?.map(async (video) => {
				const channelData = await getChannel(video.channelId);
				if (channelData == null) return;
				return (
					<VideoCard key={video.id} data={video} channelData={channelData} />
				);
			})}
		</div>
	);
}
