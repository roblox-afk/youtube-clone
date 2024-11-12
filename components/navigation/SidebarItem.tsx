import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function SidebarItem({
	Icon,
	ImagePath = "",
	label,
	path,
	currentPath,
	reversed = false,
	className = "",
	textClassName = "",
	onClick,
}: {
	Icon?: React.FC<LucideProps>;
	ImagePath?: string;
	label: string;
	path: string;
	currentPath: string;
	reversed?: boolean;
	className?: string;
	textClassName?: string;
	onClick?: () => void;
}) {
	const router = useRouter();
	return (
		<Button
			onClick={() => {
				if (onClick == null) {
					router.push(path);
				} else {
					onClick();
				}
			}}
			className={cn(
				"w-full flex px-4 h-10 bg-neutral-800 hover:bg-neutral-700 items-center rounded-xl shadow-none justify-normal",
				currentPath != path && "bg-transparent",
				className
			)}
		>
			{reversed == false && Icon != undefined && (
				<Icon
					className="mr-6"
					color="#fff"
					strokeWidth={currentPath == path ? 2 : 1}
				/>
			)}
			{reversed == false && ImagePath && (
				<Image
					className="mr-6"
					src={ImagePath}
					alt="Image"
					width={24}
					height={24}
				/>
			)}
			<span
				className={cn(
					"flex text-white text-sm",
					currentPath == path && "font-medium",
					textClassName
				)}
			>
				{label}
			</span>
			{reversed && Icon != undefined && (
				<Icon
					className="ml-1"
					color="#fff"
					strokeWidth={currentPath == path ? 2 : 1}
				/>
			)}
			{reversed && ImagePath && (
				<Image
					className="ml-1"
					src={ImagePath}
					alt="Image"
					width={24}
					height={24}
				/>
			)}
		</Button>
	);
}
