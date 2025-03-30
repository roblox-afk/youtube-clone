export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex justify-end items-center h-screen w-screen">
			<div className="bg-red-950 bg-gradient-to-r from-red-950 to-pink-950 size-52 bottom-10 right-6 absolute rounded-full" />
			<div className="bg-red-950 bg-gradient-to-r from-red-950 to-pink-950 rotate-180 size-64 top-10 right-[400px] absolute rounded-full" />
			<main className="mr-16 ~@sm/lg:~w-[24rem]/[32rem] h-[49rem] rounded-3xl bg-white bg-opacity-5 border-neutral-700 shadow-popOut shadow-neutral-400 border p-10 backdrop-blur-3xl">
				{children}
			</main>
		</div>
	);
}
