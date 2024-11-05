import { cn } from "@/lib/utils";

export default function NavBar({
	children,
	backdrop = false,
}: {
	children: React.ReactNode;
	backdrop: boolean;
}) {
	return (
		<div
			className={cn(
				"bg-transparent z-[100] fixed top-0 left-0 right-0  flex h-14 px-4 items-center justify-between text-white",
				backdrop && "shadow-md shadow-neutral-900"
			)}
		>
			{children}
		</div>
	);
}
