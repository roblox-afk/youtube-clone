import VideoCard from "@/components/navigation/VideoCard";

export default function Home() {
	return (
		<div className="grid grid-flow-col grid-cols-3 gap-4 w-full">
			<VideoCard />
			<VideoCard />
		</div>
	);
}
