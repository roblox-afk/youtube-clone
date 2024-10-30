"use client";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";

export default function NotificationIconWidget() {
	const { data: session } = authClient.useSession();
	return (
		<>
			{session?.user != null ? (
				<Popover>
					<PopoverTrigger>
						<div className="size-10 hover:bg-neutral-800 rounded-full flex relative justify-center items-center">
							<Bell strokeWidth={1} />
							<span className="absolute top-0 right-[-4px] bg-red-600 rounded-full text-xs border h-4 w-7 flex justify-center items-center border-red-900">
								99+
							</span>
						</div>
					</PopoverTrigger>
					<PopoverContent className="z-[105]"></PopoverContent>
				</Popover>
			) : (
				<></>
			)}
		</>
	);
}
