"use client";
import { getVideo } from "@/actions/content/videos";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function WatchVideoPage() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const router = useRouter();
	const videoData = useMutation({
		mutationFn: () => {
			return getVideo(id ?? "");
		},
	});

	useEffect(() => {
		if (id == null || id === "") router.push("/");
		if (!videoData.isPending && videoData.data == null) {
			toast.error("Invalid video id");
			router.push("/");
		}
	}, [id, router, videoData]);
	return (
		<div>
			{videoData.isPending || videoData.data == null ? (
				<Loader2 className="animate-spin" />
			) : (
				<p>{videoData.data.title}</p>
			)}
		</div>
	);
}
