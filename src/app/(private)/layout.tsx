"use client";

import { LogoutForm } from "@/features/auth/server";
import { withAuth } from "@/shared/lib/HOCs/withAuth";
import Image from "next/image";

function PrivateLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='flex flex-col grow'>
			<header className='px-10 py-4 flex flex-row gap-4 justify-between border-b border-b-primary/50 items-center'>
				<div className='flex gap-1 items-center'>
					<Image alt='Logo' src='/logo.png' height={40} width={40} />
					<span className='text-xl'>Dog Finder</span>
				</div>
				<div className='flex items-center gap-4'>
					<LogoutForm />
				</div>
			</header>
			{children}
		</div>
	);
}

export default function LayoutWrapper(props: { children: React.ReactNode }) {
	return withAuth(PrivateLayout)(props);
}
