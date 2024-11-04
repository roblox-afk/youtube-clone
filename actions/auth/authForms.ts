import { authClient } from "@/lib/auth/auth-client";
import { z } from "zod";

export type Provider =
	| "apple"
	| "discord"
	| "facebook"
	| "github"
	| "microsoft"
	| "google"
	| "spotify"
	| "twitch"
	| "twitter"
	| "dropbox"
	| "linkedin";

export const PasswordSchema = z
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

export const SignUpSchema = z
	.object({
		username: z
			.string()
			.min(2, {
				message: "Username must be at least 2 characters.",
			})
			.max(70),
		email: z.string().email(),
		password: PasswordSchema,
		confirmPassword: z.string(),
	})
	.refine((data) => data.password == data.confirmPassword, {
		message: "Passwords must match!",
		path: ["confirmPassword"],
	});

export const SignInSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	rememberMe: z.boolean(),
});

export async function SignUp(
	values: z.infer<typeof SignUpSchema>,
	imageUrl: string
) {
	const { error } = await authClient.signUp.email({
		email: values.email,
		password: values.password,
		name: values.username,
		image: imageUrl,
		slash: values.username.toLowerCase(),
		callbackURL: "/",
	});
	if (error) {
		throw new Error(error.message);
	}
}

export async function SignIn(values: z.infer<typeof SignInSchema>) {
	const { error } = await authClient.signIn.email({
		email: values.email,
		password: values.password,
		dontRememberMe: values.rememberMe!,
		callbackURL: "/",
	});
	if (error) {
		throw new Error(error.message);
	}
}

export async function SignInWithSocial(provider: Provider) {
	await authClient.signIn.social({
		provider: provider,
		callbackURL: "/",
	});
}
