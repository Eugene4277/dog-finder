"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/kernel/api-client";
import { AppLoader } from "@/shared/ui/app-loader";
import { routes } from "@/kernel/routes";

export function withAuth<T extends object>(
	WrappedComponent: React.ComponentType<T>
) {
	return function ProtectedComponent(props: T) {
		const router = useRouter();
		const [isLoading, setIsLoading] = useState(true);

		useEffect(() => {
			const checkAuth = async () => {
				let authStatus = null;
				try {
					authStatus = await isAuthenticated();
				} catch (error) {
					console.log(error);
				} finally {
					if (!authStatus) {
						router.push(routes.login());
					} else {
						setIsLoading(false);
					}
				}
			};

			checkAuth();
		}, [router]);

		if (isLoading) {
			return <AppLoader />;
		}

		return <WrappedComponent {...props} />;
	};
}
