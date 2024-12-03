"use client";
import NavBar from "@/components/navigation/NavBar";
import Sidebar from "@/components/navigation/Sidebar";
import CreatePostDialog from "@/components/navigation/studio/dialogs/CreatePostDialog";
import FeedbackDialog from "@/components/navigation/studio/dialogs/FeedbackDialog";
import SettingsDialog from "@/components/navigation/studio/dialogs/SettingsDialog";
import UploadVideoDialog from "@/components/navigation/studio/dialogs/UploadVideoDialog";
import StudioNavbarContent from "@/components/navigation/studio/StudioNavbarContent";
import { useSidebarStore } from "@/components/providers/sidebarStateProvider";
import { Dialog } from "@/components/ui/dialog";
import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

const StudioSidebarContent = dynamic(
	() => import("@/components/navigation/studio/StudioSidebarContent"),
	{ ssr: false }
);

export default function StudioLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ channelId: string }>;
}) {
	const unpackedParams = use(params);
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { data: session, isPending, error } = authClient.useSession();
	const router = useRouter();
	const [dialogOpen, setDialogOpen] = useState(
		searchParams.has("action") && searchParams.get("action") != ""
			? true
			: false
	);
	const [dialogType] = useState(searchParams.get("action") ?? "");
	const { expanded } = useSidebarStore((state) => state);
	if (error) {
		toast.error("Error: " + error.message);
	}
	useEffect(() => {
		if (
			(!session && !isPending) ||
			(!isPending && session?.user.id != unpackedParams.channelId)
		) {
			router.push("/?error=not_authenticated");
		}

		setDialogOpen(dialogType !== "");
	}, [isPending, router, session, unpackedParams, dialogType]);

	function changeDialogType(newType: string) {
		const newParams = new URLSearchParams(searchParams.toString());
		if (newType === "") {
			newParams.delete("action");
		} else {
			newParams.set("action", newType);
		}
		router.push(pathname + "?" + newParams.toString());
	}

	return (
		<div className="max-w-screen h-screen flex flex-col bg-neutral-800">
			<NavBar backdrop className="h-16">
				<StudioNavbarContent />
			</NavBar>
			<Sidebar className="border-r border-neutral-700 top-16 pb-16">
				<StudioSidebarContent changeDialogType={changeDialogType} />
			</Sidebar>
			<main
				className={cn(
					"relative flex h-full flex-row mt-14",
					expanded ? "ml-64" : "ml-[72px]"
				)}
			>
				{children}
			</main>
			<Dialog
				open={dialogOpen}
				onOpenChange={(newState: boolean) => {
					setDialogOpen(newState);
					if (newState == false) changeDialogType("");
				}}
			>
				{dialogType === "upload" ? <UploadVideoDialog /> : <></>}
				{dialogType === "post" ? <CreatePostDialog /> : <></>}
				{dialogType === "settings" ? <SettingsDialog /> : <></>}
				{dialogType === "feedback" ? <FeedbackDialog /> : <></>}
			</Dialog>
		</div>
	);
}
