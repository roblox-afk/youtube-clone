"use client";
import { useTranslations } from "next-intl";
import GoogleLogo from "@/public/Google_Logo.svg";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import {
	SignIn,
	SignInSchema,
	SignInWithSocial,
} from "@/actions/auth/authForms";
import { useCallback } from "react";
import { toast } from "sonner";

export default function SignInPage() {
	const t = useTranslations("Auth.signIn");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof SignInSchema>>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			rememberMe: true,
		},
	});

	const mutation = useMutation({
		mutationFn: SignIn,
		onSuccess: () => {
			toast.success("Signed In, Please wait while we redirect you!", {
				id: "sign-in",
			});
		},
		onError: (error: Error) => {
			toast.error("Failed to sign in. Error: " + error.message, {
				id: "sign-in",
			});
		},
	});
	const onSubmit = useCallback(
		(values: z.infer<typeof SignInSchema>) => {
			toast.loading("Signing in...", { id: "sign-in" });
			mutation.mutate(values);
		},
		[mutation]
	);

	return (
		<div className="h-full w-96 pt-10 flex flex-col px-5 relative">
			<Link
				href="/"
				className="flex hover:text-neutral-300 ease-in transition-all mb-2"
			>
				<ChevronLeft />
				Back
			</Link>
			<h1 className="text-5xl">{t("title")}</h1>
			<p>{t("subTitle")}</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="mt-4 flex flex-col space-y-4 w-full"
			>
				<input
					className="px-4 py-2 border-neutral-700 border focus:outline focus:outline-2 focus:outline-blue-500 bg-transparent rounded-2xl hover:scale-105 focus:scale-105 ease-in transition-all"
					placeholder="Email Address"
					type="email"
					{...register("email")}
				/>
				{errors.email && <span>{errors.email.message}</span>}
				<input
					className="px-4 py-2 border-neutral-700 border focus:outline focus:outline-2 focus:outline-blue-500 bg-transparent rounded-2xl hover:scale-105 focus:scale-105 ease-in transition-all"
					placeholder="Password"
					type="password"
					{...register("password")}
				/>
				{errors.password && <span>{errors.password.message}</span>}
				<div className="space-x-2 flex items-center">
					<Checkbox {...register("rememberMe")} />
					<Label>Remember me?</Label>
				</div>
				{errors.rememberMe && <span>{errors.rememberMe.message}</span>}
				<button
					type="submit"
					className="px-4 py-2 bg-gradient-to-br from-blue-600 to-cyan-800 border-neutral-700 border bg-transparent rounded-2xl hover:scale-105 ease-in transition-all"
				>
					Sign In
				</button>
				<Link
					href="/forgotpassword"
					className="text-center hover:scale-105 ease-in transition-all"
				>
					Forgot password?
				</Link>
			</form>
			<div className="flex justify-center items-center w-full text-neutral-700 font-semibold my-2">
				<div className="bg-neutral-700 w-[45%] h-0.5 rounded-full" />
				<span className="w-[10%] text-center">Or</span>
				<div className="bg-neutral-700 w-[45%] h-0.5 rounded-full" />
			</div>
			<div className="w-full flex justify-center">
				<button
					className="rounded-full hover:scale-110 ease-in-out transition-all"
					onClick={() => SignInWithSocial("google")}
				>
					<Image src={GoogleLogo} alt="Google logo" width={40} height={40} />
				</button>
			</div>
			<div className="w-full flex flex-col justify-center absolute bottom-14 space-y-2 px-4">
				<p className="text-center">
					Don&acute;t have an account?
					<Link href="/sign-up">&nbsp;Sign up</Link>
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
