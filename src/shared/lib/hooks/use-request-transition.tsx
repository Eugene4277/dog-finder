import { clearLocalStorage } from "@/kernel/local-storage";
import { routes } from "@/kernel/routes";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function useRequestTransition(): [
	boolean,
	<T>(cb: () => Promise<T>) => void
] {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	function executeSafeTransition<T>(cb: () => Promise<T>) {
		startTransition(async () => {
			try {
				await cb();
			} catch (error) {
				clearLocalStorage();
				router.push(routes.login());
			}
		});
	}

	return [isPending, executeSafeTransition];
}
