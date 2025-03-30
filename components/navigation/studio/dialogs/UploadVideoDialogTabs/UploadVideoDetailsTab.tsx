"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { ChartColumn, Copy, ImagePlus, Sparkles } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

export default function UploadVideoDetailsTab() {
	const titleInputRef = useRef<HTMLInputElement>(null);
	const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
	const [titleText, setTitleText] = useState("");
	const [descriptionText, setDescriptionText] = useState("");

	function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		if (value.length <= 100) {
			setTitleText(value);
		}
	}

	function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
		const value = event.target.value;

		if (descriptionInputRef.current !== null) {
			descriptionInputRef.current.style.height = "auto";
			descriptionInputRef.current.style.height = `${event.target.scrollHeight}px`;
		}

		if (value.length <= 5000) {
			setDescriptionText(value);
		}
	}

	return (
		<ScrollArea>
			<div className="w-full flex flex-row">
				<div className="">
					<div className="ml-12 mt-2 mb-4 flex flex-row items-center relative">
						<h1 className="font-semibold text-2xl">Details</h1>
						<button className="bg-neutral-700 hover:bg-neutral-600 px-2 py-1 items-center justify-center flex rounded-full font-medium absolute right-0">
							Reuse details
						</button>
					</div>
					<div className="pl-12">
						<div className="w-full rounded-lg border border-neutral-700 hover:border-white has-[:focus]:border-white has-[:focus]:border-2 has-[:focus]:outline outline-1 px-3 pb-3 mb-6 relative">
							<div className="mt-2 mb-1 flex-row flex">
								<span className="text-xs text-neutral-400 font-medium">
									Title (required)
								</span>
								<div className="ml-1">
									<QuestionMarkCircledIcon
										className="size-4"
										color="#A3A3A3"
										strokeWidth={1}
									/>
								</div>
							</div>
							<div className="">
								<input
									type="text"
									ref={titleInputRef}
									onChange={handleTitleChange}
									value={titleText}
									placeholder="Add a title that describes your video (type @ to mention a channel)"
									className="w-full h-fit focus:outline-none bg-transparent placeholder:text-neutral-600 text-sm peer/description"
									required
								/>
								<span
									className="w-full flex text-xs text-neutral-400"
									dir="rtl"
								>
									{titleText.length || 0}/100
								</span>
							</div>
						</div>
						<div className="w-full rounded-lg border border-neutral-700 hover:border-white has-[:focus]:border-white has-[:focus]:border-2 has-[:focus]:outline outline-1 px-3 pb-3 mb-6 relative">
							<div className="mt-2 mb-1 flex-row flex">
								<span className="text-xs text-neutral-400 font-medium">
									Description
								</span>
								<div className="ml-1">
									<QuestionMarkCircledIcon
										className="size-4"
										color="#A3A3A3"
										strokeWidth={1}
									/>
								</div>
							</div>
							<div className="flex flex-col min-h-0">
								<textarea
									ref={descriptionInputRef}
									value={descriptionText}
									rows={1}
									onChange={handleDescriptionChange}
									placeholder="Tell viewers about your video (type @ to mention a channel)"
									className="w-full min-h-0 max-h-[900px] focus:outline-none bg-transparent flex placeholder:text-neutral-600 text-sm resize-none active:border-transparent focus:outline-0 p-0 rounded-none border-none overflow-y-auto"
								/>
								<span
									className="w-full flex text-xs text-neutral-400"
									dir="rtl"
								>
									{descriptionText.length || 0}/5000
								</span>
							</div>
						</div>
						<div className="w-full mb-6">
							<h2 className="font-medium antialiased">Thumbnail</h2>
							<span className="antialiased text-sm text-neutral-400 pb-3 flex">
								Set a thumbnail that stands out and draws viewers&apos;
								attention.
							</span>
							<div className="flex flex-row w-full space-x-3">
								<button className="border border-dashed border-neutral-700 px-2 h-[84px] w-[153px] relative flex items-center justify-center flex-col group">
									<QuestionMarkCircledIcon
										strokeWidth={1}
										color="#A3A3A3"
										className="absolute hidden right-2 top-2 size-5 group-hover:flex"
									/>
									<ImagePlus
										className="size-6 m-1 group-hover:stroke-neutral-400"
										strokeWidth={1}
									/>
									<span className="antialiased text-neutral-400 text-xs">
										Upload file
									</span>
								</button>
								<button className="border border-dashed border-neutral-700 px-2 h-[84px] w-[153px] relative flex items-center justify-center flex-col group">
									<Sparkles
										className="size-6 m-1 group-hover:stroke-neutral-400"
										strokeWidth={1}
									/>
									<span className="antialiased text-neutral-400 text-xs">
										Auto-generated
									</span>
								</button>
								<button className="border border-dashed border-neutral-700 px-2 h-[84px] w-[153px] relative flex items-center justify-center flex-col group">
									<ChartColumn
										className="size-6 m-1 group-hover:stroke-neutral-400"
										strokeWidth={1}
									/>
									<span className="antialiased text-neutral-400 text-xs">
										Test & compare
									</span>
								</button>
							</div>
						</div>
						<div className="w-full mb-6">
							<h2 className="font-medium antialiased pb-2 flex">Playlists</h2>
							<span className="antialiased text-sm text-neutral-400 pb-3 flex">
								Add your video to one or more playlists to organize your content
								for viewers.
							</span>
						</div>
						<div className="w-full mb-3">
							<h2 className="font-medium antialiased">Audience</h2>
							<div className="w-full">
								<div className="w-full py-[6px] flex flex-row items-center">
									<h3 className="font-medium antialiased text-sm">
										This video is set to made for kids
									</h3>
									<div className="ml-[10px] py-[2px] px-[6px] h-5 bg-neutral-600 rounded">
										<h3 className="font-medium antialiased text-xs">
											Set by you
										</h3>
									</div>
								</div>
								<span className="antialiased text-sm text-neutral-400 pb-2 flex">
									Regardless of your location, you&apos;re legally required to
									comply with the Children&apos;s Online Privacy Protection Act
									(COPPA) and/or other laws. You&apos;re required to tell us
									whether your videos are made for kids.
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="pl-6 pr-12">
					<div className="mb-6 pb-1 rounded-sm bg-neutral-900 w-[306px] mt-14">
						<div className="mb-1 w-[306px]">
							<video className="rounded-t-sm">
								<source src="https://res.cloudinary.com/dafd64b6r/video/upload/v1735215302/youtube-clone/c4ohz1h3wajpbcmlg7bf.mp4" />
							</video>
						</div>
						<div className="flex flex-row items-center justify-between">
							<div className="flex flex-col">
								<span className="mt-3 px-4 text-neutral-400 text-xs">
									Video link
								</span>
								<a
									className="text-blue-500 mx-4 pb-[5px] max-w-56 text-sm"
									href="https://youtubeclone.nonstopstudio.dev/watch?id=NSDWAS2sa_N"
								>
									https://youtu.be/NSDWAS2sa_N
								</a>
							</div>
							<Tooltip>
								<TooltipTrigger asChild>
									<button className="size-10 flex items-center justify-center rounded-full hover:bg-neutral-800 p-[6px] mr-2 border-2 border-transparent">
										<Copy className="size-6" strokeWidth={1} />
									</button>
								</TooltipTrigger>
								<TooltipContent
									className="z-[5000] bg-neutral-600"
									side="bottom"
								>
									<p className="text-white">Copy video link</p>
								</TooltipContent>
							</Tooltip>
						</div>
						<div className="flex flex-col">
							<span className="mt-3 px-4 text-neutral-400 text-xs">
								Filename
							</span>
							<span className="pb-[5px] mx-4 text-sm">
								robloxapp-20231031-2155325.mp4
							</span>
						</div>
					</div>
				</div>
			</div>
		</ScrollArea>
	);
}
