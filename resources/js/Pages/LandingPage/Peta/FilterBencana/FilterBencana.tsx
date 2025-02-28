"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { Badge } from "@/Components/ui/badge";
import { useMediaQuery } from "@/hooks/use-media-query";

type Props = {
    disasterStates: {
        showGelombang: boolean;
        showGempa: boolean;
        showBanjir: boolean;
        showTanahLongsor: boolean;
    };
    toggleDisasterState: (key: keyof Props["disasterStates"]) => void;
};

const disasterLabels: Record<keyof Props["disasterStates"], string> = {
    showGelombang: "Gelombang Tinggi",
    showGempa: "Gempa Bumi",
    showBanjir: "Banjir",
    showTanahLongsor: "Tanah Longsor",
};

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
];

export default function FilterBencana({
    disasterStates,
    toggleDisasterState,
}: Props) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const selectedDisasters = Object.entries(disasterStates).filter(
        ([_, value]) => value
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("justify-between h-10", isDesktop ? "w-auto" : "w-full")}
                >
                    Pilih Peta KRB
                    {selectedDisasters.length > 0 && (
                        <>
                            <Separator
                                orientation="vertical"
                                className="mx-2 h-4"
                            />
                            {!isDesktop ? (
                                <>
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {
                                            disasterLabels[
                                                selectedDisasters[0][0] as keyof typeof disasterStates
                                            ]
                                        }
                                    </Badge>
                                    {selectedDisasters.length > 1 && (
                                        <Badge
                                            variant="secondary"
                                            className="rounded-sm px-1 font-normal"
                                        >
                                            +{selectedDisasters.length - 1}
                                        </Badge>
                                    )}
                                </>
                            ) : (
                                selectedDisasters.map(([key]) => (
                                    <Badge
                                        key={key}
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {
                                            disasterLabels[
                                                key as keyof typeof disasterStates
                                            ]
                                        }
                                    </Badge>
                                ))
                            )}
                        </>
                    )}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className={cn("w-[200px] p-0 mt-[0.1px]", isDesktop ? "w-[200px]" : "popover-content-width-same-as-its-trigger")}
                side={isDesktop ? "right" : "bottom"}
                align="start"
            >
                <Command>
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {Object.entries(disasterStates).map(
                                ([key, value]) => (
                                    <CommandItem
                                        key={key}
                                        onSelect={() => {
                                            toggleDisasterState(
                                                key as keyof typeof disasterStates
                                            );
                                            setOpen(true);
                                        }}
                                    >
                                        <Checkbox checked={value} id={key} />
                                        <p>
                                            {
                                                disasterLabels[
                                                    key as keyof typeof disasterStates
                                                ]
                                            }
                                        </p>
                                    </CommandItem>
                                )
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
