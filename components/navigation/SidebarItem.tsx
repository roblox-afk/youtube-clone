import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import Link from "next/link";

export default function SidebarItem({
	Icon,
	label,
	path,
	currentPath,
	reversed = false,
	className = "",
}: {
	Icon: React.FC<LucideProps>;
	label: string;
	path: string;
	currentPath: string;
	reversed?: boolean;
	className?: string;
}) {
	return (
		<Link
			href={path}
			className={cn(
				"w-full flex px-4 h-10 bg-neutral-800 hover:bg-neutral-700 items-center rounded-xl",
				currentPath != path && "bg-transparent",
				className
			)}
		>
			{reversed == false && (
				<Icon
					className="mr-6"
					color="#fff"
					strokeWidth={currentPath == path ? 2 : 1}
				/>
			)}
			<span
				className={cn(
					"flex text-white text-sm",
					currentPath == path && "font-medium"
				)}
			>
				{label}
			</span>
			{reversed && (
				<Icon
					className="ml-1"
					color="#fff"
					strokeWidth={currentPath == path ? 2 : 1}
				/>
			)}
		</Link>
	);
}
