"use client";
import { useTranslations } from "next-intl";
import GoogleLogo from "@/public/Google_Logo.svg";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, LoaderCircle, UploadCloud } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth/auth-client";

const passwordSchema = z
	.string()
	.min(8, { message: "Password needs to be atleast 8 characters long." })
	.refine((password) => /[A-Z]/.test(password), {
		message: "Password needs to have atleast one uppercase letter.",
	})
	.refine((password) => /[a-z]/.test(password), {
		message: "Password needs to have atleast one lowercase letter.",
	})
	.refine((password) => /[0-9]/.test(password), {
		message: "Password needs to have atleast one number.",
	})
	.refine((password) => /[!@#$%^&*]/.test(password), {
		message: "Password needs to have atleast one special character.",
	});

const signUpSchema = z
	.object({
		username: z
			.string()
			.min(2, {
				message: "Username must be at least 2 characters.",
			})
			.max(70),
		email: z.string().email(),
		password: passwordSchema,
		confirmPassword: z.string(),
	})
	.refine((data) => data.password == data.confirmPassword, {
		message: "Passwords must match!",
		path: ["confirmPassword"],
	});

export default function SignUpPage() {
	const t = useTranslations("Auth.signUp");
	const router = useRouter();
	const imageInput = useRef(null);
	const [currentTab, setCurrentTab] = useState("firstPage");
	const [loadingImage, setLoadingImage] = useState(false);
	const [image, setImage] = useState<string>("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
	});

	async function handleChange(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.files == null || e.target.files.length == 0) return;
		setLoadingImage(true);
		await axios
			.post(
				"/api/images/upload",
				{
					image: e.target.files[0],
				},
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			)
			.then((response) => {
				console.log(response);
				setImage(response.data.secure_url);
				setLoadingImage(false);
			});
	}

	async function onSubmit(values: z.infer<typeof signUpSchema>) {
		const { data, error } = await authClient.signUp.email({
			email: values.email,
			password: values.password,
			name: values.username,
			image: image,
			callbackURL: "/",
		});
		console.log(data);
		console.log(error);
	}

	return (
		<div className="h-full w-full pt-10 flex relative flex-col px-5">
			<button
				className="flex hover:text-neutral-300 ease-in transition-all  mb-2"
				onClick={() =>
					currentTab == "onboarding"
						? setCurrentTab("firstPage")
						: router.replace("/")
				}
			>
				<ChevronLeft />
				Back
			</button>
			<main className="">
				<form onSubmit={handleSubmit(onSubmit)}>
					<AnimatePresence mode="wait">
						<motion.div
							key={currentTab ? currentTab : "empty"}
							initial={{ x: 20, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: -20, opacity: 0 }}
							transition={{ duration: 0.4 }}
						>
							{currentTab == "firstPage" && (
								<>
									<h1 className="text-5xl">{t("title")}</h1>
									<p>{t("subTitle")}</p>
									<div className="mt-4 flex flex-col space-y-4 w-full">
										<input
											className="px-4 py-2 border-neutral-700 border focus:outline focus:outline-2 focus:outline-blue-500 bg-transparent rounded-2xl hover:scale-105 focus:scale-105 ease-in transition-all"
											placeholder="Email Address"
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
										<input
											className="px-4 py-2 border-neutral-700 border focus:outline focus:outline-2 focus:outline-blue-500 bg-transparent rounded-2xl hover:scale-105 focus:scale-105 ease-in transition-all"
											placeholder="Confirm Password"
											type="password"
											{...register("confirmPassword")}
										/>
										{errors.confirmPassword && (
											<span>{errors.confirmPassword.message}</span>
										)}
										<button
											type="button"
											onClick={() => setCurrentTab("onboarding")}
											className="px-4 py-2 bg-gradient-to-br from-blue-600 to-cyan-800 border-neutral-700 border bg-transparent rounded-2xl hover:scale-105 ease-in transition-all"
										>
											{t("continue")}
										</button>
									</div>
									<div className="flex justify-center items-center w-full text-neutral-700 font-semibold my-2">
										<div className="bg-neutral-700 w-[45%] h-0.5 rounded-full" />
										<span className="w-[10%] text-center">Or</span>
										<div className="bg-neutral-700 w-[45%] h-0.5 rounded-full" />
									</div>
									<div className="w-full flex justify-center">
										<button className="rounded-full hover:scale-110 ease-in-out transition-all">
											<Image
												src={GoogleLogo}
												alt="Google logo"
												width={40}
												height={40}
											/>
										</button>
									</div>
								</>
							)}

							{currentTab == "onboarding" && (
								<>
									<h1 className="text-5xl">{t("onBoarding.title")}</h1>
									<p>{t("onBoarding.subTitle")}</p>
									<div className="mt-4 flex flex-col space-y-4 w-full">
										<div className="flex w-full justify-center items-center">
											<div className="flex justify-center items-center size-20 rounded-full bg-transparent border-neutral-700 border shadow-md shadow-neutral-600">
												{image == "" ? (
													<>
														<input
															ref={imageInput}
															type="file"
															onChange={handleChange}
															className="hidden"
														/>
														{loadingImage ? (
															<LoaderCircle
																size={40}
																className="animate-spin"
															/>
														) : (
															<button
																onClick={() => imageInput.current?.click()}
															>
																<UploadCloud size={40} />
															</button>
														)}
													</>
												) : (
													<>
														<Image
															src={image}
															alt="profile picture"
															width={80}
															height={80}
														/>
													</>
												)}
											</div>
										</div>
										<input
											className="px-4 py-2 border-neutral-700 border focus:outline focus:outline-2 focus:outline-blue-500 bg-transparent rounded-2xl hover:scale-105 focus:scale-105 ease-in transition-all"
											placeholder="Username"
											{...register("username")}
										/>
										{errors.username && <span>{errors.username.message}</span>}
										<button
											type="submit"
											className="px-4 py-2 bg-gradient-to-br from-blue-600 to-cyan-800 border-neutral-700 border bg-transparent rounded-2xl hover:scale-105 ease-in transition-all"
										>
											{t("onBoarding.finish")}
										</button>
									</div>
								</>
							)}
						</motion.div>
					</AnimatePresence>
				</form>
			</main>
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
