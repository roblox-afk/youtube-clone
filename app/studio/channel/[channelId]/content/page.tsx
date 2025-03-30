"use client";
import { MotionDiv } from "@/components/motion";
import StudioContentFilterBar from "@/components/navigation/studio/StudioContentFilterBar";
import { DataTable } from "@/components/ui/data-table";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { videoColumns } from "./columns";
import { Video } from "@/lib/db/schema";
import { getVideos } from "@/actions/content/videos";

export default function StudioContentPage({
	params,
}: {
	params: Promise<{ channelId: string }>;
}) {
	const t = useTranslations("Studio.Content");
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const channelId = use(params).channelId;
	const queryTab = searchParams.get("tab") ?? "videos";
	const [activeTab, setActiveTab] = useState(
		searchParams.get("tab") ?? "videos"
	);

	const [videos, setVideos] = useState<Video[]>();

	const onTabChange = (newState: string) => {
		setActiveTab(newState);
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.set("tabs", newState);
		router.push(pathname + "?" + newParams.toString());
	};

	useEffect(() => {
		async function getData() {
			console.log("Hello");
			const result = await getVideos(channelId);
			setVideos(result);
		}
		getData();

		setActiveTab(queryTab);
	}, [queryTab, videos, channelId]);

	return (
		<div className="w-full h-full">
			<div className="flex px-8 w-full">
				<Label className="pt-6 font-semibold text-2xl">Channel content</Label>
			</div>
			<Tabs
				value={activeTab}
				onValueChange={onTabChange}
				className="w-full space-y-[6px]"
			>
				<TabsList className="mt-4 bg-transparent *:ml-2 *:mr-8 px-6">
					<TabsTrigger
						value="videos"
						className="data-[state=active]:bg-transparent data-[state=active]:font-semibold flex-col size-12 p-0 relative"
					>
						{t("Videos.title")}
						{activeTab == "videos" ? (
							<MotionDiv
								layoutId="underline"
								className="bg-white h-[2px] w-full absolute bottom-0"
							/>
						) : null}
					</TabsTrigger>
					<TabsTrigger
						value="posts"
						className="data-[state=active]:bg-transparent data-[state=active]:font-semibold flex-col size-12 p-0 relative"
					>
						{t("Posts.title")}
						{activeTab == "posts" ? (
							<MotionDiv
								layoutId="underline"
								className="bg-white h-[2px] w-full absolute bottom-0"
							/>
						) : null}
					</TabsTrigger>
					<TabsTrigger
						value="playlists"
						className="data-[state=active]:bg-transparent data-[state=active]:font-semibold flex-col size-12 p-0 relative"
					>
						{t("Playlists.title")}
						{activeTab == "playlists" ? (
							<MotionDiv
								layoutId="underline"
								className="bg-white h-[2px] w-full absolute bottom-0"
							/>
						) : null}
					</TabsTrigger>
				</TabsList>
				<TabsContent value="videos">
					<StudioContentFilterBar />
					<DataTable columns={videoColumns} data={videos ?? []} />
				</TabsContent>
				<TabsContent value="posts">
					<StudioContentFilterBar />
				</TabsContent>
				<TabsContent value="playlists">
					<StudioContentFilterBar />
				</TabsContent>
			</Tabs>
		</div>
	);
}
