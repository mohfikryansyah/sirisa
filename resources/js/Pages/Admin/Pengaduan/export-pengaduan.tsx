import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown, Download } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { statuses } from "./data";
import { Input } from "@/Components/ui/input";

interface ExportComplaint {
    status: string;
    startDate: Date;
    endDate: Date;
}

export default function ExportPengaduan() {
    const [open, setOpen] = useState(false);

    const form = useForm<ExportComplaint>({
        defaultValues: {
            status: "",
            startDate: undefined,
            endDate: undefined,
        },
    });

    function onSubmit(values: any) {
        const formatStartDate = values.startDate
            ? format(new Date(values.startDate), "yyyy-MM-dd")
            : "";
        const formatEndDate = values.endDate
            ? format(new Date(values.endDate), "yyyy-MM-dd")
            : "";

        const queryString = [
            `status=${values.status}`,
            `startDate=${formatStartDate}`,
            `endDate=${formatEndDate}`,
        ].join("&");

        router.get(route("complaint.export"), values, {
            preserveScroll: true,
        });

        window.location.href = route("complaint.export") + "?" + queryString;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-10 bg-sirisa-primary hover:-mt-0.5 transition-all duration-300 cursor-pointer">
                    <Download />
                    Export
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Export Laporan Kejadian</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        id="export-attendances"
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pilih Status</FormLabel>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-full justify-between"
                                            >
                                                {field.value
                                                    ? field.value
                                                    : "Semua Status"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="popover-content-width-same-as-its-trigger w-full p-0">
                                            <Command>
                                                <CommandInput placeholder="Cari user..." />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        User tidak ditemukan.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {statuses.map(
                                                            (status) => (
                                                                <CommandItem
                                                                    key={
                                                                        status.value
                                                                    }
                                                                    value={
                                                                        status.label
                                                                    }
                                                                    onSelect={(
                                                                        currentValue
                                                                    ) => {
                                                                        form.setValue(
                                                                            "status",
                                                                            currentValue
                                                                        );
                                                                        setOpen(
                                                                            !open
                                                                        );
                                                                    }}
                                                                >
                                                                    {
                                                                        status.label
                                                                    }
                                                                </CommandItem>
                                                            )
                                                        )}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid-cols-12 space-y-4 md:grid md:space-y-0">
                            <div className="col-span-5">
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Tanggal Mulai</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    {...field}
                                                    value={
                                                        field.value
                                                            ? format(
                                                                  field.value,
                                                                  "yyyy-MM-dd"
                                                              )
                                                            : ""
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="col-span-2 hidden w-full items-end md:grid">
                                <div className="flex items-center justify-center border bg-[#f9fafb] px-5 py-[13px] text-xs text-gray-400 shadow-xs">
                                    to
                                </div>
                            </div>
                            <div className="col-span-5">
                                <FormField
                                    control={form.control}
                                    name="endDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Tanggal Akhir</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    {...field}
                                                    value={
                                                        field.value
                                                            ? format(
                                                                  field.value,
                                                                  "yyyy-MM-dd"
                                                              )
                                                            : ""
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <DialogFooter className="mt-4 sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="submit" variant="default">
                                Export
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
