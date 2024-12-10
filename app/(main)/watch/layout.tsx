import { Suspense } from "react";

export default function WatchPageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Suspense>{children}</Suspense>;
}
