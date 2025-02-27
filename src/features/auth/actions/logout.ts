import { routes } from "@/kernel/routes";
import { dogsAPI } from "@/kernel/api-client";
import { clearLocalStorage } from "@/kernel/local-storage";

export type LogoutFormState = {
	redirect?: string;
};

export async function logoutAction(
	_: LogoutFormState
): Promise<LogoutFormState> {
	try {
		const response = await dogsAPI.logout();

		if (response === "OK") {
			clearLocalStorage();
		}
		return { redirect: routes.login() };
	} catch (error) {
		console.log(error);

		return { redirect: routes.login() };
	}
}
