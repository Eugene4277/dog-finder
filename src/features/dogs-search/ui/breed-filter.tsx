import { Button } from "@/shared/ui/button";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/shared/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

import { Badge } from "@/shared/ui/badge";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/shared/lib/css";
import { Label } from "@/shared/ui/label";
import { DogFilters } from "../domain";

export function BreedFilter({
	pendingFilters,
	setPendingFilters,
	isOpen,
	breeds,
	removeBreed,
	setOpenBreeds,
}: {
	pendingFilters: DogFilters;
	setPendingFilters: (filters: DogFilters) => void;
	isOpen: boolean;
	breeds: string[];
	removeBreed: (breed: string) => void;
	setOpenBreeds: (state: boolean) => void;
}) {
	return (
		<div className='space-y-2'>
			<Label>Breeds</Label>
			<Popover open={isOpen} onOpenChange={setOpenBreeds}>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						role='combobox'
						aria-expanded={isOpen}
						className='w-full justify-between'
					>
						Select breeds...
						<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-full p-0'>
					<Command>
						<CommandInput placeholder='Search breeds...' />
						<CommandList>
							<CommandEmpty>No breed found.</CommandEmpty>
							<CommandGroup>
								<ScrollArea className='h-72'>
									{breeds.map((breed) => (
										<CommandItem
											key={breed}
											onSelect={() => {
												setPendingFilters({
													...pendingFilters,
													breeds: pendingFilters.breeds.includes(
														breed
													)
														? pendingFilters.breeds.filter(
																(b) =>
																	b !== breed
														  )
														: [
																...pendingFilters.breeds,
																breed,
														  ],
												});
											}}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													pendingFilters.breeds.includes(
														breed
													)
														? "opacity-100"
														: "opacity-0"
												)}
											/>
											{breed}
										</CommandItem>
									))}
								</ScrollArea>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{pendingFilters.breeds.length > 0 && (
				<div className='flex flex-wrap gap-2'>
					{pendingFilters.breeds.map((breed) => (
						<Badge key={breed} variant='secondary'>
							{breed}
							<button
								className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
								onClick={() => removeBreed(breed)}
							>
								<X className='h-3 w-3' />
								<span className='sr-only'>Remove {breed}</span>
							</button>
						</Badge>
					))}
				</div>
			)}
		</div>
	);
}
