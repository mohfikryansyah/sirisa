import Main from "@/Layouts/Main";
import { Complaint } from "@/types";
import { GridPattern } from "../LandingPage/parts/Header";

export default function SearchComplaint({
    complaints,
    query,
}: { complaints: Complaint[] } & { query: string }) {
    return (
        <Main>
            <div className="w-full h-screen overflow-hidden relative pt-32">
                <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] overflow-hidden">
                    <GridPattern />
                </div>
                <div className="max-w-for-monitor w-full h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pt-32">
                    <div className="xl:block hidden">
                        <h1 className="text-5xl">Pencarian : {query}</h1>
                        {complaints.length > 0 ? (
                            complaints.map((complaint) => (
                                <div
                                    className="max-w-fit mt-10 rounded-lg shadow-lg bg-gray-100 p-3"
                                    key={complaint.id}
                                >
                                    <h1>{complaint.name}</h1>
                                    <p>{complaint.message}</p>
                                </div>
                            ))
                        ) : (
                            <div className="max-w-fit mt-10 rounded-lg shadow-lg bg-gray-100 p-3">
                                Tidak ada data yang ditemukan.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Main>
    );
}
