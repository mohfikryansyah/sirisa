import { DataTable } from "@/Components/DateTable/data-table-main";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { GeoLocation as GeoLocationType } from "@/types";
import FormUploadPeta from "./FormUploadPeta";
import { columns } from "./columns";
import PetaBencana from "./PetaBencana";


export default function GeoLocation({
    geoLocations,
}: {
    geoLocations: GeoLocationType[];
}) {
    

    return (
        <AuthenticatedLayout>
            <Head title="Geo Location" />

            <FormUploadPeta />

            <PetaBencana geoLocations={geoLocations} />

            <DataTable columns={columns} data={geoLocations} />
        </AuthenticatedLayout>
    );
}
