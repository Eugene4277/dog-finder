import { withLoader } from "@/shared/lib/HOCs/withLoader";

function DogsSearchLayout({
	children: filters,
	mainSection,
	pagination,
	actions,
	matchAction,
	matchDialog,
}: {
	children: React.ReactNode;
	mainSection: React.ReactNode;
	pagination: React.ReactNode;
	actions: React.ReactNode;
	matchAction: React.ReactNode;
	matchDialog: React.ReactNode;
}) {
	return (
		<div className='container mx-auto p-4'>
			<div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
				<div className='md:col-span-1 space-y-4'>
					<div className='space-y-4'>
						{filters}
						<div className='grid grid-cols-1 xl:grid-cols-2 gap-2'>
							{actions}
						</div>
						{matchAction}
					</div>
				</div>

				<div className='md:col-span-3'>
					{mainSection}
					{pagination}
				</div>
			</div>
			{matchDialog}
		</div>
	);
}

export default withLoader(DogsSearchLayout);
