"use client";

import { useActionState } from "react";
import AuthFormLayout from "../ui/auth-form-layout";
import { SubmitButton } from "../ui/submit-button";
import { AuthFields } from "../ui/fields";
import { ErrorMessage } from "../ui/error-message";
import { LoginFormState, loginAction } from "../actions/login";
import { useLoginRedirect } from "../model/use-redirect";

export function LoginForm() {
	const [formState, action, isPending] = useActionState(
		loginAction,
		{} as LoginFormState
	);

	const { isLoading } = useLoginRedirect(formState);

	return (
		<AuthFormLayout
			isLoading={isLoading || isPending}
			title='Login'
			description='Welcome! Please login to your account'
			action={action}
			fields={<AuthFields {...formState} />}
			actions={<SubmitButton isPending={isPending}>Submit</SubmitButton>}
			error={<ErrorMessage error={formState?.errors?._errors} />}
		/>
	);
}
