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
import { Input } from "@/shared/ui/input";
import { DogFilters } from "../domain";

const usStates = [
	"AL",
	"AK",
	"AZ",
	"AR",
	"CA",
	"CO",
	"CT",
	"DE",
	"FL",
	"GA",
	"HI",
	"ID",
	"IL",
	"IN",
	"IA",
	"KS",
	"KY",
	"LA",
	"ME",
	"MD",
	"MA",
	"MI",
	"MN",
	"MS",
	"MO",
	"MT",
	"NE",
	"NV",
	"NH",
	"NJ",
	"NM",
	"NY",
	"NC",
	"ND",
	"OH",
	"OK",
	"OR",
	"PA",
	"RI",
	"SC",
	"SD",
	"TN",
	"TX",
	"UT",
	"VT",
	"VA",
	"WA",
	"WV",
	"WI",
	"WY",
];

export function LocationFilter({
	pendingFilters,
	setPendingFilters,
	isOpen,
	removeState,
	setOpenStates,
}: {
	pendingFilters: DogFilters;
	setPendingFilters: (filters: DogFilters) => void;
	isOpen: boolean;
	removeState: (state: string) => void;
	setOpenStates: (state: boolean) => void;
}) {
	return (
		<>
			<div className='space-y-2'>
				<Label>State</Label>
				<Popover open={isOpen} onOpenChange={setOpenStates}>
					<PopoverTrigger asChild>
						<Button
							variant='outline'
							role='combobox'
							aria-expanded={isOpen}
							className='w-full justify-between'
						>
							Select states...
							<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-full p-0'>
						<Command>
							<CommandInput placeholder='Search states...' />
							<CommandList>
								<CommandEmpty>No state found.</CommandEmpty>
								<CommandGroup>
									<ScrollArea className='h-72'>
										{usStates.map((state) => (
											<CommandItem
												key={state}
												onSelect={() => {
													setPendingFilters({
														...pendingFilters,
														states: pendingFilters.states.includes(
															state
														)
															? pendingFilters.states.filter(
																	(s) =>
																		s !==
																		state
															  )
															: [
																	...pendingFilters.states,
																	state,
															  ],
													});
												}}
											>
												<Check
													className={cn(
														"mr-2 h-4 w-4",
														pendingFilters.states.includes(
															state
														)
															? "opacity-100"
															: "opacity-0"
													)}
												/>
												{state}
											</CommandItem>
										))}
									</ScrollArea>
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
				{pendingFilters.states.length > 0 && (
					<div className='flex flex-wrap gap-2'>
						{pendingFilters.states.map((state) => (
							<Badge key={state} variant='secondary'>
								{state}
								<button
									className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
									onClick={() => removeState(state)}
								>
									<X className='h-3 w-3' />
									<span className='sr-only'>
										Remove {state}
									</span>
								</button>
							</Badge>
						))}
					</div>
				)}
			</div>
			<div className='space-y-2'>
				<Label>City</Label>
				<Input
					type='text'
					placeholder='City name'
					min={0}
					value={pendingFilters.city || ""}
					onChange={(e) =>
						setPendingFilters({
							...pendingFilters,
							city: e.target.value ? e.target.value : "",
						})
					}
				/>
			</div>
		</>
	);
}
