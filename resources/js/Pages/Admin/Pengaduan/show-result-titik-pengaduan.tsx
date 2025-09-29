import { BreadcrumbItem, GeoLocation } from "@/types";
import { Head } from "@inertiajs/react";
import PetaBencana from "../GeoLocation/PetaBencana";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
];

export default function ShowResult({
    geoLocations,
    searchQuery,
}: {
    geoLocations: GeoLocation[];
    searchQuery: string;
}) {
    return (
        <AuthenticatedLayout>
            <Head title="Geo Location" />

            <div className="max-h-[800px] mt-2">
                <PetaBencana
                    geoLocations={geoLocations}
                    searchQuery={searchQuery}
                />
            </div>
        </AuthenticatedLayout>
    );
}
