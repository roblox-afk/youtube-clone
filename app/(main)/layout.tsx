import NavBar from "@/components/navigation/NavBar";
import Sidebar from "@/components/navigation/Sidebar";

export default function MainPageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-screen h-screen">
			<NavBar isLoggedIn={false} />
			<main>
				<Sidebar />
				{children}
			</main>
		</div>
	);
}
