import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import WatchVideoClientPage from "./client";
import { getVideo } from "@/actions/content/videos";
import { getChannel } from "@/actions/content/channel";

type Params = Promise<{ id: string }>;

export default async function WatchVideoPage({ params }: { params: Params }) {
	const queryClient = new QueryClient();
	const { id } = await params;

	await queryClient.prefetchQuery({
		queryKey: [id],
		queryFn: () => getVideo,
	});

	await queryClient.prefetchQuery({
		queryKey: ["channelData"],
		queryFn: () => getChannel,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<WatchVideoClientPage />
		</HydrationBoundary>
	);
}
