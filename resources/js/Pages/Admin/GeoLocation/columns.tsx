import { Button } from "@/Components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import { GeoLocation } from "@/types";
import { router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const columns: ColumnDef<GeoLocation>[] = [
    {
        accessorKey: "id",
        header: "No.",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "title",
        id: "Judul Peta",
        header: "Judul Peta",
    },
    // {
    //     accessorKey: "path",
    //     header: "Path",
    // },
    {
        accessorKey: "created_at",
        header: "Dibuat",
    },
    {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => {
            const [disableButton, setDisableButton] = useState<boolean>(false);
            const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

            const handleDeleteRow = (geoLocation: GeoLocation) => {
                setDisableButton(true);
                console.log(geoLocation);
                router.delete(route("geo-location.destroy", { geo_location: geoLocation }), {
                    onSuccess: () => {
                        toast.success("Baris berhasil dihapus!");
                        setDisableButton(false);
                        setIsOpenDialog(false);
                    },
                    onError: () => {
                        toast.error("Terjadi kesalahan saat menghapus baris.");
                        setDisableButton(false);
                        setIsOpenDialog(false);
                    },
                });
            };

            return (
                <>
                    <div className="flex items-center">

                        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4 text-red-500" />
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
                                            <Button variant={"outline"}>
                                                Batal
                                            </Button>
                                        </DialogClose>
                                        <Button
                                            variant={"default"}
                                            className="bg-red-500 hover:bg-red-600 active:scale-90 transition-all duration-300"
                                            disabled={disableButton}
                                            onClick={() =>
                                                handleDeleteRow(row.original)
                                            }
                                            aria-label="Delete row"
                                        >
                                            Ya, saya yakin!
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </>
            );
        },
    },
];