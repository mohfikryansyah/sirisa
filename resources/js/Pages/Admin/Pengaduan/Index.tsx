import { DataTable } from "@/Components/DateTable/data-table-main";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Complaint } from "@/types";
import { columns } from "./columns";
import { HelpCircle, Circle, CheckCircle2, XCircle } from "lucide-react";
import { Head } from "@inertiajs/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/Components/ui/dialog";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/Components/ui/drawer";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { cn } from "@/lib/utils";
import { ComplaintForm } from "@/Pages/LandingPage/Form/ComplaintForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { statuses, statuses2 } from "./data";

export default function Index({ complaints }: { complaints: Complaint[] }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedComplaint, setSelectedComplaint] =
        useState<Complaint | null>(null);

    const handleOpenDialog = (complaint: Complaint) => {
        setSelectedComplaint(complaint);
        setOpenDialog(true);
    };

    const isDesktop = useMediaQuery("(min-width: 768px)");

    const handleCloseDialog = () => {
        setSelectedComplaint(null);
        setOpenDialog(false);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Data Pengaduan" />
            <DataTable
                columns={columns(handleOpenDialog)}
                data={complaints}
                filter={statuses}
                searchColumn="Nama"
            >
                <Button variant={"default"}>Export</Button>
            </DataTable>
            {isDesktop ? (
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-center">
                                Detail Pengaduan
                            </DialogTitle>
                        </DialogHeader>
                        <Card className="border-0 p-0 shadow-none">
                            <CardContent className="p-0">
                                {selectedComplaint ? (
                                    <>
                                        <div className="flex justify-center">
                                            <Badge
                                                className={cn(
                                                    statuses2.find(
                                                        (status) =>
                                                            status.label ===
                                                            selectedComplaint
                                                                .statuses.status
                                                    )?.color
                                                )}
                                            >
                                                {
                                                    selectedComplaint.statuses
                                                        .status
                                                }
                                            </Badge>
                                        </div>
                                        <p className="font-bold">
                                            Data pelapor
                                        </p>
                                        <div className="space-y-1 mt-2">
                                            <p>
                                                Nama : {selectedComplaint.name}
                                            </p>
                                            <p>
                                                Nomor Tlp :{" "}
                                                {selectedComplaint.telp}
                                            </p>
                                        </div>
                                        <p className="font-bold mt-4">
                                            Laporan Kejadian
                                        </p>
                                        <div className="space-y-1 mt-2">
                                            <p>{selectedComplaint.message}</p>
                                        </div>
                                        <p className="font-bold mt-4">
                                            Lokasi Kejadian
                                        </p>
                                        <div className="space-y-1 mt-2">
                                            <p>
                                                {selectedComplaint.latitude},{" "}
                                                {selectedComplaint.longitude}
                                            </p>
                                            <a
                                                href={`https://maps.google.com/maps?q=${selectedComplaint.latitude},${selectedComplaint.longitude}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-blue-400 hover:underline"
                                            >
                                                Lihat di Google Maps{" "}
                                            </a>
                                        </div>
                                        <p className="font-bold mt-4">Bukti</p>
                                        {selectedComplaint.files?.length >
                                            0 && (
                                            <div className="h-[200px] overflow-hidden">
                                                <a
                                                    href={
                                                        "/storage/" +
                                                        selectedComplaint
                                                            .files[0].file_path
                                                    }
                                                    target="__blank"
                                                >
                                                    <img
                                                        src={
                                                            "/storage/" +
                                                            selectedComplaint
                                                                .files[0]
                                                                .file_path
                                                        }
                                                        alt="Lampiran pengaduan"
                                                    />
                                                </a>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <p>loading...</p>
                                )}
                            </CardContent>
                        </Card>
                    </DialogContent>
                </Dialog>
            ) : (
                <Drawer open={openDialog} onOpenChange={setOpenDialog}>
                    <DrawerTrigger asChild>Open</DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Detail Pengaduan</DrawerTitle>
                            <DrawerDescription>
                                <Badge
                                    variant={"outline"}
                                    className={cn(
                                        statuses2.find(
                                            (status) =>
                                                selectedComplaint?.statuses
                                                    .status === status.label
                                        )?.color
                                    )}
                                >
                                    {selectedComplaint?.statuses.status}
                                </Badge>
                            </DrawerDescription>
                        </DrawerHeader>
                        {selectedComplaint ? (
                                    <div className="px-4">
                                        <p className="font-bold">
                                            Data pelapor
                                        </p>
                                        <div className="space-y-1 mt-2">
                                            <p>
                                                Nama : {selectedComplaint.name}
                                            </p>
                                            <p>
                                                Nomor Tlp :{" "}
                                                {selectedComplaint.telp}
                                            </p>
                                        </div>
                                        <p className="font-bold mt-4">
                                            Laporan Kejadian
                                        </p>
                                        <div className="space-y-1 mt-2">
                                            <p>{selectedComplaint.message}</p>
                                        </div>
                                        <p className="font-bold mt-4">
                                            Lokasi Kejadian
                                        </p>
                                        <div className="space-y-1 mt-2">
                                            <p>
                                                {selectedComplaint.latitude},{" "}
                                                {selectedComplaint.longitude}
                                            </p>
                                            <a
                                                href={`https://maps.google.com/maps?q=${selectedComplaint.latitude},${selectedComplaint.longitude}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-blue-400 hover:underline"
                                            >
                                                Lihat di Google Maps{" "}
                                            </a>
                                        </div>
                                        <p className="font-bold mt-4">Bukti</p>
                                        {selectedComplaint.files?.length >
                                            0 && (
                                            <div className="h-[200px] overflow-hidden">
                                                <a
                                                    href={
                                                        "/storage/" +
                                                        selectedComplaint
                                                            .files[0].file_path
                                                    }
                                                    target="__blank"
                                                >
                                                    <img
                                                        src={
                                                            "/storage/" +
                                                            selectedComplaint
                                                                .files[0]
                                                                .file_path
                                                        }
                                                        alt="Lampiran pengaduan"
                                                    />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p>loading...</p>
                                )}
                        <DrawerFooter>
                            <DrawerClose>
                                <Button variant="outline" className="w-full">
                                    Tutup
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            )}
        </AuthenticatedLayout>
    );
}
