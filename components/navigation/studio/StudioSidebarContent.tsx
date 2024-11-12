import {
	Captions,
	ChartColumn,
	LayoutDashboard,
	ListVideo,
	LoaderCircle,
	MessageSquareText,
	MessageSquareWarning,
	Settings,
	WandSparkles,
} from "lucide-react";
import SidebarItem from "../SidebarItem";
import Placeholder40x40 from "@/public/Placeholder_40x40.svg";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { authClient } from "@/lib/auth/auth-client";
import { Label } from "@/components/ui/label";

export default function StudioSidebarContent({
	changeDialogType,
}: {
	changeDialogType: (newState: string) => void;
}) {
	"use client";
	const t = useTranslations("Studio.Sidebar");
	const pathname: string = usePathname();
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		return (
			<div className="flex w-full h-full justify-center items-center">
				<LoaderCircle width={64} height={64} className="size-16" />
			</div>
		);
	} else {
		return (
			<div className="h-full w-full pt-4 relative">
				<div className="px-3 space-y-3 w-full flex items-center flex-col mb-3">
					<Image
						src={session?.user.image ?? Placeholder40x40}
						alt="Profile Picture"
						width={112}
						height={112}
						className="size-28 rounded-full"
					/>
					<div className="flex flex-col text-center w-48">
						<Label className="font-semibold">{t("yourChannel")}</Label>
						<Label className="text-neutral-500 w-full truncate">
							{session?.user.name}
						</Label>
					</div>
				</div>
				<div className="px-3 space-y-1 w-full">
					<SidebarItem
						Icon={LayoutDashboard}
						label={t("dashboard")}
						path={"/studio/channel/" + session?.user.id}
						currentPath={pathname}
						textClassName="font-medium text-base"
					/>
					<SidebarItem
						Icon={ListVideo}
						label={t("content")}
						path={"/studio/channel/" + session?.user.id + "/content"}
						currentPath={pathname}
						textClassName="font-medium text-base"
					/>
					<SidebarItem
						Icon={ChartColumn}
						label={t("analytics")}
						path={"/studio/channel/" + session?.user.id + "/analytics"}
						currentPath={pathname}
						textClassName="font-medium text-base"
					/>
					<SidebarItem
						Icon={MessageSquareText}
						label={t("comments")}
						path={"/studio/channel/" + session?.user.id + "/comments"}
						currentPath={pathname}
						textClassName="font-medium text-base"
					/>
					<SidebarItem
						Icon={Captions}
						label={t("subtitles")}
						path={"/studio/channel/" + session?.user.id + "/subtitles"}
						currentPath={pathname}
						textClassName="font-medium text-base"
					/>
					<SidebarItem
						Icon={WandSparkles}
						label={t("customization")}
						path={"/studio/channel/" + session?.user.id + "/customization"}
						currentPath={pathname}
						textClassName="font-medium text-base"
					/>
				</div>
				<div className="px-3 space-y-1 bottom-1 w-full absolute">
					<SidebarItem
						Icon={Settings}
						label={t("misc.settings")}
						path={pathname + "/?action=settings"}
						currentPath={pathname}
						textClassName="font-medium text-base"
						onClick={() => {
							changeDialogType("settings");
						}}
					/>
					<SidebarItem
						Icon={MessageSquareWarning}
						label={t("misc.feedback")}
						path={pathname + "/?action=feedback"}
						currentPath={pathname}
						textClassName="font-medium text-base"
						onClick={() => {
							changeDialogType("feedback");
						}}
					/>
				</div>
			</div>
		);
	}
}
