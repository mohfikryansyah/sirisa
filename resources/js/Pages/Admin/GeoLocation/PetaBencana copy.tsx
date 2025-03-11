import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import { Badge } from "@/Components/ui/badge";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
    ExternalLinkIcon,
    Fullscreen,
    RefreshCcwDotIcon,
    Search,
} from "lucide-react";
import seedrandom from "seedrandom";
import MapWithGeoJson from "@/Components/ui/MapWithGeoJson";
import { GeoJSON, useMap } from "react-leaflet";
import { useMemo, useState, useRef, useEffect } from "react";
import { GeoLocation as GeoLocationType } from "@/types";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/Components/ui/popover";
import { usePage } from "@inertiajs/react";
import { useIsMobile } from "@/hooks/use-mobile";

const getColorForTingkatBhy = (tingkatBhy: string) => {
    if (tingkatBhy === "Tinggi") {
        return "bg-red-500";
    } else if (tingkatBhy === "Sedang") {
        return "bg-yellow-500";
    } else if (tingkatBhy === "Rendah") {
        return "bg-green-500";
    } else {
        return "#000000";
    }
};

const MapController = ({
    onMapReady,
}: {
    onMapReady: (map: L.Map) => void;
}) => {
    const map = useMap();

    useEffect(() => {
        if (map) {
            onMapReady(map);
        }
    }, [map, onMapReady]);

    return null;
};

