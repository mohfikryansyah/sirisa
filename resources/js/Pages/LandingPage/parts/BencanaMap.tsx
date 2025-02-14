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
    const [showGelombang, setShowGelombang] = useState(true);
    const [showGempa, setShowGempa] = useState(true);
    const [showBanjir, setShowBanjir] = useState(true);
    const [showTanahLongsor, setShowTanahLongsor] = useState(true);

    const [selectedFeature, setSelectedFeature] = useState<{
        position: [number, number];
        type: "banjir" | "tanahLongsor" | "gempa" | "gelombang";
        category: string;
        sumber: string;
    } | null>(null);

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
    }

    const openPopup = (e: L.LeafletEvent) => {
        e.target.openPopup();
    }

    return (
        <div className="w-full px-4">
            <div className="max-w-for-monitor mx-auto">
                <h1>Peta dengan GeoJSON</h1>
                <div className="flex space-x-10 max-w-fit w-full mx-auto my-10">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            onCheckedChange={() => {
                                setShowTanahLongsor(!showTanahLongsor);
                                setSelectedFeature(null);
                            }}
                            checked={showTanahLongsor}
                            id="tanahLongsor"
                        />
                        <Label htmlFor="tanahLongsor">Tanah Longsor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            onCheckedChange={() => {
                                setShowBanjir(!showBanjir);
                                setSelectedFeature(null);
                            }}
                            checked={showBanjir}
                            id="banjir"
                        />
                        <Label htmlFor="banjir">Banjir</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            onCheckedChange={() => {
                                setShowGempa(!showGempa);
                                setSelectedFeature(null);
                            }}
                            checked={showGempa}
                            id="gempa"
                        />
                        <Label htmlFor="gempa">Gempa</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            onCheckedChange={() => {
                                setShowGelombang(!showGelombang);
                                setSelectedFeature(null);
                            }}
                            checked={showGelombang}
                            id="gelombang"
                        />
                        <Label htmlFor="gelombang">
                            Gelombang Ekstrim Abrasi
                        </Label>
                    </div>
                </div>
                <MapWithGeoJson
                    className="overflow-hidden rounded-xl"
                    height="600px"
                    zoom={12}
                >
                    <MapClickHandler />
                    {showBanjir && (
                        <GeoJSON
                            data={dataBanjir}
                            style={style}
                            onEachFeature={onEachFeature("banjir")}
                        />
                    )}
                    {showTanahLongsor && (
                        <GeoJSON
                            data={dataTanahLongsor}
                            style={style}
                            onEachFeature={onEachFeature("tanahLongsor")}
                        />
                    )}
                    {showGempa && (
                        <GeoJSON
                            data={dataGempa}
                            style={style}
                            onEachFeature={onEachFeature("gempa")}
                        />
                    )}
                    {showGelombang && (
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
        </div>
    );
}
