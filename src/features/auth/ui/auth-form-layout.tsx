import { withLoader } from "@/shared/lib/HOCs/withLoader";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/shared/ui/card";

function AuthFormLayout({
	title,
	description,
	fields,
	actions,
	action,
	error,
}: {
	title: string;
	description: string;
	fields: React.ReactNode;
	actions: React.ReactNode;
	error: React.ReactNode;
	action: (formData: FormData) => void;
}) {
	return (
		<Card className='w-full max-w-md'>
			<CardHeader>
				<CardTitle className='text-2xl font-bold text-center'>
					{title}
				</CardTitle>
				<CardDescription className='text-center'>
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={action} className='space-y-4'>
					{fields}
					{error}
					{actions}
				</form>
			</CardContent>
		</Card>
	);
}

export default withLoader(AuthFormLayout);
