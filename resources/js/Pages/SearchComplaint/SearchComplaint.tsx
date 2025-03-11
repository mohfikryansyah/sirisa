import Main from "@/Layouts/Main";
import { Complaint } from "@/types";
import { GridPattern } from "../LandingPage/parts/Header";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { format } from "date-fns/format";
import { id } from "date-fns/locale";
import { Badge } from "@/Components/ui/badge";
import { statuses2 } from "../Admin/Pengaduan/data";
import { cn } from "@/lib/utils";

export default function SearchComplaint({
    complaints,
    query,
}: { complaints: Complaint[] } & { query: string }) {
    return (
        <Main>
            {/* <div className="w-full min-h-screen pb-20 bg-red-500 relative pt-32">
                <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] overflow-hidden">
                    <GridPattern />
                </div>
            </div> */}
            <div className="max-w-for-monitor mx-auto pt-32 pb-20">
                <h1 className="md:text-5xl text-2xl">Pencarian : {query}</h1>
                {complaints.length > 0 ? (
                    complaints.map((complaint) => (
                        <Card
                            className="w-full mt-10 bg-gray-100"
                            key={complaint.id}
                        >
                            <CardHeader>
                                <div className="flex justify-between">
                                    <CardTitle>{complaint.name}</CardTitle>
                                    <Badge
                                        className={cn(
                                            statuses2.find(
                                                (status) =>
                                                    status.label ===
                                                    complaint.statuses.status
                                            )?.color
                                        )}
                                    >
                                        {complaint.statuses.status}
                                    </Badge>
                                </div>
                                <div className="flex justify-between">
                                    <CardDescription>
                                        Melapor sejak :{" "}
                                        {format(
                                            complaint.created_at,
                                            "EEEE, d MMMM y",
                                            { locale: id }
                                        )}
                                    </CardDescription>
                                    <CardDescription>
                                        Pembaruan terakhir :{" "}
                                        {format(
                                            complaint.statuses.created_at,
                                            "EEEE, d MMMM y",
                                            { locale: id }
                                        )}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p>{complaint.message}</p>
                                {complaint.files?.length > 0 && (
                                    <div className="max-w-fit">
                                        <a
                                            href={
                                                "/storage/" +
                                                complaint.files[0].file_path
                                            }
                                            target="_blank"
                                        >
                                            <img
                                                src={
                                                    "/storage/" +
                                                    complaint.files[0].file_path
                                                }
                                                className="mt-4 max-w-xs h-auto"
                                                alt="Bukti Kejadian"
                                            />
                                        </a>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <a
                                    href={`https://maps.google.com/maps?q=${complaint.latitude},${complaint.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-400 hover:underline"
                                >
                                    Lokasi Kejadian{" "}
                                </a>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <div className="max-w-fit mt-10 rounded-lg shadow-lg bg-gray-100 p-3">
                        Tidak ada data yang ditemukan.
                    </div>
                )}
            </div>
        </Main>
    );
}
