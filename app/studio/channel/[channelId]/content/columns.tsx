"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Video } from "@/lib/db/schema";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Placeholder40x40 from "@/public/Placeholder_40x40.svg";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Video2 = {
// 	id: string;
// 	thumbnailUrl: string;
// 	sourceUrl: string;
// 	title: string;
// 	description: string;
// 	visiblity: VideoStatus;
// 	restrictions: VideoRestrictions;
// 	comments: string[];
// 	likes: number;
// 	dislikes: number;
// 	views: number;
// 	createdAt: Date;
// };

export const videoColumns: ColumnDef<Video>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="ml-6"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="ml-6"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "id",
		header: () => <div className="w-[400px] pl-2">Video</div>,
		cell: ({ row }) => {
			return (
				<div className="h-[83px] pl-2 flex-row flex justify-center items-center">
					<div className="w-32 py-2 h-full flex items-center">
						<Image
							src={
								row.original.thumbnailUrl === ""
									? Placeholder40x40
									: row.original.thumbnailUrl
							}
							alt="Thumbnail"
							width={120}
							height={68}
							className="rounded-xl object-fill"
						/>
					</div>
					<div className="w-full pt-[6px] mr-4 flex flex-col">
						<h3 className="pt-2 ml-4">{row.original.title}</h3>
						<p className="text-neutral-400 ml-4">{row.original.description}</p>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "visibility",
		header: "Visibility",
	},
	{
		accessorKey: "restrictions",
		header: "Restrictions",
	},
	{
		accessorKey: "createdAt",
		header: "Date",
	},
	{
		accessorKey: "views",
		header: "Views",
	},
	{
		accessorKey: "comments",
		cell: ({ row }) => {
			return row.original.comments.length;
		},
		header: "Comments",
	},
	{
		accessorKey: "likes",
		header: "Likes (vs. dislikes)",
	},
];
