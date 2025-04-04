import { clsx, type ClassValue } from "clsx";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const timeUnits = [
	{ label: "year", seconds: 31536000 },
	{ label: "month", seconds: 2592000 },
	{ label: "week", seconds: 604800 },
	{ label: "day", seconds: 86400 },
	{ label: "hour", seconds: 3600 },
	{ label: "minute", seconds: 60 },
	{ label: "second", seconds: 1 },
];

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

function calculateTimeDifference(time: number) {
	for (const { label, seconds } of timeUnits) {
		const interval = Math.floor(time / seconds);
		if (interval >= 1) {
			return {
				interval: interval,
				unit: label,
			};
		}
	}
	return {
		interval: 0,
		unit: "",
	};
}

export function FormatTimeSince(
	date: string | number | Date,
	removeSeconds: boolean
) {
	const time = Math.floor(
		(new Date().valueOf() - new Date(date).valueOf()) / 1000
	);
	const { interval, unit } = calculateTimeDifference(time);
	const suffix = interval !== 1 ? "" : "s";
	return suffix === "s" && removeSeconds
		? "Now"
		: `${interval} ${unit}${suffix} ago`;
}

export function FormatTimeFromSeconds(secs: number): string {
	const hours = Math.floor(secs / 3600);
	const minutes = Math.floor(secs / 60) % 60;
	const seconds = secs % 60;

	return [hours, minutes, seconds]
		.map((v) => (v < 10 ? "0" + v : v))
		.filter((v, i) => v !== "00" || i > 0)
		.join(":");
}

export function useMediaQuery(query: string) {
	"use client";
	const [matches, setMatches] = React.useState(false);

	React.useEffect(() => {
		const matchQueryList = window.matchMedia(query);
		function handleChange(e: { matches: boolean }) {
			setMatches(e.matches);
		}
		matchQueryList.addEventListener("change", handleChange);

		return () => {
			matchQueryList.removeEventListener("change", handleChange);
		};
	}, [query]);

	return matches;
}
