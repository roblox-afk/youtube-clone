"use client";
import {
	ChevronRight,
	CircleHelp,
	Clapperboard,
	Clock,
	Flag,
	Flame,
	Gamepad2,
	History,
	Home,
	ListVideo,
	MessageSquareWarning,
	Music2,
	Podcast,
	Rss,
	Settings,
	SquarePlay,
	ThumbsUp,
	Trophy,
	User,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import YoutubePremiumLogo from "@/public/YouTubePremium_Logo.svg";
import YoutubeStudioLogo from "@/public/YouTubeStudio_Logo.svg";
import YoutubeMusicLogo from "@/public/YouTubeMusic_Logo.svg";
import YoutubeKidsLogo from "@/public/YouTubeKids_Logo.svg";
import { usePathname } from "next/navigation";
import ChannelPage from "./ChannelStatus";
import { useTranslations } from "next-intl";
import { useSidebarStore } from "../providers/sidebarStateProvider";

export default function Sidebar() {
	const t = useTranslations("Sidebar");
	const pathname: string = usePathname();
	const userData: { id: string; username: string } = {
		id: "123Abc",
		username: "johndoe",
	}; // TODO: replace with data from database

	const { expanded } = useSidebarStore((state) => state);
	return (
		<>
			{expanded == true ? (
				<>
					<div className="pt-3 px-3 space-y-1 w-full">
						<SidebarItem
							Icon={Home}
							label={t("home")}
							path="/"
							currentPath={pathname}
						/>
						<SidebarItem
							Icon={Rss}
							label={t("subscriptions.title")}
							path="/feed/subscriptions"
							currentPath={pathname}
						/>
					</div>
					<div className="ml-3 my-3 space-y h-[1px] bg-neutral-800" />
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
					<div className="w-full my-3 h-[1px] bg-neutral-800" />
					<div className="px-3 space-y-1 w-full">
						<span className="text-white font-medium text-base px-4">
							{t("subscriptions.title")}
						</span>
						<ChannelPage NewVideo />
						<ChannelPage IsLive />
						<ChannelPage IsLive />
						<ChannelPage IsLive />
						<ChannelPage IsLive />
						<ChannelPage IsLive />
						<ChannelPage IsLive />
						<ChannelPage IsLive />
					</div>
					<div className="w-full my-3 h-[1px] bg-neutral-800" />
					<div className="px-3 space-y-1 w-full">
						<span className="text-white font-medium px-4">
							{t("explore.title")}
						</span>
						<SidebarItem
							Icon={Flame}
							label={t("explore.trending")}
							path="/feed/trending"
							currentPath={pathname}
						/>
						<SidebarItem
							Icon={Music2}
							label={t("explore.music")}
							path="/music"
							currentPath={pathname}
						/>
						<SidebarItem
							Icon={Clapperboard}
							label={t("explore.movies")}
							path="/feed/storefront"
							currentPath={pathname}
						/>
						<SidebarItem
							Icon={Gamepad2}
							label={t("explore.gaming")}
							path="/feed/gaming"
							currentPath={pathname}
						/>
						<SidebarItem
							Icon={Trophy}
							label={t("explore.sports")}
							path="/feed/sport"
							currentPath={pathname}
						/>
						<SidebarItem
							Icon={Podcast}
							label={t("explore.podcasts")}
							path="/podcasts"
							currentPath={pathname}
						/>
					</div>
					<div className="w-full my-3 h-[1px] bg-neutral-800" />
					<div className="px-3 space-y-1 w-full">
						<span className="text-white font-medium px-4">
							{t("moreFromYouTube.title")}
						</span>
						<SidebarItem
							ImagePath={YoutubePremiumLogo}
							label={t("moreFromYouTube.premium")}
							path="/premium"
							currentPath={pathname}
						/>
						<SidebarItem
							ImagePath={YoutubeStudioLogo}
							label={t("moreFromYouTube.studio")}
							path="/studio"
							currentPath={pathname}
						/>
						<SidebarItem
							ImagePath={YoutubeMusicLogo}
							label={t("moreFromYouTube.music")}
							path="/ytMusic"
							currentPath={pathname}
						/>
						<SidebarItem
							ImagePath={YoutubeKidsLogo}
							label={t("moreFromYouTube.kids")}
							path="/kids"
							currentPath={pathname}
						/>
					</div>
					<div className="w-full my-3 h-[1px] bg-neutral-800" />
					<div className="px-3 pb-16 space-y-1 w-full">
						<SidebarItem
							Icon={Settings}
							label={t("misc.settings")}
							path="/account"
							currentPath={pathname}
						/>
						<SidebarItem
							Icon={Flag}
							label={t("misc.reportHistory")}
							path="/reporthistory"
							currentPath={pathname}
						/>
						<SidebarItem
							Icon={CircleHelp}
							label={t("misc.help")}
							path="/help"
							currentPath={pathname}
						/>
						<SidebarItem
							Icon={MessageSquareWarning}
							label={t("misc.feedback")}
							path="/feedback"
							currentPath={pathname}
						/>
					</div>
				</>
			) : (
				<div className="pt-3 px-3 space-y-1 w-full">
					<SidebarItem
						Icon={Home}
						label={t("home")}
						minimized
						path="/"
						currentPath={pathname}
					/>
					<SidebarItem
						Icon={Rss}
						label={t("subscriptions.title")}
						minimized
						path="/feed/subscriptions"
						currentPath={pathname}
					/>
					<SidebarItem
						Icon={User}
						label={t("you.title")}
						path="/feed/you"
						currentPath={pathname}
						reversed
						textClassName="font-medium text-base"
					/>
				</div>
			)}
		</>
	);
}
