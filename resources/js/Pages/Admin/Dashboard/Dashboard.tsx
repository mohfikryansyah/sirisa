import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { hasRole } from "@/helpers";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { BreadcrumbItem, Complaint, GeoLocation } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import ComplaintChart from "./ComplaintChart";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "#",
    },
];

interface Props {
    complaints: Complaint[];
    geoLocations: GeoLocation[];
}

export default function Dashboard({ complaints, geoLocations }: Props) {
    const auth = usePage().props.auth;

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="space-y-4">
                <div className="grid md:grid-cols-5 grid-cols-1 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Laporan Kejadian</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-3xl">{complaints.length}</h1>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Laporan Belum diproses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-3xl">
                                {
                                    complaints.filter(
                                        (complaint) =>
                                            complaint.statuses.status ===
                                            "Belum diproses"
                                    ).length
                                }
                            </h1>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Laporan Sedang diproses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-3xl">
                                {
                                    complaints.filter(
                                        (complaint) =>
                                            complaint.statuses.status ===
                                            "Sedang diproses"
                                    ).length
                                }
                            </h1>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Total Laporan Selesai diproses
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-3xl">
                                {
                                    complaints.filter(
                                        (complaint) =>
                                            complaint.statuses.status ===
                                            "Selesai"
                                    ).length
                                }
                            </h1>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Peta KRB</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-3xl">{geoLocations.length}</h1>
                        </CardContent>
                    </Card>
                </div>
            <ComplaintChart complaints={complaints} />
            </div>
        </AuthenticatedLayout>
    );
}
