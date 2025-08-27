import Main from "@/Layouts/Main";
import { BreadcrumbItem, Complaint } from "@/types";
import { Head } from "@inertiajs/react";
import { GridPattern } from "../parts/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
];

export default function PagesRiwayatLaporan({
    complaints,
}: {
    complaints: Complaint[];
}) {
    return (
        <Main>
            <Head title="Riwayat Laporan" />
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] overflow-hidden">
                <GridPattern />
            </div>
            <div className="w-full relative mb-6">
                <div className="max-w-7xl mx-auto pt-40 h-full z-[10]">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-gray-800">
                            Riwayat Laporan
                        </h1>
                        <p className="text-gray-600">
                            Berikut adalah riwayat laporan pengaduan yang telah
                            masuk ke sistem kami. Anda dapat melihat status dan
                            detail setiap laporan yang telah diajukan.
                        </p>
                    </div>
                    <div className="space-y-6 mt-10 ">
                        {complaints.length === 0 ? (
                            <Card className="bg-white/50 backdrop-blur-sm border border-gray-200 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold text-gray-800">
                                        Tidak ada laporan ditemukan
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Saat ini belum ada laporan pengaduan
                                        yang masuk. Silakan ajukan laporan
                                        pertama Anda.
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            complaints.map((complaint) => (
                                <Card
                                    key={complaint.id}
                                    className="bg-white/50 backdrop-blur-sm border border-gray-200 shadow-sm"
                                >
                                    {/* <CardHeader>
                                        <CardTitle>Pelapor : {complaint.name}</CardTitle>
                                    </CardHeader> */}
                                    <CardContent className="py-4">
                                        <p className="text-gray-600 mb-5">
                                            {complaint.message}
                                        </p>
                                        <p className="text-sm text-gray-800 font-medium">
                                            {complaint.name}
                                        </p>
                                        <p className="text-sm text-gray-800 font-medium">
                                            {format(
                                                complaint.created_at,
                                                "EEEE, d MMMM y",
                                                { locale: id }
                                            )}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Main>
    );
}
