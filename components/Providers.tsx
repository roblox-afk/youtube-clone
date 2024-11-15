"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarStoreProvider } from "./providers/sidebarStateProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<NextThemesProvider attribute="class" defaultTheme="dark">
				<SidebarStoreProvider>{children}</SidebarStoreProvider>
			</NextThemesProvider>
		</QueryClientProvider>
	);
}
