"use client";

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";
import MapWithGeoJson, {
    defaultMarkerIcon,
} from "@/Pages/MapWithGeoJson/MapWithGeoJson";
import banjirJson from "@/data/banjir.json";
import tanahLongsorJson from "@/data/tanahlongsor.json";
import gempaJson from "@/data/gempa.json";
import gelombangJson from "@/data/GEA.json";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Marker, Popup, GeoJSON, useMapEvents } from "react-leaflet";
import { Input } from "@/Components/ui/input";
import toast from "react-hot-toast";
import FilterBencana from "./FilterBencana/FilterBencana";
import { useMediaQuery } from "@/hooks/use-media-query";
import { X } from "lucide-react";

const getColorCategory = (type: string, value: string) => {
    const colors: Record<string, Record<string, string>> = {
        Bhy_Bjr: { Tinggi: "#FF0000", Sedang: "#FFA500", Rendah: "#FFC0CB" },
        Bhy_Lsr: { Tinggi: "#8B4513", Sedang: "#FFD700", Rendah: "#F5F5DC" },
        Bhy_GmpBm: { Tinggi: "#800080", Sedang: "#4169E1", Rendah: "#87CEEB" },
        Bhy_GEA: { Tinggi: "#006400", Sedang: "#32CD32", Rendah: "#98FB98" },
    };

    return colors[type]?.[value] || "blue";
};

const style = (feature: any) => {
    let type = "";
    let value = "";

    if (feature.properties.Bhy_Bjr) {
        type = "Bhy_Bjr";
        value = feature.properties.Bhy_Bjr;
    } else if (feature.properties.Bhy_Lsr) {
        type = "Bhy_Lsr";
        value = feature.properties.Bhy_Lsr;
    } else if (feature.properties.Bhy_GmpBm) {
        type = "Bhy_GmpBm";
        value = feature.properties.Bhy_GmpBm;
    } else if (feature.properties.Bhy_GEA) {
        type = "Bhy_GEA";
        value = feature.properties.Bhy_GEA;
    }

    return {
        fillColor: getColorCategory(type, value),
        weight: 2,
        opacity: 1,
        color: "black",
        fillOpacity: 0.4,
    };
};

const getBadgeColor = (value: string) => {
    switch (value) {
        case "Tinggi":
            return "bg-red-500 text-white";
        case "Sedang":
            return "bg-yellow-500 text-black";
        case "Rendah":
            return "bg-gray-500 text-white";
        default:
            return "bg-blue-500 text-white";
    }
};
const dataBanjir: any = banjirJson;
const dataTanahLongsor: any = tanahLongsorJson;
const dataGempa: any = gempaJson;
const dataGelombang: any = gelombangJson;

