import { authClient } from "@/lib/auth/auth-client";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Bell, ChevronDown } from "lucide-react";

export default function SubscribeButton({ channelId }: { channelId: string }) {
	const { isPending, data: session } = authClient.useSession();
	return (
		<>
			{isPending || session?.user == null ? (
				<Popover>
					<PopoverTrigger asChild>
						<Button className="rounded-full font-semibold">Subscribe</Button>
					</PopoverTrigger>
					<PopoverContent>Sign in to continue</PopoverContent>
				</Popover>
			) : (
				<>
					{session.user.subscriptions?.includes(channelId) ? (
						<Popover>
							<PopoverTrigger asChild>
								<Button className="rounded-full font-semibold">
									<Bell />
									Subscribed
									<ChevronDown />
								</Button>
							</PopoverTrigger>
						</Popover>
					) : (
						<Button className="rounded-full font-semibold">Subscribe</Button>
					)}
				</>
			)}
		</>
	);
}
