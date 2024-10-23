import NavBar from "@/components/navigation/NavBar";
import Sidebar from "@/components/navigation/Sidebar";

export default function MainPageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-screen h-screen flex flex-col">
			<NavBar isLoggedIn={false} />
			<Sidebar />
			<main>{children}</main>
		</div>
	);
}
