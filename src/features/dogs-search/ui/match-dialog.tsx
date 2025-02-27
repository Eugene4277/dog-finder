import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { PartyPopper } from "lucide-react";
import { Dog } from "@/kernel/api-client";

interface MatchDialogProps {
	isOpen: boolean;
	onClose: () => void;
	matchedDog: Dog | null;
}

export function MatchDialog({ isOpen, onClose, matchedDog }: MatchDialogProps) {
	if (!matchedDog) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2 text-2xl'>
						<PartyPopper className='h-6 w-6 text-primary' />
						It's a Match!
					</DialogTitle>
					<DialogDescription className='text-base'>
						We've found the perfect companion for you! Meet your new
						potential friend:
					</DialogDescription>
				</DialogHeader>
				<div className='mt-4'>
					<div className='aspect-square w-full relative overflow-hidden rounded-lg mb-4'>
						<img
							src={matchedDog.img}
							alt={matchedDog.name}
							className='object-cover w-full h-full'
						/>
					</div>
					<div className='space-y-3'>
						<div>
							<h3 className='font-semibold text-xl'>
								{matchedDog.name}
							</h3>
							<p className='text-muted-foreground'>
								{matchedDog.breed}
							</p>
						</div>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<p className='text-sm text-muted-foreground'>
									Age
								</p>
								<p className='font-medium'>
									{matchedDog.age} years
								</p>
							</div>
							<div>
								<p className='text-sm text-muted-foreground'>
									Location
								</p>
								<p className='font-medium'>
									ZIP: {matchedDog.zip_code}
								</p>
							</div>
						</div>
						<p className='text-sm text-muted-foreground pt-2'>
							{matchedDog.name} would make a wonderful addition to
							your family. They're eagerly waiting to meet you and
							share countless happy moments together!
						</p>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={onClose} className='w-full'>
						Thanks, Can't Wait to Meet {matchedDog.name}!
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
