export default function NavBar({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-black z-[100] fixed top-0 left-0 right-0  flex h-14 px-4 items-center justify-between text-white">
			{children}
		</div>
	);
}
