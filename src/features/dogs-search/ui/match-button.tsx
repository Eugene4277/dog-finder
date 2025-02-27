import { Button } from "@/shared/ui/button";

export function MatchButton({
	action,
	isDisabled,
}: {
	action: () => void;
	isDisabled: boolean;
}) {
	return (
		<Button onClick={action} disabled={isDisabled} className='w-full'>
			Find a Match
		</Button>
	);
}
