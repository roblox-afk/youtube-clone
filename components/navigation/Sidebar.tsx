"use client";
import {
	ChevronRight,
	Clapperboard,
	Clock,
	Flame,
	Gamepad2,
	History,
	Home,
	ListVideo,
	Music2,
	Podcast,
	Rss,
	SquarePlay,
	SquareUserRound,
	ThumbsUp,
	Trophy,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";
import ChannelPage from "./ChannelStatus";

export default function Sidebar() {
	const pathname: string = usePathname();
	const userData: { id: string; username: string } = {
		id: "123Abc",
		username: "johndoe",
	}; // TODO: replace with data from database
	return (
		<div className="flex h-full w-60 overflow-y-hidden">
			<div className="flex flex-col overflow-x-hidden">
				<div className="p-3 space-y-1 w-full">
					<SidebarItem
						Icon={Home}
						label="Startside"
						path="/"
						currentPath={pathname}
					/>
					<SidebarItem
						Icon={Rss}
						label="Abonnementer"
						path="/feed/subscriptions"
						currentPath={pathname}
					/>
				</div>
				<div className="ml-3 w-full my-3 space-y h-[1px] bg-neutral-800" />
				<div className="p-3 space-y-1 w-full">
					<SidebarItem
						Icon={ChevronRight}
						label="Deg"
						path="/feed/you"
						currentPath={pathname}
						reversed
						className="font-medium"
					/>
					<SidebarItem
						Icon={SquareUserRound}
						label="Kanalen din"
						path={"/@" + userData.username}
						currentPath={pathname}
					/>
					<SidebarItem
						Icon={History}
						label="Logg"
						path="/feed/history"
						currentPath={pathname}
					/>
					<SidebarItem
						Icon={ListVideo}
						label="Spillelister"
						path="/feed/playlists"
						currentPath={pathname}
					/>
					<SidebarItem
						Icon={SquarePlay}
						label="Videoene dine"
						path={"/channel/" + userData.id + "/videos"}
						currentPath={pathname}
					/>
					<SidebarItem
						Icon={Clock}
						label="Se senere"
						path="/playlist?list=WL"
						currentPath={pathname}
					/>
					<SidebarItem
						Icon={ThumbsUp}
						label="Likte videoer"
						path="/playlist?list=LL"
						currentPath={pathname}
					/>
				</div>
				<div className="w-full my-3 h-[1px] bg-neutral-800" />
				<div className="p-3 space-y-1 w-full">
					<span className="text-white font-medium px-4">Abonnementer</span>
					<ChannelPage />
					<ChannelPage />
				</div>
				<div className="w-full my-3 h-[1px] bg-neutral-800" />
				<div className="p-3 space-y-1 w-full">
					<span className="text-white font-medium px-4">Utforsk</span>
					<SidebarItem
						Icon={Flame}
						label="På vei opp"
						path="/feed/trending"
						currentPath={pathname}
					/>
					<SidebarItem
						Icon={Music2}
						label="Musikk"
						path="/music"
						currentPath={pathname}
					/>
					<SidebarItem
						Icon={Clapperboard}
						label="Filmer"
						path="/feed/storefront"
						currentPath={pathname}
					/>
					<SidebarItem
						Icon={Gamepad2}
						label="Gaming"
						path="/feed/gaming"
						currentPath={pathname}
					/>
					<SidebarItem
						Icon={Trophy}
						label="Sport"
						path="/feed/sport"
						currentPath={pathname}
					/>
					<SidebarItem
						Icon={Podcast}
						label="Podcaster"
						path="/podcasts"
						currentPath={pathname}
					/>
				</div>
			</div>
		</div>
	);
}
