import NavBar from "@/components/navigation/NavBar";
import NavBarContent from "@/components/navigation/NavbarContent";
import Sidebar from "@/components/navigation/Sidebar";
import SidebarContent from "@/components/navigation/SidebarContent";

export default function MainPageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="max-w-screen max-h-screen flex flex-col">
			<NavBar className="px-4 h-14">
				<NavBarContent />
			</NavBar>
			<Sidebar>
				<SidebarContent />
			</Sidebar>
			<main className="relative flex h-full flex-row ml-64 mt-14">
				{children}
			</main>
		</div>
	);
}
