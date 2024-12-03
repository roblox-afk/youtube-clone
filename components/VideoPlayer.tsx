import { Video } from "@/lib/db/schema";
import { cn, FormatTimeFromSeconds } from "@/lib/utils";
import {
	Captions,
	CaptionsOff,
	Maximize,
	Minimize,
	Pause,
	Play,
	RectangleHorizontal,
	RotateCcw,
	Settings,
	SkipBack,
	SkipForward,
	TvMinimalPlay,
	Volume1,
	Volume2,
	VolumeOff,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Slider } from "./ui/slider";
import { clamp } from "lodash";

export default function VideoPlayer({ videoData }: { videoData: Video }) {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [isMuted, setIsMuted] = useState<boolean>(false);
	const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
	const [isTheaterMode, setIsTheaterMode] = useState<boolean>(false);
	const [isCaptionsEnabled, setIsCaptionsEnabled] = useState<boolean>(false);
	const [videoDuration, setVideoDuration] = useState<number>(0);
	const [videoProgress, setVideoProgress] = useState<number>(0);
	const [volume, setVolume] = useState<number[]>([1]);
	const [prevVolume, setPrevVolume] = useState<number[]>([1]);
	const videoRef = useRef<HTMLVideoElement>(null);

	const handleVideoPlayToggle = (newState: 0 | 1) => {
		if (newState === 1) {
			videoRef.current?.play();
			setIsPlaying(true);
		} else if (newState === 0) {
			videoRef.current?.pause();
			setIsPlaying(false);
		}
	};

	useEffect(() => {
		if (videoRef.current?.volume != null) {
			videoRef.current.volume = volume[0];
		}
	}, [videoRef, isMuted, volume]);

	useEffect(() => {
		console.log("VideoProgress: " + videoProgress);
		console.log("VideoDuration: " + videoDuration);
	}, [videoProgress, videoDuration]);

	useEffect(() => {
		if (!isPlaying) return;
		const currentTime = videoRef.current?.currentTime;
		if (videoDuration != null && currentTime != null) {
			const loadingTimeout = setTimeout(() => {
				if (videoProgress === currentTime) {
					setVideoProgress((prev) => prev + 0.00000001);
				} else {
					setVideoProgress(currentTime);
				}

				if (videoProgress === videoDuration) {
					setIsPlaying(false);
				}
			}, 10);

			return () => {
				clearTimeout(loadingTimeout);
			};
		}
	}, [isPlaying, videoDuration, videoProgress]);

	return (
		<div className="relative w-full">
			<video
				className="rounded-sm flex peer w-full"
				ref={videoRef}
				muted={isMuted}
				onLoadedMetadata={() =>
					setVideoDuration(videoRef.current?.duration ?? 0)
				}
				//onEnded={() => setIsPlaying(false)}
			>
				<source src={videoData.sourceUrl} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<div
				className={cn(
					"pt-[3px] px-3 h-[51px] z-50 absolute flex w-full bottom-0 flex-col transition-opacity ease-linear",
					isPlaying && "opacity-0 peer-hover:opacity-100 hover:opacity-100"
				)}
			>
				<div className="w-full h-[5px] items-center flex space-x-[2px]">
					<div
						className="h-[3px] hover:h-full bg-neutral-500"
						style={{
							width:
								(Math.floor(videoDuration) / Math.floor(videoDuration)) * 100 +
								"%",
						}}
					>
						<div
							className="bg-red-600 h-full"
							style={{
								width:
									clamp(videoProgress / Math.floor(videoDuration), 0, 1) * 100 +
									"%",
							}}
						/>
					</div>
				</div>
				<div className="flex absolute w-full">
					<div className="flex">
						<Link
							href="#"
							className="w-[42px] h-12 flex justify-center items-center"
						>
							<SkipBack className="size-4" />
						</Link>
						<button
							className="w-[42px] h-12 justify-center items-center flex"
							onClick={() => handleVideoPlayToggle(isPlaying ? 0 : 1)}
						>
							{isPlaying ? (
								<Pause className="size-4" />
							) : videoProgress === videoDuration ||
							  videoProgress > videoDuration ? (
								<RotateCcw className="size-4" />
							) : (
								<Play className="size-4" />
							)}
						</button>
						<Link
							href="#"
							className="h-12 w-[42px] flex justify-center items-center"
						>
							<SkipForward className="size-4" />
						</Link>
						<button
							className="relative size-12 flex justify-center items-center peer"
							onClick={() => {
								if (isMuted) {
									setVolume(prevVolume);
								} else {
									setVolume([0]);
								}
								setIsMuted(!isMuted);
							}}
						>
							{isMuted ? (
								<VolumeOff className="size-4" />
							) : volume[0] < 0.5 ? (
								<Volume1 className="size-4" />
							) : (
								<Volume2 className="size-4" />
							)}
						</button>
						<Slider
							min={0}
							max={1}
							value={volume}
							step={0.05}
							className="w-20 peer-hover:flex hover:flex hidden ease-in transition-all duration-700"
							onValueChange={(newValue: number[]) => {
								setPrevVolume(volume);
								setVolume(newValue);
								if (newValue[0] === 0) {
									setIsMuted(true);
								} else {
									setIsMuted(false);
								}
							}}
						/>
						<div className="px-[5px] h-12 flex justify-center items-center duration-100 transition-all ease-in-out">
							<span className="w-fit">
								<span>{FormatTimeFromSeconds(Math.trunc(videoProgress))}</span>
								<span> / </span>
								<span>{FormatTimeFromSeconds(Math.trunc(videoDuration))}</span>
							</span>
						</div>
					</div>
					<div className="flex absolute right-6">
						<button
							onClick={() =>
								setIsCaptionsEnabled((prev) => {
									return !prev;
								})
							}
							className="size-12 flex justify-center items-center"
						>
							{isCaptionsEnabled ? (
								<Captions className="size-4" />
							) : (
								<CaptionsOff className="size-4" />
							)}
						</button>
						<button
							onClick={() => console.log("Open Settings Popover")}
							className="size-12 flex justify-center items-center"
						>
							<Settings className="size-4" />
						</button>
						{isFullscreen === false && (
							<>
								<button
									onClick={() => console.log("Start Miniplayer")}
									className="size-12 flex justify-center items-center"
								>
									<TvMinimalPlay className="size-4" />
								</button>
								<button
									onClick={() =>
										setIsTheaterMode((prev) => {
											return !prev;
										})
									}
									className="size-12 flex justify-center items-center"
								>
									{isTheaterMode ? (
										<RectangleHorizontal className="size-4" />
									) : (
										<RectangleHorizontal className="size-5" />
									)}
								</button>
							</>
						)}
						<button
							onClick={() => {
								setIsFullscreen((prev) => {
									return !prev;
								});

								if (isFullscreen) {
									videoRef.current?.requestFullscreen();
								} else {
									document.exitFullscreen();
								}
							}}
							className="size-12 flex justify-center items-center"
						>
							{isFullscreen ? (
								<Minimize className="size-4" />
							) : (
								<Maximize className="size-4" />
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
