import { useIsMobile } from "@/hooks/use-mobile";
import Main from "@/Layouts/Main";
import { cn } from "@/lib/utils";
import GeoLocation from "@/Pages/Admin/GeoLocation/Index";
import PetaBencana from "@/Pages/Admin/GeoLocation/PetaBencana";
import { GeoLocation as GeoLocationType } from "@/types";
import { Head } from "@inertiajs/react";

type PageProps = {
    geoLocations: GeoLocationType[];
};

export default function PagesPetaKRB({ geoLocations }: PageProps) {
    const isMobile = useIsMobile();

    return (
        <Main
            className="h-screen md:overflow-hidden"
            navbarClassName="bg-sirisa-primary mt-0 relative"
            textColor="text-gray-200"
            backgroundLogo="bg-white p-1.5 rounded-lg"
        >
            <Head title="Peta Kawasan Rawan Bencana" />
            <div className="h-screen overflow-hidden relative bg-gray-50 w-full">
                    <h1 className="text-center text-4xl font-bold mb-1 text-sirisa-primary py-5">
                        Peta Kawasan Rawan Bencana
                    </h1>
                    <div className="px-5">
                        <PetaBencana geoLocations={geoLocations} />
                    </div>
            </div>

            <footer
                className={cn(
                    "bg-slate-800 px-20 w-full py-4 md:flex items-center justify-between",
                    isMobile ? "" : "bottom-0 absolute"
                )}
            >
                <div className="flex md:flex-row flex-col items-center">
                    <img
                        src="/kehutanan-logo.png"
                        className="w-6 h-auto mr-3"
                        alt="Flowbite Logo"
                    />
                    <p className="text-gray-200">
                        BPKHTL XV Gorontalo © 2025 Sistem Informasi Risiko
                        Sumber Daya Alam
                    </p>
                </div>
                <p className="text-gray-200">
                    Nur Septhya Razak | Universitas Negeri Gorontalo
                </p>
            </footer>
        </Main>
    );
}