export default function PetaBencana({
    geoLocations,
}: {
    geoLocations: GeoLocationType[];
}) {
    const [visibleMaps, setVisibleMaps] = useState<Record<number, boolean>>(
        () => {
            return geoLocations.reduce((acc, geoLocation) => {
                acc[geoLocation.id] = true;
                return acc;
            }, {} as Record<number, boolean>);
        }
    );

    const [latitude, setLatitude] = useState<string>("");
    const [longitude, setLongitude] = useState<string>("");
    const mapRef = useRef<L.Map | null>(null);
    const geoJsonLayersRef = useRef<Record<number, L.GeoJSON>>({});

    const toggleMapVisibility = (id: number) => {
        setVisibleMaps((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const toggleAllMaps = (visible: boolean) => {
        const newState = geoLocations.reduce((acc, geoLocation) => {
            acc[geoLocation.id] = visible;
            return acc;
        }, {} as Record<number, boolean>);
        setVisibleMaps(newState);
    };

    const generateColorPalette = (seed: string) => {
        const rng = seedrandom(seed);
        return [
            `hsl(${Math.floor(rng() * 360)}, 70%, 50%)`,
            `hsl(${Math.floor(rng() * 360)}, 70%, 60%)`,
            `hsl(${Math.floor(rng() * 360)}, 70%, 70%)`,
        ];
    };

    const colorMap = useMemo(() => {
        return geoLocations.reduce((acc, geoLocation) => {
            acc[geoLocation.id] = generateColorPalette(
                geoLocation.id.toString()
            );
            return acc;
        }, {} as Record<number, string[]>);
    }, [geoLocations]);

    const getColor = (feature: any, geoLocationId: number) => {
        const colors = colorMap[geoLocationId] || ["#000", "#000", "#000"];
        const categoryColors: Record<string, string> = {
            Tinggi: colors[0],
            Sedang: colors[1],
            Rendah: colors[2],
        };
        return categoryColors[feature.properties.Tingkat_Bhy] || "#000000";
    };

    const createPopupContent = (
        lat: number,
        lng: number,
        title?: string,
        feature?: any
    ) => {
        const kategori = feature?.properties?.Tingkat_Bhy || "Tidak diketahui";
        const sumber = feature?.properties?.SMBR_DATA || "Tidak diketahui";
        const luas = feature?.properties?.Luas_Ha || "Tidak diketahui";
        const popupTitle = title || "Hasil Pencarian Koordinat";

        return ReactDOMServer.renderToString(
            <>
                <div>
                    <h2 className="text-lg font-bold">{popupTitle}</h2>
                    {feature && (
                        <Badge
                            variant={"outline"}
                            className={cn(
                                getColorForTingkatBhy(kategori),
                                "text-white"
                            )}
                        >
                            {kategori}
                        </Badge>
                    )}
                    {feature && (
                        <>
                            <p>
                                <b>Luas:</b> {luas} Ha
                            </p>
                            <p>
                                <b>Sumber:</b> {sumber}
                            </p>
                        </>
                    )}
                    <p>
                        <b>Titik Koordinat:</b> {lat.toFixed(5)},{" "}
                        {lng.toFixed(5)}
                    </p>
                    <a
                        href={`https://maps.google.com/maps?q=${lat},${lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-400 hover:underline"
                    >
                        Lihat di Google Maps{" "}
                        <ExternalLinkIcon className="w-4 h-4 ml-1" />
                    </a>
                </div>
            </>
        );
    };

    const handleGeoJSONRef = (
        geoLocationId: number,
        layer: L.GeoJSON | null
    ) => {
        if (layer) {
            geoJsonLayersRef.current[geoLocationId] = layer;
        }
    };

    const onEachFeature = (feature: any, layer: L.Layer, title: string) => {
        if (feature.properties) {
            const popup = L.popup();

            layer.on("click", (e) => {
                const { lat, lng } = e.latlng;

                const popupContent = createPopupContent(
                    lat,
                    lng,
                    title,
                    feature
                );

                popup
                    .setLatLng(e.latlng)
                    .setContent(popupContent)
                    .openOn(e.target._map);
            });
        }
    };

    const findFeatureAtCoordinates = (lat: number, lng: number) => {
        const point = L.latLng(lat, lng);
        const results: {
            geoLocationId: number;
            feature: any;
            layerTitle: string;
        }[] = [];

        Object.entries(geoJsonLayersRef.current).forEach(
            ([geoLocationIdStr, layer]) => {
                const geoLocationId = parseInt(geoLocationIdStr);

                if (!visibleMaps[geoLocationId]) return;

                const geoLocation = geoLocations.find(
                    (g) => g.id === geoLocationId
                );
                if (!geoLocation) return;

                try {
                    let foundFeature: any = null;
                    layer.eachLayer((featureLayer: any) => {
                        if (foundFeature) return;

                        const feature = featureLayer.feature;
                        if (!feature) return;

                        if (
                            featureLayer.getBounds &&
                            featureLayer.getBounds().contains(point)
                        ) {
                            foundFeature = feature;
                        }
                    });

                    if (foundFeature) {
                        results.push({
                            geoLocationId,
                            feature: foundFeature,
                            layerTitle:
                                geoLocation.title || `Peta ${geoLocation.id}`,
                        });
                    }
                } catch (error) {
                    console.error("Error checking feature:", error);
                }
            }
        );

        return results;
    };

    const handleSearchCoordinates = () => {
        if (!latitude || !longitude || !mapRef.current) return;

        try {
            const lat = parseFloat(latitude);
            const lng = parseFloat(longitude);

            if (isNaN(lat) || isNaN(lng)) {
                alert("Koordinat harus berupa angka yang valid");
                return;
            }

            if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
                alert(
                    "Koordinat tidak valid. Latitude: -90 sampai 90, Longitude: -180 sampai 180"
                );
                return;
            }

            const latLng = L.latLng(lat, lng);
            mapRef.current.setView(latLng, 15);
            const foundFeatures = findFeatureAtCoordinates(lat, lng);
            const popup = L.popup();

            if (foundFeatures.length > 0) {
                const { feature, layerTitle } = foundFeatures[0];
                const popupContent = createPopupContent(
                    lat,
                    lng,
                    layerTitle,
                    feature
                );
                popup
                    .setLatLng(latLng)
                    .setContent(popupContent)
                    .openOn(mapRef.current);
            } else {
                const popupContent = createPopupContent(lat, lng);
                popup
                    .setLatLng(latLng)
                    .setContent(popupContent)
                    .openOn(mapRef.current);
            }
        } catch (error) {
            console.error("Error searching coordinates:", error);
            alert("Terjadi kesalahan saat mencari koordinat");
        }
    };

    const handleMapReady = (map: L.Map) => {
        mapRef.current = map;
    };

    const visibleCount = Object.values(visibleMaps).filter(Boolean).length;
    const allVisible = visibleCount === geoLocations.length;
    const noneVisible = visibleCount === 0;

    const resetZoomLevel = () => {
        mapRef.current?.setZoom(12);
    };

    const handleZoomIn = () => {
        mapRef.current?.zoomIn();
    };

    const handleZoomOut = () => {
        mapRef.current?.zoomOut();
    };

    const handleFullscreen = () => {
        if (mapRef.current) {
            const mapContainer = mapRef.current.getContainer();
            if (!document.fullscreenElement) {
                mapContainer.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    };

    const url = usePage().url
    const isMobile = useIsMobile()

    return (
        <div className={cn("pt-1", url.endsWith('geo-location') ? "pb-0 pt-3 h-full " : "pb-48 h-screen")}>
            <div className={cn("grid md:grid-cols-10 gap-4 h-full", isMobile && "space-y-4")}>
                <Card className="md:col-span-2 overflow-y-auto md:h-auto h-full" data-lenis-prevent>
                    <CardHeader>
                        <CardTitle>Tools</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 border-b-2 border-gray-100 pb-5">
                            <div className="w-full border-b-2 border-gray-100 pb-4">
                                <h1 className="font-medium mb-2">Zoom</h1>
                                <div className="flex justify-between items-center ">
                                    <Button
                                        onClick={handleZoomIn}
                                        className="zoom-button"
                                        title="Perbesar"
                                    >
                                        +
                                    </Button>

                                    <span className="px-3">In/Out</span>

                                    <Button
                                        onClick={handleZoomOut}
                                        className="zoom-button "
                                        title="Perkecil"
                                    >
                                        -
                                    </Button>
                                </div>
                                <Button
                                    onClick={resetZoomLevel}
                                    className="w-full mt-2"
                                    title="Reset Zoom"
                                >
                                    <RefreshCcwDotIcon />
                                    Reset Zoom
                                </Button>

                                <Button
                                    onClick={handleFullscreen}
                                    className="w-full mt-2"
                                    title="Fullscreen"
                                >
                                    <Fullscreen />
                                    Fullscreen
                                </Button>
                            </div>
                            <div className="border-b-2 border-gray-100 pb-5">
                                <Popover>
                                    <h1 className="font-medium mb-2">
                                        Filter Peta KRB
                                    </h1>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="default"
                                            className="w-full"
                                        >
                                            Pilih Peta
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-full popover-content-width-same-as-its-trigger p-2 mt-1"
                                        side="bottom"
                                        align="start"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() =>
                                                    toggleAllMaps(!allVisible)
                                                }
                                                className={cn(
                                                    "w-full px-4 py-2 rounded-md text-sm font-medium transition-all",
                                                    allVisible
                                                        ? "bg-[#187f80] text-white"
                                                        : "hover:bg-gray-100 text-gray-700"
                                                )}
                                            >
                                                {allVisible
                                                    ? "Sembunyikan Semua"
                                                    : "Tampilkan Semua"}
                                            </button>

                                            {geoLocations.map((geoLocation) => {
                                                const isActive =
                                                    visibleMaps[geoLocation.id];

                                                return (
                                                    <button
                                                        key={geoLocation.id}
                                                        onClick={() =>
                                                            toggleMapVisibility(
                                                                geoLocation.id
                                                            )
                                                        }
                                                        className={cn(
                                                            "flex items-center justify-start w-full px-4 py-2 rounded-md text-sm font-medium transition-all",
                                                            isActive
                                                                ? "bg-[#187f80] text-white"
                                                                : "hover:bg-gray-100 text-gray-700"
                                                        )}
                                                    >
                                                        {geoLocation.title ||
                                                            `Peta ${geoLocation.id}`}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <h1 className="font-medium">Cari Lokasi</h1>
                            <div>
                                <Label htmlFor="latitude">Latitude</Label>
                                <Input
                                    id="latitude"
                                    placeholder="-8.1234"
                                    value={latitude}
                                    onChange={(e) =>
                                        setLatitude(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="longitude">Longitude</Label>
                                <Input
                                    id="longitude"
                                    placeholder="115.5678"
                                    value={longitude}
                                    onChange={(e) =>
                                        setLongitude(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex items-end">
                                <Button
                                    onClick={handleSearchCoordinates}
                                    className="w-full"
                                >
                                    <Search className="mr-2 h-4 w-4" /> Cari
                                    Koordinat
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                

                <div className={cn("flex flex-col flex-1 md:col-span-6 rounded-lg overflow-hidden", isMobile && "h-[400px]")}>
                    <MapWithGeoJson zoom={12} mapRef={mapRef}>
                        <MapController onMapReady={handleMapReady} />

                        {geoLocations
                            .filter(
                                (geoLocation) => visibleMaps[geoLocation.id]
                            )
                            .map((geoLocation) => (
                                <GeoJSON
                                    key={geoLocation.id}
                                    data={geoLocation.geo_json_data}
                                    style={(feature) => ({
                                        color: getColor(
                                            feature,
                                            geoLocation.id
                                        ),
                                    })}
                                    onEachFeature={(feature, layer) =>
                                        onEachFeature(
                                            feature,
                                            layer,
                                            geoLocation.title
                                        )
                                    }
                                    ref={(layer) =>
                                        handleGeoJSONRef(geoLocation.id, layer)
                                    }
                                />
                            ))}
                    </MapWithGeoJson>
                </div>

                <Card className="md:col-span-2 overflow-y-auto h-full" data-lenis-prevent>
                    <CardHeader>
                        <CardTitle>Legend</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-auto ">
                        {geoLocations
                            .filter(
                                (geoLocation) => visibleMaps[geoLocation.id]
                            )
                            .map((geoLocation) => (
                                <div key={geoLocation.id} className="mb-2 pb-3">
                                    <div className="border-b-2 border-gray-100 mb-2">
                                        <h3 className="font-medium mb-1">
                                            {geoLocation.title ||
                                                `Peta ${geoLocation.id}`}
                                        </h3>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        {colorMap[geoLocation.id]?.map(
                                            (color, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2"
                                                >
                                                    <div
                                                        className="w-6 h-6 rounded"
                                                        style={{
                                                            backgroundColor:
                                                                color,
                                                        }}
                                                    />
                                                    <span>
                                                        {index === 0
                                                            ? "Tinggi"
                                                            : index === 1
                                                            ? "Sedang"
                                                            : "Rendah"}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}

                        {noneVisible && (
                            <p className="text-gray-500 italic">
                                Tidak ada peta yang ditampilkan
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
