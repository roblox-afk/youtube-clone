"use client";
import { getVideo } from "@/actions/content/videos";
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
					<video width="320" height="240" controls preload="none">
						<source src={videoData.sourceUrl} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
					<p>{videoData.title}</p>
				</>
			)}
		</div>
	);
}
