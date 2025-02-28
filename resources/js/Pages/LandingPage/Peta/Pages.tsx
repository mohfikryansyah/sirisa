import Main from "@/Layouts/Main";
import GeoLocation from "@/Pages/Admin/GeoLocation/Index";
import PetaBencana from "@/Pages/Admin/GeoLocation/PetaBencana";
import { GeoLocation as GeoLocationType } from "@/types";
import { Head } from "@inertiajs/react";

type PageProps = {
    geoLocations: GeoLocationType[];
};

export default function PagesPetaKRB({ geoLocations }: PageProps) {
    return (
        <Main
            className="h-screen"
            navbarClassName="bg-sirisa-primary mt-0"
            textColor="text-gray-200"
        >
            <Head title="Peta Kawasan Rawan Bencana"/>
            <div className="pt-28 px-5">
                <h1 className="text-center text-4xl font-bold mb-4">
                    Peta Kawasan Rawan Bencana
                </h1>
                <p className="text-lg text-center">
                    Peta KRB merupakan peta yang menunjukkan lokasi KRB di
                    Indonesia.
                </p>
                <PetaBencana geoLocations={geoLocations} />
            </div>
            <footer className="bottom-0 bg-slate-800 px-20 w-full py-4 absolute flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        src="/kehutanan-logo.png"
                        className="w-6 h-auto mr-3"
                        alt="Flowbite Logo"
                    />
                    <p className="text-gray-200">
                        BPKHTL XV Gorontalo © 2021 Sistem Informasi Risiko
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
