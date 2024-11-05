import { cn } from "@/lib/utils";

export default function Sidebar({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"fixed top-14 bg-transparent flex w-64 h-full grow overflow-auto scrollbar-none hover:scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-600 scrollbar-thumb-rounded-full",
				className
			)}
		>
			<div className="w-60 flex-col">{children}</div>
		</div>
	);
}
