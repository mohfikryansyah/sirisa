import { MutableRefObject, PropsWithChildren, useState } from "react";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker,
    Tooltip,
    useMapEvents,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, PathOptions, StyleFunction } from "leaflet";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
    height?: string;
    zoom?: number;
    center?: [number, number];
    mapRef?: MutableRefObject<L.Map | null>;
};

export const defaultMarkerIcon = new Icon({
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowAnchor: [10, 41],
    shadowSize: [41, 41],
});

export default function MapWithGeoJson({
    className = "",
    height = "500px",
    zoom = 10,
    center = [0.5753543789632711, 123.27836689275536],
    children,
    mapRef,
}: Props & PropsWithChildren) {
    const maxBounds: [[number, number], [number, number]] = [
        [0.3, 122.9], // Kiri Bawah (Latitude, Longitude)
        [0.9, 123.7], // Kanan Atas (Latitude, Longitude)
    ];

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            zoomControl={false}
            minZoom={10.5}
            className={cn("z-10", className)}
            style={{ height: "100%", width: "100%" }}
            maxBounds={maxBounds}
            maxBoundsViscosity={1.0}
            ref={mapRef}
            zoomSnap={0}
            zoomDelta={0.25}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {children}
        </MapContainer>
    );
}
