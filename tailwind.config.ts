import type { Config } from "tailwindcss";
import tailwind_Scrollbar from "tailwind-scrollbar";
import fluid, { extract, screens } from "fluid-tailwind";

const config: Config = {
	content: {
		files: [
			"./pages/**/*.{js,ts,jsx,tsx,mdx}",
			"./components/**/*.{js,ts,jsx,tsx,mdx}",
			"./app/**/*.{js,ts,jsx,tsx,mdx}",
		],
		extract,
	},
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
		},
		screens,
	},
	plugins: [
		tailwind_Scrollbar({
			preferredStrategy: "pseudoelements",
			nocompatible: true,
		}),
		fluid,
	],
};
export default config;
