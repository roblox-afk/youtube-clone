import VideoCard from "@/components/navigation/VideoCard";

export default function Home() {
	return (
		<div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full grid-rows-max">
			<VideoCard
				channelData={{
					name: "Todolo Do",
					image:
						"https://res.cloudinary.com/dafd64b6r/image/upload/f_auto,q_auto/v1/youtube-clone/jsl5ikkuv7yqqbnennpt",
					emailVerified: false,
					id: "testest",
					createdAt: new Date(),
					updatedAt: new Date(),
					email: "test@gmail.com,",
				}}
				data={{
					views: 222222,
					id: "testwe",
					title: "tteeeee",
					thumbnailUrl: "",
					sourceUrl: "",
					description: "",
					isPublic: true,
					isDraft: false,
					comments: [],
					createdAt: new Date("2022-03-25"),
					disLikes: 0,
					likes: 0,
				}}
			/>
			<VideoCard
				channelData={{
					name: "Todolo Do",
					image:
						"https://res.cloudinary.com/dafd64b6r/image/upload/f_auto,q_auto/v1/youtube-clone/jsl5ikkuv7yqqbnennpt",
					emailVerified: false,
					id: "testest",
					createdAt: new Date(),
					updatedAt: new Date(),
					email: "test@gmail.com",
				}}
				data={{
					views: 222,
					id: "testwe",
					title: "tteeeee",
					thumbnailUrl:
						"https://res.cloudinary.com/dafd64b6r/image/upload/f_auto,q_auto/v1/youtube-clone/jsl5ikkuv7yqqbnennpt",
					sourceUrl: "",
					description: "",
					isPublic: true,
					isDraft: false,
					comments: [],
					createdAt: new Date("2024-10-30"),
					disLikes: 0,
					likes: 0,
				}}
			/>
			<VideoCard
				channelData={{
					name: "Todolo Do",
					image:
						"https://res.cloudinary.com/dafd64b6r/image/upload/f_auto,q_auto/v1/youtube-clone/jsl5ikkuv7yqqbnennpt",
					emailVerified: false,
					id: "testest",
					createdAt: new Date(),
					updatedAt: new Date(),
					email: "test@gmail.com,",
				}}
				data={{
					views: 222,
					id: "testwe",
					title: "tteeeee",
					thumbnailUrl:
						"https://res.cloudinary.com/dafd64b6r/image/upload/f_auto,q_auto/v1/youtube-clone/jsl5ikkuv7yqqbnennpt",
					sourceUrl: "",
					description: "",
					isPublic: true,
					isDraft: false,
					comments: [],
					createdAt: new Date(),
					disLikes: 0,
					likes: 0,
				}}
			/>
		</div>
	);
}
