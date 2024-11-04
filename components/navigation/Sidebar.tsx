export default function Sidebar({ children }: { children: React.ReactNode }) {
	return (
		<div className="fixed top-14 bg-black flex w-64 h-full grow overflow-auto scrollbar-none hover:scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-600 scrollbar-thumb-rounded-full">
			<div className="w-60 flex-col">{children}</div>
		</div>
	);
}
