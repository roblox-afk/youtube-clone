"use client";
import {
	ChevronRight,
	Clock,
	History,
	ListVideo,
	SquarePlay,
	ThumbsUp,
} from "lucide-react";
import SidebarItem from "../SidebarItem";
import Placeholder40x40 from "@/public/Placeholder_40x40.svg";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function StudioSidebarContent() {
	const t = useTranslations("Studio.Sidebar");
	const pathname: string = usePathname();
	const userData: { id: string; username: string } = {
		id: "123Abc",
		username: "johndoe",
	}; // TODO: replace with data from database
	return (
		<>
			<div className="px-3 space-y-1 w-full">
				<Image
					src={Placeholder40x40}
					alt="Profile Picture"
					width={112}
					height={112}
					className="size-28 rounded-full"
				/>
			</div>
			<div className="px-3 space-y-1 w-full">
				<SidebarItem
					Icon={ChevronRight}
					label={t("you.title")}
					path="/feed/you"
					currentPath={pathname}
					reversed
					textClassName="font-medium text-base"
				/>
				<SidebarItem
					Icon={History}
					label={t("you.history")}
					path="/feed/history"
					currentPath={pathname}
				/>
				<SidebarItem
					Icon={ListVideo}
					label={t("you.playlists")}
					path="/feed/playlists"
					currentPath={pathname}
				/>
				<SidebarItem
					Icon={SquarePlay}
					label={t("you.videos")}
					path={"/channel/" + userData.id + "/videos"}
					currentPath={pathname}
				/>
				<SidebarItem
					Icon={Clock}
					label={t("you.watchLater")}
					path="/playlist?list=WL"
					currentPath={pathname}
				/>
				<SidebarItem
					Icon={ThumbsUp}
					label={t("you.likedVideos")}
					path="/playlist?list=LL"
					currentPath={pathname}
				/>
			</div>
		</>
	);
}
