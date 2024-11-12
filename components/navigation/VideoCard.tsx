"use client";
import Image from "next/image";
import PlaceholderProfilePicture from "@/public/Placeholder_40x40.svg";
import { Label } from "../ui/label";
import { User, Video } from "@/lib/db/schema";
import { FormatTimeSince } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VideoCard({
	data,
	channelData,
}: {
	data: Video;
	channelData: User;
}) {
	const router = useRouter();
	return (
		<button
			onClick={() => router.push("/watch?id=" + data.id)}
			className="ml-6 flex text-left w-80 mx-2 mb-10 h-full flex-col cursor-pointer"
		>
			<div className="w-full h-48 bg-white rounded-xl relative object-cover">
				<Image
					src={
						data.thumbnailUrl == null || data.thumbnailUrl == ""
							? PlaceholderProfilePicture
							: data.thumbnailUrl
					}
					alt="Video thumbnail"
					fill
				/>
			</div>
			<div className="w-full mt-3 flex-row flex">
				<Image
					src={
						channelData.image == null
							? PlaceholderProfilePicture
							: channelData.image
					}
					className="mr-3 rounded-full size-9"
					alt="test"
					width={40}
					height={40}
				/>
				<div className="">
					<Label className="inline-block w-64 font-semibold text-base break-words">
						{data.title}
					</Label>
					<Link href={"/@" + channelData.name} className="text-sm font-medium">
						{channelData.name}
					</Link>
					<div className="flex flex-row items-center">
						<Label>
							{new Intl.NumberFormat("en-US", {
								compactDisplay: "short",
								notation: "compact",
							}).format(data.views)}{" "}
							views
						</Label>
						<div className="rounded-full size-1 bg-white mx-2" />
						<Label>{FormatTimeSince(data.createdAt, true)}</Label>
					</div>
				</div>
			</div>
		</button>
	);
}
