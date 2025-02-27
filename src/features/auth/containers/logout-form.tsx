"use client";

import { useRouter } from "next/navigation";
import { useActionState } from "react";

import { Button } from "@/shared/ui/button";
import { logoutAction, LogoutFormState } from "../actions/logout";
import { useEffect } from "react";
import LogoutFormLayout from "../ui/logout-form-layout";

export function LogoutForm() {
	const router = useRouter();
	const [formState, action, isPending] = useActionState(
		logoutAction,
		{} as LogoutFormState
	);

	useEffect(() => {
		if (formState.redirect) {
			router.push(formState.redirect);
		}
	}, [formState]);

	return (
		<LogoutFormLayout
			isLoading={isPending}
			action={action}
			actions={<Button>Sign Out</Button>}
		/>
	);
}
