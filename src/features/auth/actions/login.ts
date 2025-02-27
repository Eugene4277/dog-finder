import { dogsAPI } from "@/kernel/api-client";
import { localStorageItemKeyMap } from "@/kernel/local-storage";
import { routes } from "@/kernel/routes";
import { z } from "zod";

export type LoginFormState = {
	formData?: FormData;
	errors?: {
		name?: string;
		email?: string;
		_errors?: string;
	};
	redirect?: string;
};

const formDataSchema = z.object({
	name: z.string().min(3),
	email: z.string().min(3).email("Invalid email format"),
});

export async function loginAction(
	state: LoginFormState,
	formData: FormData
): Promise<LoginFormState> {
	const data = Object.fromEntries(formData.entries());

	const validated = formDataSchema.safeParse(data);

	if (!validated.success) {
		const formattedErrors = validated.error.format();
		return {
			...state,
			formData,
			errors: {
				name: formattedErrors.name?._errors.join(", "),
				email: formattedErrors.email?._errors.join(", "),
				_errors: formattedErrors._errors.join(", "),
			},
		};
	}

	const loginFailedError = {
		...state,
		formData,
		errors: {
			_errors: "Login failed. Please check your credentials.",
		},
	};

	try {
		const response = await dogsAPI.login(validated.data);

		if (response === "OK") {
			localStorage.setItem(
				localStorageItemKeyMap.userName,
				validated.data.name
			);
			localStorage.setItem(
				localStorageItemKeyMap.userEmailEncoded,
				btoa(validated.data.email)
			);
			return { formData, redirect: routes.home() };
		} else {
			return loginFailedError;
		}
	} catch (error) {
		console.log(error);

		return loginFailedError;
	}
}
