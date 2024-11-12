import { uploadVideo } from "@/actions/content/videos";
import { Button } from "@/components/ui/button";
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth/auth-client";
import { Loader2 } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";

export default function UploadVideoDialog() {
	const videoInput = useRef<HTMLInputElement>(null);
	const [video, setVideo] = useState<string>("");
	const [loadingVideo, setLoadingVideo] = useState<boolean>(false);
	const session = authClient.useSession();
	async function handleImageInputChange(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.files == null || e.target.files.length == 0) return;
		setLoadingVideo(true);
		const filesize = Number((e.target.files[0].size / 1024 / 1024).toFixed(4)); // MB

		if (filesize > 100) {
			setLoadingVideo(false);
			return toast.error(
				"The file is over 100MB. Please choose a different file or make compress it."
			);
		}
		if (!session.data) {
			toast.error("you are not signed in!");
			setLoadingVideo(false);
			return;
		}
		const results = await uploadVideo(
			await e.target.files[0].arrayBuffer(),
			session.data.user.id
		);

		if (!results) return;

		if (session.data?.user.videos == undefined) {
			await authClient.user.update({
				videos: [results.videoData[0].id],
			});
		} else {
			await authClient.user.update({
				videos: [...session.data.user.videos, results.videoData[0].id],
			});
		}

		console.log(results);
		setVideo(results.fileData.secure_url);
		setLoadingVideo(false);
	}
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Upload</DialogTitle>
			</DialogHeader>
			<div className="">
				{loadingVideo ? (
					<Loader2 className="animate-spin" />
				) : (
					<>
						<input
							ref={videoInput}
							type="file"
							onChange={handleImageInputChange}
							accept="video/mp4, video/webm"
							className="hidden"
						/>
						<Button onClick={() => videoInput.current?.click()}>
							Select a file
						</Button>
					</>
				)}
			</div>
		</DialogContent>
	);
}
