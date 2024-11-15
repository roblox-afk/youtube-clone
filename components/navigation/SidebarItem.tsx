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
	minimized = false,
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
	minimized?: boolean;
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
				"w-full flex h-10 bg-neutral-800 hover:bg-neutral-700 items-center rounded-xl shadow-none",
				currentPath != path && "bg-transparent",
				minimized ? " justify-center px-2" : "justify-normal px-4",
				className
			)}
		>
			{minimized == true ? (
				<>
					{Icon != undefined && (
						<Icon
							className=""
							color="#fff"
							strokeWidth={currentPath == path ? 2 : 1}
						/>
					)}
				</>
			) : (
				<>
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
				</>
			)}
		</Button>
	);
}
