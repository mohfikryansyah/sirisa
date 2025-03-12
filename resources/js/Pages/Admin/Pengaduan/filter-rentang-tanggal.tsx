import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Filter } from "lucide-react";
import { useRef, useState } from "react";

interface Props {
    setTanggalAwal: (tanggalAwal: Date | null) => void;
    setTanggalAkhir: (tanggalAkhir: Date | null) => void;
}

export default function FilterRentangTanggal({
    setTanggalAwal,
    setTanggalAkhir,
}: Props) {
    const [tanggalAwal, setLocalTanggalAwal] = useState<Date | null>(null);
    const [tanggalAkhir, setLocalTanggalAkhir] = useState<Date | null>(null);

    const refStartDate = useRef<HTMLInputElement>(null);
    const refEndDate = useRef<HTMLInputElement>(null);

    console.log(tanggalAwal);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="md:w-fit w-full">
                        <Filter />
                        {tanggalAwal ? (
                            tanggalAkhir ? (
                                `${format(
                                    tanggalAwal,
                                    "yyyy-MM-dd"
                                )} - ${format(tanggalAkhir, "yyyy-MM-dd")}`
                            ) : (
                                format(tanggalAwal, "yyyy-MM-dd")
                            )
                        ) : (
                            <span>Filter tanggal</span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-fit">
                    <DropdownMenuLabel>Rentang Tanggal</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="space-y-2">
                        <Input
                            ref={refStartDate}
                            type="date"
                            onChange={() => {
                                const date = refStartDate.current
                                    ? new Date(refStartDate.current.value)
                                    : null;
                                setLocalTanggalAwal(date);
                                setTanggalAwal(date);
                            }}
                        />
                        <Input
                            ref={refEndDate}
                            type="date"
                            onChange={() => {
                                const date = refEndDate.current ? new Date(refEndDate.current.value) : null;
                                setLocalTanggalAkhir(date);
                                setTanggalAkhir(date)
                            }}
                        />
                    </div>
                    <DropdownMenuSeparator className="mt-3" />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setTanggalAkhir(null);
                                    setLocalTanggalAkhir(null);
                                    setTanggalAwal(null);
                                    setLocalTanggalAwal(null);
                                    if (refStartDate.current) refStartDate.current.value = "";
                                    if (refEndDate.current) refEndDate.current.value = "";
                                    
                                }}
                                className={cn(
                                    "col-span-5 mt-0.5 w-full pl-3 text-left font-normal md:rounded-tr-none md:rounded-br-none"
                                )}
                            >
                                Clear Filters
                            </Button>
                        </PopoverTrigger>
                    </Popover>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
