"use client";

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import MapWithGeoJson, { defaultMarkerIcon } from "@/Pages/MapWithGeoJson/MapWithGeoJson";
import banjirJson from "@/data/banjir.json";
import tanahLongsorJson from "@/data/tanahlongsor.json";
import gempaJson from "@/data/gempa.json";
import gelombangJson from "@/data/GEA.json";
import { cn } from "@/lib/utils";
import { useState, useCallback, useMemo } from "react";
import { Marker, Popup, GeoJSON, useMapEvents } from "react-leaflet";
import { Input } from "@/Components/ui/input";
import toast from "react-hot-toast";
import FilterBencana from "./FilterBencana/FilterBencana";
import { useMediaQuery } from "@/hooks/use-media-query";
import { X } from "lucide-react";

interface DisasterFeature {
    position: [number, number];
    type: "banjir" | "tanahLongsor" | "gempa" | "gelombang";
    category: string;
    sumber: string;
}

const getColorCategory = (type: string, value: string): string => {
    const colors: Record<string, Record<string, string>> = {
        Bhy_Bjr: { Tinggi: "#FF0000", Sedang: "#FFA500", Rendah: "#FFC0CB" },
        Bhy_Lsr: { Tinggi: "#8B4513", Sedang: "#FFD700", Rendah: "#F5F5DC" },
        Bhy_GmpBm: { Tinggi: "#800080", Sedang: "#4169E1", Rendah: "#87CEEB" },
        Bhy_GEA: { Tinggi: "#006400", Sedang: "#32CD32", Rendah: "#98FB98" },
    };
    return colors[type]?.[value] || "blue";
};

const style = (feature: any) => {
    const properties = feature.properties;
    const type = Object.keys(properties).find((key) => key.startsWith("Bhy_")) || "";
    const value = properties[type] || "";
    return {
        fillColor: getColorCategory(type, value),
        weight: 2,
        opacity: 1,
        color: "black",
        fillOpacity: 0.4,
    };
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

    const toggleDisasterState = useCallback((key: keyof typeof disasterStates) => {
        setDisasterStates((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    }, []);

    const [selectedFeature, setSelectedFeature] = useState<DisasterFeature | null>(null);
    const [userUploadMap, setUserUploadMap] = useState<any>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== "application/json" && !file.name.endsWith(".json")) {
            toast.error("Hanya file JSON yang diperbolehkan!");
            e.target.value = "";
            return;
        }

        setSelectedFile(file);
    }, []);

    const handleUpload = useCallback(() => {
        if (!selectedFile) {
            toast.error("Pilih file JSON terlebih dahulu!");
            return;
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
    }, [selectedFile]);

    const handleResetUploadUser = useCallback(() => {
        setSelectedFile(null);
        setUserUploadMap(null);
        const fileInput = document.getElementById("file_peta") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    }, []);

    const isDesktop = useMediaQuery("(min-width: 768px)");
    const geoJsonData = useMemo(() => ({
        banjir: dataBanjir,
        tanahLongsor: dataTanahLongsor,
        gempa: dataGempa,
        gelombang: dataGelombang,
    }), []);

    return (
        <section id="map" className="w-full px-4 pt-32">
            <div className="max-w-for-monitor mx-auto">
                <h1 className="mb-10 text-center text-2xl font-extrabold lg:text-4xl text-sirisa-primary">
                    Peta Kawasan Rawan Bencana
                </h1>
                <div className={cn(!isDesktop && "mb-3")}>
                    <Label htmlFor="file_peta" className="ml-0.5 mb-2 block">
                        Peta Anda <span className="text-gray-400 ml-1 text-xs">(ekstensi .json | Contoh: lahanbaru.json)</span>
                    </Label>
                    <div className="w-full md:flex items-center justify-between md:space-x-2 md:space-y-0 space-y-3">
                        <div className="max-w-sm flex items-center space-x-2">
                            <Input type="file" accept=".json" onChange={handleFileChange} id="file_peta" className="h-10" />
                            <Button type="submit" className="h-10" onClick={handleUpload}>Submit</Button>
                            {userUploadMap && (
                                <Button variant="ghost" onClick={handleResetUploadUser} className="h-9 px-2 lg:px-3">Reset<X /></Button>
                            )}
                        </div>
                        <FilterBencana disasterStates={disasterStates} toggleDisasterState={toggleDisasterState} />
                    </div>
                </div>
                <MapWithGeoJson className="overflow-hidden rounded-xl mt-5" height="600px" zoom={12}>
                    {userUploadMap && <GeoJSON data={userUploadMap} style={style} />}
                    {Object.entries(geoJsonData).map(([key, data]) =>
                        disasterStates[`show${key.charAt(0).toUpperCase() + key.slice(1)}` as keyof typeof disasterStates] && (
                            <GeoJSON key={key} data={data} style={style} />
                        )
                    )}
                </MapWithGeoJson>
            </div>
        </section>
    );
}
