"use client";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function ErrorProvider() {
	const t = useTranslations("Errors");
	const searchParams = useSearchParams();
	const errorParam = searchParams.get("error");
	return (
		<Suspense>
			{errorParam != null && errorParam !== "" ? (
				<Dialog modal defaultOpen>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>{t(errorParam + ".title")}</DialogTitle>
						</DialogHeader>
						{t(errorParam + ".description")}
					</DialogContent>
				</Dialog>
			) : (
				<></>
			)}
		</Suspense>
	);
}
