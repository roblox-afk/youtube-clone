import { useTranslations } from "next-intl";
import GoogleLogo from "@/public/Google_Logo.svg";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function SignUpPage() {
	const t = useTranslations("Auth.signUp");
	return (
		<div className="h-full w-full pt-10 flex relative flex-col px-5">
			<Link
				href="/"
				className="flex hover:text-neutral-300 ease-in transition-all  mb-2"
			>
				<ChevronLeft />
				Back
			</Link>
			<h1 className="text-5xl">{t("title")}</h1>
			<p>{t("subTitle")}</p>
			<form className="mt-4 flex flex-col space-y-4 w-full">
				<input
					className="px-4 py-2 border-neutral-700 border focus:outline focus:outline-2 focus:outline-blue-500 bg-transparent rounded-2xl hover:scale-105 focus:scale-105 ease-in transition-all"
					placeholder="Username"
					type="text"
				/>
				<input
					className="px-4 py-2 border-neutral-700 border focus:outline focus:outline-2 focus:outline-blue-500 bg-transparent rounded-2xl hover:scale-105 focus:scale-105 ease-in transition-all"
					placeholder="Email Address"
					type="email"
				/>
				<input
					className="px-4 py-2 border-neutral-700 border focus:outline focus:outline-2 focus:outline-blue-500 bg-transparent rounded-2xl hover:scale-105 focus:scale-105 ease-in transition-all"
					placeholder="Password"
					type="password"
				/>
				<input
					className="px-4 py-2 border-neutral-700 border focus:outline focus:outline-2 focus:outline-blue-500 bg-transparent rounded-2xl hover:scale-105 focus:scale-105 ease-in transition-all"
					placeholder="Confirm Password"
					type="password"
				/>
				<button
					type="submit"
					className="px-4 py-2 bg-gradient-to-br from-blue-600 to-cyan-800 border-neutral-700 border bg-transparent rounded-2xl hover:scale-105 ease-in transition-all"
				>
					Signup
				</button>
			</form>
			<div className="flex justify-center items-center w-full text-neutral-700 font-semibold my-2">
				<div className="bg-neutral-700 w-[45%] h-0.5 rounded-full" />
				<span className="w-[10%] text-center">Or</span>
				<div className="bg-neutral-700 w-[45%] h-0.5 rounded-full" />
			</div>
			<div className="w-full flex justify-center">
				<button className="rounded-full hover:scale-110 ease-in-out transition-all">
					<Image src={GoogleLogo} alt="Google logo" width={40} height={40} />
				</button>
			</div>
			<div className="w-full flex flex-col justify-center absolute bottom-14 space-y-2 px-4">
				<p className="text-center">
					Already Registered?
					<Link href="/sign-in">&nbsp;Sign In</Link>
				</p>
				<div className="flex justify-between w-full">
					<Link href="#">Terms & Conditions</Link>
					<Link href="#">Privacy</Link>
					<Link href="#">Support</Link>
				</div>
			</div>
		</div>
	);
}
