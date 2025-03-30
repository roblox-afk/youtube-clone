"use client";
import { cn, useMediaQuery } from "@/lib/utils";
import { useSidebarStore } from "../providers/sidebarStateProvider";
import { useEffect } from "react";

export default function Sidebar({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const isExpandable = useMediaQuery("(min-width: 1200px)");
	const isMobile = useMediaQuery("(max-width: 790px)");
	const { expanded, minimized, setExpanded, setMinimized } = useSidebarStore(
		(state) => state
	);

	useEffect(() => {
		setExpanded(isExpandable);
		setMinimized(isMobile);
	}, [isExpandable, isMobile, setExpanded, setMinimized]);

	return (
		<div
			className={cn(
				"fixed top-14 pb-14 bg-transparent flex h-full grow overflow-auto scrollbar-none hover:scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-600 scrollbar-thumb-rounded-full",
				className,
				expanded ? "w-64" : "w-[72px] px-1",
				minimized ? "hidden" : ""
			)}
			suppressHydrationWarning
		>
			<div
				className={cn("flex-col", expanded ? "w-60" : "w-16")}
				suppressHydrationWarning
			>
				{children}
			</div>
		</div>
	);
}
