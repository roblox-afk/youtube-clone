import NavBar from "@/components/navigation/NavBar";
import Sidebar from "@/components/navigation/Sidebar";

export default function MainPageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="max-w-screen max-h-screen flex flex-col">
			<NavBar />
			<Sidebar />
			<main className="relative flex h-full flex-row ml-64 mt-14">
				{children}
			</main>
		</div>
	);
}
