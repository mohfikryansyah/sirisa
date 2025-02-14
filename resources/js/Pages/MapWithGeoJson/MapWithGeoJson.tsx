import { PropsWithChildren, useState } from "react";
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

type Props = {
    className?: string;
    height?: string;
    zoom?: number;
    center?: [number, number];
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
}: Props & PropsWithChildren) {
    const maxBounds: [[number, number], [number, number]] = [
        [-0.5, 122.5], // Kiri Bawah (Latitude, Longitude)
        [2.5, 125.0],  // Kanan Atas (Latitude, Longitude)
    ];
    return (
        <div className={className} style={{ height }}>
            <MapContainer
                center={center}
                zoom={zoom}
                className="z-10"
                style={{ height: "100%", width: "100%" }}
                maxBounds={maxBounds} // Set maxBounds here
                maxBoundsViscosity={1.0}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {children}
            </MapContainer>
        </div>
    );
}
