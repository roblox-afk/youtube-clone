import { uploadVideo } from "@/actions/content/videos";
import { Button } from "@/components/ui/button";
import {
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth/auth-client";
import {
	ArrowUpFromLine,
	Loader2,
	MessageSquareWarning,
	X,
} from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import UploadVideoDetailsTab from "./UploadVideoDialogTabs/UploadVideoDetailsTab";
import UploadVideoElementsTab from "./UploadVideoDialogTabs/UploadVideoElementsTab";
import UploadVideoChecksTab from "./UploadVideoDialogTabs/UploadVideoChecksTab";
import UploadVideoVisibilityTab from "./UploadVideoDialogTabs/UploadVideoVisibilityTab";
import { cn } from "@/lib/utils";

export default function UploadVideoDialog() {
	const videoInput = useRef<HTMLInputElement>(null);
	const [tab, setTab] = useState<string>("details"); // TODO:REMOVE "t" as default state for development
	const [video, setVideo] = useState<string>(""); // TODO:REMOVE "t" as default state for development
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [saving, setSaving] = useState<boolean>(false);
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
			e.target.files[0].name,
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
		<DialogContent
			className="z-[2002] p-0 flex flex-col gap-0 overflow-auto h-[calc(100dvh-96px)] max-w-[960px] bg-neutral-800"
			hideCloseButton
		>
			<DialogHeader className="border-b border-neutral-700 h-fit py-4 px-6 flex flex-row justify-between items-center space-y-0">
				<DialogTitle className="text-xl font-medium text-white antialiased whitespace-nowrap text-ellipsis">
					Upload video
				</DialogTitle>
				<div className="flex flex-row">
					<button className="rounded-full bg-transparent hover:bg-neutral-800 flex items-center justify-center size-10 p-[6px]">
						<MessageSquareWarning strokeWidth={1} />
					</button>
					<DialogClose asChild>
						<button className="rounded-full bg-transparent hover:bg-neutral-800 flex items-center justify-center size-10 p-[6px] border-2 border-transparent">
							<X strokeWidth={1} />
						</button>
					</DialogClose>
				</div>
			</DialogHeader>
			{loadingVideo || video === "" || video === null ? (
				<div className="flex h-full w-full items-center justify-center flex-col">
					<div className="h-full flex px-[50px] pt-4 justify-center items-center mb-6 flex-col relative">
						<div className="flex flex-col items-center">
							<input
								ref={videoInput}
								type="file"
								onChange={handleImageInputChange}
								accept="video/mp4, video/webm"
								className="hidden"
							/>
							<button
								className="rounded-full bg-neutral-900 size-[136px] flex justify-center items-center"
								onClick={() => videoInput.current?.click()}
							>
								{loadingVideo ? (
									<Loader2
										size={64}
										strokeWidth={2}
										color="#A3A3A3"
										className="animate-spin"
									/>
								) : (
									<ArrowUpFromLine
										size={64}
										strokeWidth={2}
										strokeLinecap="inherit"
										color="#A3A3A3"
									/>
								)}
							</button>
							<span className="mt-6 text-">
								Drap and drop video file to upload
							</span>
							<span>Your videos will be private until you publish them.</span>
							<Button
								onClick={() => videoInput.current?.click()}
								className="w-fit mt-7 rounded-full"
							>
								Select file
							</Button>
						</div>
						<div className="absolute bottom-2">
							<p className="text-xs text-center text-neutral-400">
								By submitting your videos to YouTube, you acknowledge that you
								agree to YouTube&apos;s{" "}
								<a href="/t/terms" className="text-blue-500">
									Terms of Service
								</a>{" "}
								and{" "}
								<a href="/yt/about/policies" className="text-blue-500">
									Community Guidelines
								</a>
								.
							</p>
							<p className="text-xs text-center text-neutral-400">
								Please be sure not to violate others&apos; copyright or privacy
								rights.{" "}
								<a href="/t/copyright" className="text-blue-500">
									Learn more
								</a>
							</p>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}

			{video !== "" && video !== null && (
				<div className="flex h-full w-full items-center flex-col">
					<Tabs
						className="flex flex-col w-full"
						defaultValue="details"
						onValueChange={(newValue: string) => {
							setTab(newValue);
						}}
					>
						<TabsList className="py-2 mx-6 justify-around h-fit relative">
							<div className="flex items-center w-fit relative">
								<TabsTrigger
									value="details"
									className="mx-2 py-1 px-4 h-16 w-32 bg-opacity-0 hover:bg-opacity-20 hover:bg-neutral-500 flex flex-col data-[state=active]:bg-transparent data-[state=active]:shadow-none group"
								>
									<div className="pb-1 group-data-[state=active]:font-medium">
										Details
									</div>
									<div className="rounded-full size-6 bg-neutral-500 group-data-[state=active]:bg-white justify-center items-center flex z-10">
										<div className="size-3 group-data-[state=active]:size-4 bg-neutral-900 rounded-full" />
									</div>
								</TabsTrigger>
								<div
									className={cn(
										"w-[calc(100%+70px)] h-1 bg-neutral-500 absolute mt-6 ml-[50%]",
										tab === "elements" || tab == "checks" || tab == "visibility"
											? "bg-white"
											: ""
									)}
								/>
							</div>
							<div className="flex items-center w-fit relative">
								<TabsTrigger
									value="elements"
									className="mx-2 py-1 px-4 h-16 w-32 bg-opacity-0 hover:bg-opacity-20 hover:bg-neutral-500 flex flex-col data-[state=active]:bg-transparent data-[state=active]:shadow-none group"
								>
									<div className="pb-1 group-data-[state=active]:font-medium">
										Video Elements
									</div>
									<div className="rounded-full size-6 bg-neutral-500 group-data-[state=active]:bg-white justify-center items-center flex z-10">
										<div className="size-3 group-data-[state=active]:size-4 bg-neutral-900 rounded-full" />
									</div>
								</TabsTrigger>
								<div
									className={cn(
										"w-[calc(100%+70px)] h-1 bg-neutral-500 absolute mt-6 ml-[50%]",
										tab === "checks" || tab == "visibility" ? "bg-white" : ""
									)}
								/>
							</div>
							<div className="flex items-center w-fit relative">
								<TabsTrigger
									value="checks"
									className="mx-2 py-1 px-4 h-16 w-32 bg-opacity-0 hover:bg-opacity-20 hover:bg-neutral-500 flex flex-col data-[state=active]:bg-transparent data-[state=active]:shadow-none group"
								>
									<div className="pb-1 group-data-[state=active]:font-medium">
										Checks
									</div>
									<div className="rounded-full size-6 bg-neutral-500 group-data-[state=active]:bg-white justify-center items-center flex z-10">
										<div className="size-3 group-data-[state=active]:size-4 bg-neutral-900 rounded-full" />
									</div>
								</TabsTrigger>
								<div
									className={cn(
										"w-[calc(100%+70px)] h-1 bg-neutral-500 absolute mt-6 ml-[50%]",
										tab == "visibility" ? "bg-white" : ""
									)}
								/>
							</div>
							<div className="flex items-center w-fit relative">
								<TabsTrigger
									value="visibility"
									className="mx-2 py-1 px-4 h-16 w-32 bg-opacity-0 hover:bg-opacity-20 hover:bg-neutral-500 flex flex-col data-[state=active]:bg-transparent data-[state=active]:shadow-none group"
								>
									<div className="pb-1 group-data-[state=active]:font-medium">
										Visibility
									</div>
									<div className="rounded-full size-6 bg-neutral-500 group-data-[state=active]:bg-white justify-center items-center flex z-10">
										<div className="size-3 group-data-[state=active]:size-4 bg-neutral-900 rounded-full" />
									</div>
								</TabsTrigger>
							</div>
						</TabsList>
						<TabsContent value="details">
							<UploadVideoDetailsTab />
						</TabsContent>
						<TabsContent value="elements">
							<UploadVideoElementsTab />
						</TabsContent>
						<TabsContent value="checks">
							<UploadVideoChecksTab />
						</TabsContent>
						<TabsContent value="visibility">
							<UploadVideoVisibilityTab />
						</TabsContent>
					</Tabs>
				</div>
			)}
		</DialogContent>
	);
}
