"use client";

import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { authClient } from "@/lib/auth/auth-client";
import { SquarePen, Upload, Video } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UploadIconWidget() {
	const { data: session } = authClient.useSession();
	const router = useRouter();
	return (
		<>
			{session?.user != null ? (
				<Popover>
					<PopoverTrigger>
						<div className="size-10 hover:bg-neutral-800 rounded-full flex justify-center items-center">
							<Upload strokeWidth={1} />
						</div>
					</PopoverTrigger>
					<PopoverContent className="w-44 flex-col py-2 mr-4 px-0 bg-neutral-800 z-[105]">
						<button
							className="flex items-center px-4  flex-row h-10 hover:bg-neutral-700 relative w-full"
							onClick={() =>
								router.push(
									"/studio/channel/" + session.user.id + "/content/upload"
								)
							}
						>
							<Video strokeWidth={1} className="mr-4" />
							<Label className="">Upload video</Label>
						</button>
						<button
							className="flex items-center px-4  flex-row h-10 hover:bg-neutral-700 relative w-full"
							onClick={() =>
								router.push(
									"/studio/channel/" + session.user.id + "/content/post"
								)
							}
						>
							<SquarePen strokeWidth={1} className="mr-4" />
							<Label className="">Create post</Label>
						</button>
					</PopoverContent>
				</Popover>
			) : (
				<></>
			)}
		</>
	);
}
