"use client";
import NavBar from "@/components/navigation/NavBar";
import NavBarContent from "@/components/navigation/NavbarContent";
import Sidebar from "@/components/navigation/Sidebar";
import SidebarContent from "@/components/navigation/SidebarContent";
import { useSidebarStore } from "@/components/providers/sidebarStateProvider";
import { cn } from "@/lib/utils";

export default function MainPageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { expanded } = useSidebarStore((state) => state);
	return (
		<div className="max-w-screen max-h-screen flex flex-col">
			<NavBar className="px-4 h-14">
				<NavBarContent />
			</NavBar>
			<Sidebar>
				<SidebarContent />
			</Sidebar>
			<main
				className={cn(
					"relative flex h-full flex-row mt-14",
					expanded ? "ml-64" : "ml-[72px]"
				)}
			>
				{children}
			</main>
		</div>
	);
}
