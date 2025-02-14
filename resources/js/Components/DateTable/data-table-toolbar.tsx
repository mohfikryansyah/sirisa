"use client";

import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Trash2, TriangleAlert, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { FormEventHandler, useState } from "react";
import { Complaint, Status } from "@/types";
import { router } from "@inertiajs/react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/Components/ui/dialog";
import toast from "react-hot-toast";

interface TableToolbarProps<TData> {
    table: Table<TData>;
    globalFilter: string;
    setGlobalFilter: (value: string) => void;
    filter?: Status[];
}

export function TableToolbar<TData>({
    table,
    globalFilter,
    setGlobalFilter,
    filter,
}: TableToolbarProps<TData>) {
    const isFilteredTitle = table.getState().columnFilters.length > 0;
    const isFilteredGlobal = globalFilter && globalFilter.length > 0;
    const status =
        filter?.map((filter) => ({
            value: filter.label,
            label: filter.label,
            icon: filter.icon,
            color: filter.color,
        })) || [];

    const [resetFilter, setResetFilter] = useState(false);

    const handleResetFilters = () => {
        setGlobalFilter("");
        table.resetColumnFilters();
        setResetFilter(true);
    };

    const handleResetComplete = () => {
        setResetFilter(false);
    };

    const selectedRows = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => (row.original as Complaint).id);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDeleteSelectedRows: FormEventHandler = (e) => {
        e.preventDefault();
        if (table.getFilteredSelectedRowModel().rows.length === 0) {
            alert("Pilih setidaknya satu baris untuk dihapus.");
            return;
        }

        router.delete(
            route("complaint.deleteSelectedRows", { ids: selectedRows }),
            {
                onSuccess: () => {
                    table.resetRowSelection();
                    toast.success("Baris berhasil dihapus!");
                    setIsDialogOpen(false);
                },
                onError: () => {
                    toast.error("Terjadi kesalahan saat menghapus baris.");
                },
            }
        );
    };

    return (
        <div className="flex items-center py-4">
            <div className="flex items-center space-x-2 w-full">
                {/* <Input
                    placeholder="Cari nama..."
                    value={globalFilter}
                    onChange={(e) =>
                        table.setGlobalFilter(String(e.target.value))
                    }
                    className="max-w-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                /> */}

                <Input
                    placeholder="Filter emails..."
                    value={table.getColumn("Nama")?.getFilterValue() as string}
                    onChange={(e) => {
                        table
                            .getColumn("Nama")
                            ?.setFilterValue(e.target.value);
                    }}
                    className="max-w-sm"
                />

                {table.getColumn("Status") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("Status")}
                        title="Status"
                        options={status}
                        resetFilter={resetFilter}
                        onResetComplete={handleResetComplete}
                    />
                )}

                {(isFilteredTitle || isFilteredGlobal) && (
                    <Button
                        variant="ghost"
                        onClick={handleResetFilters}
                        className="h-9 px-2 lg:px-3"
                    >
                        Reset
                        <X />
                    </Button>
                )}
            </div>

            <div className="flex">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            className="ml-2"
                            disabled={
                                table.getFilteredSelectedRowModel().rows
                                    .length <= 1
                            }
                        >
                            <Trash2 className="h-4 w-4 text-red-500" />
                            Delete All
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <div className="flex flex-col items-center justify-center">
                            <div className="rounded-full h-14 w-14 bg-red-200 flex items-center justify-center">
                                <TriangleAlert className="h-8 w-8 text-red-500" />
                            </div>
                            <h1 className="font-bold text-lg mt-4">
                                Hapus Pengaduan
                            </h1>
                            <p className="text-gray-400 mt-2">
                                Apakah Anda yakin ingin menghapus ini?
                            </p>
                            <div className="grid grid-cols-2 mt-4 gap-x-2 w-full">
                                <DialogClose asChild>
                                    <Button variant={"outline"}>Batal</Button>
                                </DialogClose>
                                <Button
                                    variant={"default"}
                                    className="bg-red-500 hover:bg-red-600 active:scale-90 transition-all duration-300"
                                    onClick={handleDeleteSelectedRows}
                                    disabled={
                                        table.getFilteredSelectedRowModel().rows
                                            .length === 0
                                    }
                                >
                                    Ya, saya yakin!
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
