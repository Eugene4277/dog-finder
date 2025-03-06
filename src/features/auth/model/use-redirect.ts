import { useEffect, useState } from "react";
import { LoginFormState } from "../actions/login";
import { useRouter } from "next/navigation";
import { dogsAPI } from "@/kernel/api-client";
import { routes } from "@/kernel/routes";

export function useLoginRedirect(formState: LoginFormState) {
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (formState.redirect) {
			router.push(formState.redirect);
		}
	}, [formState, router]);

	useEffect(() => {
		const checkAuth = async () => {
			let authStatus = null;
			try {
				authStatus = await dogsAPI.isAuthenticated();
			} catch (error) {
				console.log(error);
			} finally {
				if (authStatus) {
					router.push(routes.home());
				} else {
					setIsLoading(false);
				}
			}
		};

		checkAuth();
	}, [router]);

	return { isLoading };
}
