"use client";

import { localStorageItemKeyMap } from "@/shared/lib/local-storage";
import { withLoader } from "@/shared/lib/HOCs/withLoader";

export function LogoutFormLayout({
	action,
	actions,
}: {
	action: () => void;
	actions: React.ReactNode;
}) {
	return (
		<>
			<div className='text-lg'>
				{localStorage.getItem(localStorageItemKeyMap.userName)}
			</div>
			<form action={action}>{actions}</form>
		</>
	);
}

export default withLoader(LogoutFormLayout);
