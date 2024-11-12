import { cn } from "@/lib/utils";

export default function NavBar({
	children,
	className = "",
	backdrop = false,
}: {
	children: React.ReactNode;
	className?: string;
	backdrop?: boolean;
}) {
	return (
		<div
			className={cn(
				"bg-transparent z-[100] fixed top-0 left-0 right-0 flex items-center justify-between text-white",
				className,
				backdrop && "shadow-md shadow-neutral-900"
			)}
		>
			{children}
		</div>
	);
}
