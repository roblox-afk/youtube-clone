import { Label } from "../ui/label";

export default function VideoCard() {
	return (
		<div className="flex w-80 h-full flex-col">
			<div className="w-full h-48 bg-white"></div>
			<div className=" w-full">
				<Label className="flex truncate w-64">
					12222222222222222222222222222222222
				</Label>
				<Label>testtesttesttest</Label>
				<div className="flex flex-row items-center">
					<Label>403k views</Label>
					<div className="rounded-full size-1 bg-white mx-2" />
					<Label>1 year ago</Label>
				</div>
			</div>
		</div>
	);
}
