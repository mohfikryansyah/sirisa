import { DataTable } from "@/Components/DateTable/data-table-main";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Complaint } from "@/types";
import { columns } from "./columns";
import { HelpCircle, Circle, CheckCircle2, XCircle } from "lucide-react";
import { Head } from "@inertiajs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/id";
dayjs.locale("id");
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

export const statuses = [
    {
        value: "belum diproses",
        label: "Belum diproses",
        icon: HelpCircle,
        color: "text-orange-500",
    },
    {
        value: "sedang diproses",
        label: "Sedang diproses",
        icon: Circle,
        color: "text-blue-500",
    },
    {
        value: "selesai diproses",
        label: "Selesai",
        icon: CheckCircle2,
        color: "text-green-500",
    },
    {
        value: "pengaduan ditolak",
        label: "Pengaduan ditolak",
        icon: XCircle,
        color: "text-red-500",
    },
];

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
            />
            {isDesktop ? (
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Detail Pengaduan</DialogTitle>
                        </DialogHeader>
                        {selectedComplaint ? (
                            <div className="space-y-4">
                                <p>
                                    <strong>Nama:</strong>{" "}
                                    {selectedComplaint.name}
                                </p>
                                <p>
                                    <strong>Pesan:</strong>{" "}
                                    {selectedComplaint.message}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    {selectedComplaint.statuses.status}
                                </p>
                                <p>
                                    <strong>Dibuat:</strong>{" "}
                                    {dayjs(
                                        selectedComplaint.created_at_formatted
                                    ).format("DD MMMM YYYY")}
                                </p>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </DialogContent>
                </Dialog>
            ) : (
                <Drawer open={openDialog} onOpenChange={setOpenDialog}>
                    <DrawerTrigger asChild>Open</DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Detail Pengaduan</DrawerTitle>
                            <DrawerDescription>
                                <Badge variant={"outline"} className={cn(statuses.find((status) => selectedComplaint?.statuses.status === status.label)?.color)}>
                                    {selectedComplaint?.statuses.status}
                                </Badge>
                            </DrawerDescription>
                        </DrawerHeader>
                        {selectedComplaint ? (
                            <div className="space-y-4 px-4">
                                <p>
                                    <strong>Nama:</strong>{" "}
                                    {selectedComplaint.name}
                                </p>
                                <p>
                                    <strong>Pesan:</strong>{" "}
                                    {selectedComplaint.message}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    {selectedComplaint.statuses.status}
                                </p>
                                <p>
                                    <strong>Dibuat:</strong>{" "}
                                    {dayjs(
                                        selectedComplaint.created_at_formatted
                                    ).format("DD MMMM YYYY")}
                                </p>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                        <DrawerFooter>
                            <DrawerClose>
                                <Button variant="outline" className="w-full">Tutup</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            )}
        </AuthenticatedLayout>
    );
}
