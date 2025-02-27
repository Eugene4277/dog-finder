import { routes } from "@/kernel/routes";
import { dogsAPI } from "@/kernel/api-client";
import { clearLocalStorage } from "@/kernel/local-storage";

export type LogoutFormState = {
	redirect?: string;
};

export async function logoutAction(
	state: LogoutFormState
): Promise<LogoutFormState> {
	try {
		const response = await dogsAPI.logout();

		if (response === "OK") {
			clearLocalStorage();
		}
		return { redirect: routes.login() };
	} catch (error) {
		return { redirect: routes.login() };
	}
}
