import { ListFilter } from "lucide-react";

export default function StudioContentFilterBar() {
	return (
		<div className="flex flex-row h-12 w-full border border-l-0 border-neutral-700">
			<div className="flex p-2 my-1 ml-5 mr-6 size-10">
				<ListFilter width={24} height={24} className="size-6" />
			</div>
			<div className="flex h-full w-full">
				<input
					placeholder="Filter"
					className="w-full bg-transparent focus:outline-none"
				/>
			</div>
		</div>
	);
}
