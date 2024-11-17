"use client";
import { getVideo } from "@/actions/content/videos";
import VideoPlayer from "@/components/VideoPlayer";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
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

	useEffect(() => {
		if (id == null || id === "") router.push("/");
		if (!isPending && videoData == null) {
			toast.error("Invalid video id");
			router.push("/");
		}
	}, [id, router, videoData, isPending]);

	return (
		<div>
			{isPending || videoData == null ? (
				<>
					<Loader2 className="animate-spin" />
				</>
			) : (
				<>
					<VideoPlayer videoData={videoData} />
					<p>{videoData.title}</p>
				</>
			)}
		</div>
	);
}
