import { authMiddleware } from "better-auth/next-js";
import { NextResponse } from "next/server";

export default authMiddleware({
	redirectTo: "/sign-in",
	customRedirect: async (session, request) => {
		const baseURL = request.nextUrl.origin;
		if (request.nextUrl.pathname === "/sign-in" && session) {
			return NextResponse.redirect(new URL("/", baseURL));
		}
		return NextResponse.next();
	},
});

export const config = {
	matcher: ["/dashboard/:path*", "/sign-in"],
};
