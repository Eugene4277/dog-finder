"use client";
import { AppLoader } from "@/shared/ui/app-loader";

export function withLoader<T extends object>(
	WrappedComponent: React.ComponentType<T>
) {
	return function ComponentWithLoader(props: { isLoading: boolean } & T) {
		const { isLoading, ...rest } = props;

		return (
			<>
				{isLoading && <AppLoader />}
				<WrappedComponent {...(rest as T)} />
			</>
		);
	};
}
