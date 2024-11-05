"use client";
import NavBar from "@/components/navigation/NavBar";
import Sidebar from "@/components/navigation/Sidebar";
import StudioNavbarContent from "@/components/navigation/studio/StudioNavbarContent";
import StudioSidebarContent from "@/components/navigation/studio/StudioSidebarContent";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useState } from "react";
import { toast } from "sonner";

export default function StudioLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ channelId: string }>;
}) {
	const unpackedParams = use(params);
	const searchParams = useSearchParams();
	const { data: session, isPending, error } = authClient.useSession();
	const router = useRouter();
	const [settingsOpen, setSettingsOpen] = useState(
		searchParams.has("settingsOpen") ?? false
	);
	if (error) {
		toast.error("Error: " + error.message);
	}
	if (
		(!session && !isPending) ||
		(!isPending && session?.user.id != unpackedParams.channelId)
	) {
		return router.replace("/?error=not_authenticated");
	}

	return (
		<div className="max-w-screen h-screen flex flex-col bg-neutral-800">
			<NavBar backdrop>
				<StudioNavbarContent />
			</NavBar>
			<Sidebar className="border-r border-neutral-700">
				<StudioSidebarContent />
			</Sidebar>
			<main className="relative flex h-full flex-row ml-64 mt-14">
				{children}
			</main>
			<Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Settings</DialogTitle>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}
