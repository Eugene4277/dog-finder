import { useId } from "react";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";

export function AuthFields({
	formData,
	errors,
}: {
	formData?: FormData;
	errors?: {
		name?: string;
		email?: string;
	};
}) {
	const nameId = useId();
	const emailId = useId();
	return (
		<>
			<div className='space-y-2'>
				<Label htmlFor={nameId}>Name</Label>
				<Input
					id={nameId}
					type='name'
					name='name'
					placeholder='Enter name'
					required
					defaultValue={formData?.get("name")?.toString()}
				></Input>
				{errors?.name && <div>{errors.name}</div>}
			</div>
			<div className='space-y-2'>
				<Label htmlFor={emailId}>Email</Label>
				<Input
					id={emailId}
					type='email'
					name='email'
					placeholder='Enter email'
					required
					defaultValue={formData?.get("email")?.toString()}
				></Input>
				{errors?.email && <div>{errors.email}</div>}
			</div>
		</>
	);
}