export default function BencanaMap() {
    const [disasterStates, setDisasterStates] = useState({
        showGelombang: true,
        showGempa: true,
        showBanjir: true,
        showTanahLongsor: true,
    });

    const toggleDisasterState = (key: keyof typeof disasterStates) => {
        setDisasterStates((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const [selectedFeature, setSelectedFeature] = useState<{
        position: [number, number];
        type: "banjir" | "tanahLongsor" | "gempa" | "gelombang";
        category: string;
        sumber: string;
    } | null>(null);

    const [userUploadMap, setUserUploadMap] = useState<any>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== "application/json" && !file.name.endsWith(".json")) {
            toast.error("Hanya file JSON yang diperbolehkan!");
            e.target.value = "";
            return;
        }

        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            toast.error("Pilih file JSON terlebih dahulu!");
            return;
        }

        if (userUploadMap) {
            setUserUploadMap(null);
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                setUserUploadMap(json);
                toast.success("File berhasil diunggah!");
            } catch (error) {
                toast.error("File bukan JSON yang valid!");
            }
        };

        reader.readAsText(selectedFile);
    };

    const handleResetUploadUser = () => {
        setSelectedFile(null);
        setUserUploadMap(null);
        const fileInput = document.getElementById("file_peta") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    function onEachFeature(
        type: "banjir" | "tanahLongsor" | "gempa" | "gelombang"
    ) {
        return (feature: any, layer: any) => {
            if (feature.properties && feature.geometry) {
                layer.on("click", (e: any) => {
                    setSelectedFeature({
                        position: [
                            parseFloat(e.latlng.lat.toFixed(5)),
                            parseFloat(e.latlng.lng.toFixed(5)),
                        ],
                        type,
                        category:
                            feature.properties.Bhy_Bjr ||
                            feature.properties.Bhy_Lsr ||
                            feature.properties.Bhy_GmpBm ||
                            feature.properties.Bhy_GEA,
                        sumber: feature.properties.SMBR_DATA,
                    });
                });
            }
        };
    }

    const MapClickHandler = () => {
        useMapEvents({
            popupclose: () => {
                setSelectedFeature(null);
            },
        });

        return null;
    };

    const openPopup = (e: L.LeafletEvent) => {
        e.target.openPopup();
    };

    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <section id="map" className="w-full px-4 pt-32">
            <div className="max-w-for-monitor mx-auto">
                <h1 className="mb-10 text-center text-2xl font-extrabold lg:text-4xl text-sirisa-primary">
                    Peta Kawasan Rawan Bencana
                </h1>
                <div className={cn(!isDesktop && "mb-3")}>
                    <Label htmlFor="file_peta" className="ml-0.5 mb-2 block">
                        Peta Anda{" "}
                        <span className="text-gray-400 ml-1 text-xs">
                            (ekstensi .json | Contoh: lahanbaru.json)
                        </span>
                    </Label>
                    <div className="w-full md:flex items-center justify-between md:space-x-2 md:space-y-0 space-y-3">
                        <div className="max-w-sm flex items-center space-x-2">
                            <Input
                                type="file"
                                accept=".json"
                                onChange={handleFileChange}
                                id="file_peta"
                                className="h-10"
                            />
                            <Button
                                type="submit"
                                className="h-10"
                                onClick={handleUpload}
                            >
                                Submit
                            </Button>
                            {userUploadMap  && (
                                <Button
                                    variant="ghost"
                                    onClick={handleResetUploadUser}
                                    className="h-9 px-2 lg:px-3"
                                >
                                    Reset
                                    <X />
                                </Button>
                            )}
                        </div>
                        <FilterBencana
                            disasterStates={disasterStates}
                            toggleDisasterState={toggleDisasterState}
                        />
                    </div>
                </div>
                <MapWithGeoJson
                    className="overflow-hidden rounded-xl mt-5"
                    height="600px"
                    zoom={12}
                >
                    <MapClickHandler />
                    {userUploadMap && (
                        <GeoJSON data={userUploadMap} style={style} />
                    )}
                    {disasterStates.showBanjir && (
                        <GeoJSON
                            data={dataBanjir}
                            style={style}
                            onEachFeature={onEachFeature("banjir")}
                        />
                    )}
                    {disasterStates.showTanahLongsor && (
                        <GeoJSON
                            data={dataTanahLongsor}
                            style={style}
                            onEachFeature={onEachFeature("tanahLongsor")}
                        />
                    )}
                    {disasterStates.showGempa && (
                        <GeoJSON
                            data={dataGempa}
                            style={style}
                            onEachFeature={onEachFeature("gempa")}
                        />
                    )}
                    {disasterStates.showGelombang && (
                        <GeoJSON
                            data={dataGelombang}
                            style={style}
                            onEachFeature={onEachFeature("gelombang")}
                        />
                    )}
                    {selectedFeature && (
                        <Marker
                            position={selectedFeature.position}
                            icon={defaultMarkerIcon}
                            eventHandlers={{ add: openPopup }}
                        >
                            <Popup
                                closeButton={false}
                                autoClose={false}
                                closeOnClick={false}
                            >
                                <h1 className="text-lg font-bold">
                                    Informasi Risiko -{" "}
                                    {selectedFeature.type === "banjir"
                                        ? "Banjir"
                                        : selectedFeature.type ===
                                          "tanahLongsor"
                                        ? "Tanah Longsor"
                                        : selectedFeature.type === "gempa"
                                        ? "Gempa"
                                        : "Gelombang Ekstrim Abrasi"}
                                </h1>
                                <div className="space-y-2">
                                    <Badge
                                        variant={"outline"}
                                        className={cn(
                                            getBadgeColor(
                                                selectedFeature.category
                                            )
                                        )}
                                    >
                                        {selectedFeature.category}
                                    </Badge>
                                    <div className="h-auto mb-2">
                                        {selectedFeature.type === "banjir" ? (
                                            <>
                                                <p>
                                                    Risiko: Genangan air merusak
                                                    properti, mengganggu
                                                    transportasi, dan
                                                    menyebarkan penyakit.
                                                </p>
                                                <p>
                                                    Penyebab: Hujan lebat,
                                                    drainase buruk, dan aliran
                                                    sungai meluap.
                                                </p>
                                            </>
                                        ) : null}
                                    </div>
                                    <p>Sumber: {selectedFeature.sumber}</p>
                                    <p>
                                        Lokasi: {selectedFeature.position[0]},{" "}
                                        {selectedFeature.position[1]}
                                    </p>
                                    <a
                                        href={`https://maps.google.com/maps?q=${selectedFeature.position[0]},${selectedFeature.position[1]}`}
                                        target="_blank"
                                        className="text-blue-500 underline block"
                                    >
                                        Lihat di Google Maps
                                    </a>
                                </div>
                            </Popup>
                        </Marker>
                    )}
                </MapWithGeoJson>
            </div>
        </section>
    );
}
