import { authClient } from "@/lib/auth/auth-client";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Bell, ChevronDown } from "lucide-react";
import {
	subscribeToChannel,
	unsubscribeFromChannel,
} from "@/actions/content/channel";
import { useQuery } from "@tanstack/react-query";

export default function SubscribeButton({
	channelId,
	refetch,
}: {
	channelId: string;
	refetch: () => void;
}) {
	const {
		isPending: isPending,
		data: sessionData,
		refetch: refetchSession,
	} = useQuery({
		queryKey: [],
		queryFn: () => authClient.getSession(),
	});

	return (
		<>
			{isPending ||
			sessionData === null ||
			sessionData === undefined ||
			sessionData.data === null ||
			sessionData.data.user === null ? (
				<Popover>
					<PopoverTrigger asChild>
						<Button className="rounded-full font-semibold">Subscribe 2</Button>
					</PopoverTrigger>
					<PopoverContent>Sign in to continue</PopoverContent>
				</Popover>
			) : (
				<>
					{sessionData.data.user.subscriptions?.includes(channelId) &&
					sessionData.data != null ? (
						<Popover>
							<PopoverTrigger asChild>
								<Button className="rounded-full font-semibold">
									<Bell />
									Subscribed
									<ChevronDown />
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								<Button
									onClick={() => {
										unsubscribeFromChannel(
											channelId,
											sessionData.data == null ? "" : sessionData.data.user.id
										);
										refetchSession();
										refetch();
									}}
								>
									Unsubscribe
								</Button>
							</PopoverContent>
						</Popover>
					) : (
						<Button
							className="rounded-full font-semibold"
							onClick={() => {
								subscribeToChannel(
									channelId,
									sessionData.data == null ? "" : sessionData.data.user.id
								);
								refetchSession();
								refetch();
							}}
						>
							Subscribe
						</Button>
					)}
				</>
			)}
		</>
	);
}
