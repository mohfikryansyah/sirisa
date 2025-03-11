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
            className="md:overflow-hidden md:max-h-[100vh]"
            navbarClassName="bg-sirisa-primary mt-0 pt-0"
            textColor="text-gray-200"
            backgroundLogo="bg-white p-1.5 rounded-lg"
        >
            <Head title="Peta Kawasan Rawan Bencana" />

            <div className={cn(isMobile && "px-4")}>
                <h1 className="text-center md:text-4xl text-3xl mt-24 font-bold mb-4 text-sirisa-primary">
                    Peta Kawasan Rawan Bencana
                </h1>
                <PetaBencana geoLocations={geoLocations} />

                {!isMobile && (
                    <footer
                        className={cn(
                            "bg-slate-800 px-20 w-full py-4 md:flex items-center justify-between bottom-0 absolute"
                        )}
                    >
                        <div className="flex md:flex-row flex-col items-center">
                            <img
                                src="/kehutanan-logo.png"
                                className="w-6 h-auto mr-3"
                                alt="Flowbite Logo"
                            />
                            <p className="text-gray-200">
                                © 2025 BPKHTL XV Gorontalo
                            </p>
                        </div>
                        <p className="text-gray-200">Nur Septhya Razak | UNG</p>
                    </footer>
                )}
            </div>
        </Main>
    );
}
