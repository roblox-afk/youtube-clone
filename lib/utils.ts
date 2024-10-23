import { extendTailwindMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { withFluid } from "@fluid-tailwind/tailwind-merge";

export const twMerge = extendTailwindMerge(withFluid);

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
