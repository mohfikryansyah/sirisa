import { CheckCircle2, Circle, HelpCircle, XCircle } from "lucide-react";

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

export const statuses2 = [
    {
        value: "belum diproses",
        label: "Belum diproses",
        icon: HelpCircle,
        color: "text-orange-500 bg-orange-100 hover:bg-orange-200 ",
    },
    {
        value: "sedang diproses",
        label: "Sedang diproses",
        icon: Circle,
        color: "text-blue-500 bg-blue-100 hover:bg-blue-200 ",
    },
    {
        value: "selesai diproses",
        label: "Selesai",
        icon: CheckCircle2,
        color: "text-green-500 bg-green-100 hover:bg-green-200 ",
    },
    {
        value: "pengaduan ditolak",
        label: "Pengaduan ditolak",
        icon: XCircle,
        color: "text-red-500 bg-red-100 hover:bg-red-200 ",
    },
];