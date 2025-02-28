import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/Components/ui/drawer";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm } from "react-hook-form";
import {
    Form as Forms,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import toast from "react-hot-toast";
import { router, usePage } from "@inertiajs/react";
import { set, z } from "zod";
import { FormPengaduan } from "@/schema/schema";
import { Textarea } from "@/Components/ui/textarea";
import { Coordinates } from "@/types";
import VoiceRecorder from "./VoiceRecorder";
import { FileUpload } from "@/Components/ui/file-upload";
import MyMapComponent from "./MyMap";
import { FormEventHandler, useEffect } from "react";

export function ComplaintForm() {
    const [open, setOpen] = React.useState(false);
    const [disable, setDisable] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="rounded-xl h-full font-medium text-base"
                    >
                        Laporkan
                    </Button>
                </DialogTrigger>
                <DialogContent
                    className="sm:max-w-4xl h-[90vh]"
                    data-lenis-prevent
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Laporkan</DialogTitle>
                        <DialogDescription>
                            Setiap laporan yang Anda kirim membantu dalam upaya
                            perlindungan sumber daya alam dan mitigasi risiko.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="overflow-y-auto pr-3 pb-3 scrollbar-thin">
                        <Form setDisable={setDisable} setOpen={setOpen} />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Close
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            form="complaint-form"
                            disabled={disable}
                        >
                            Kirim Pengaduan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    variant="outline"
                    className="rounded-xl h-full font-medium text-base"
                >
                    Laporkan
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[85vh]">
                <DrawerHeader className="text-left">
                    <DrawerTitle>Laporkan</DrawerTitle>
                    <DrawerDescription>
                        Setiap laporan yang Anda kirim membantu dalam upaya
                        perlindungan sumber daya alam dan mitigasi risiko.
                    </DrawerDescription>
                </DrawerHeader>
                <div
                    className="overflow-y-auto px-4 scrollbar-thin pb-4"
                    data-lenis-prevent
                >
                    <Form
                        className="px-4"
                        setDisable={setDisable}
                        setOpen={setOpen}
                    />
                </div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                    <Button
                        type="submit"
                        disabled={disable}
                        form="complaint-form"
                    >
                        Kirim Pengaduan
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function Form({
    className,
    setDisable,
    setOpen,
}: React.ComponentProps<"form"> & {
    setDisable: React.Dispatch<React.SetStateAction<boolean>>;
} & { setOpen?: React.Dispatch<React.SetStateAction<boolean>> }) {
    const form = useForm<z.infer<typeof FormPengaduan>>({
        resolver: zodResolver(FormPengaduan),
        defaultValues: {
            name: "",
            telp: "",
            message: "",
            audio: undefined,
            latitude: "",
            longitude: "",
            files: [],
        },
        mode: "onChange",
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        setDisable(true);
        router.post(route("complaint.store"), form.getValues(), {
            onSuccess: () => {
                toast.success("Pengaduan berhasil dikirim!");
                form.reset();
                form.setValue("audio", undefined);
                form.setValue("telp", "");
                setDisable(false);
                setOpen && setOpen(false);
            },
            onError: (errors) => {
                setDisable(false);
                toast.error("Terjadi Kesalahan");
                Object.keys(errors).forEach((key) => {
                    form.setError(key as keyof z.infer<typeof FormPengaduan>, {
                        type: "server",
                        message: errors[key],
                    });
                });
            },
        });
    };

    const handleCoordinatesChange = (coords: Coordinates) => {
        form.setValue("latitude", coords.lat);
        form.setValue("longitude", coords.lng);

        form.trigger("latitude");
        form.trigger("longitude");
    };

    const handleFileUpload = (uploadedFiles: File[]) => {
        form.setValue("files", uploadedFiles);
    };

    const [currentLocation, setCurrentLocation] = React.useState<{
        lat: number;
        lng: number;
    } | null>(null);

    return (
        <Forms {...form}>
            <form
                onSubmit={onSubmit}
                encType="multipart/form-data"
                className="space-y-4"
                id="complaint-form"
            >
                <div className="grid md:grid-cols-2 gap-x-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ketikkan Nama Anda"
                                        {...field}
                                        className="focus-visible:ring-[#063b3e]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="telp"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Nomor HP</FormLabel>
                                <FormControl>
                                    <Input
                                        type="tel"
                                        placeholder="Masukkan nomor HP Anda"
                                        {...field}
                                        className={cn(
                                            "focus-visible:ring-[#063b3e] block h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background md:text-sm",
                                            fieldState.error && "border-red-500"
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pesan</FormLabel>
                            <FormControl>
                                <Textarea
                                    rows={5}
                                    placeholder="Tuliskan pesan Anda"
                                    className="resize-none focus-visible:ring-[#063b3e]"
                                    {...field}
                                />
                            </FormControl>
                            <div className="flex justify-between">
                                <FormDescription
                                    className={`order-2 ${
                                        field.value.length > 450
                                            ? "text-red-500"
                                            : ""
                                    }`}
                                >
                                    Maks. {field.value.length || 0}
                                    /450
                                </FormDescription>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="audio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel optional={true}>Rekam Suara</FormLabel>
                            <FormControl>
                                <VoiceRecorder
                                    onAudioReady={(audioBlob) => {
                                        const file = new File(
                                            [audioBlob],
                                            "voice_recording.wav",
                                            {
                                                type: "audio/wav",
                                            }
                                        );
                                        form.setValue("audio", file);
                                        field.onChange(file);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="files"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dokumen Pendukung</FormLabel>
                            <FormControl>
                                <div className="w-full mx-auto min-h-80 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                                    <FileUpload onChange={handleFileUpload} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="space-y-2 w-full">
                    <div className="md:flex items-center gap-x-1">
                        <FormLabel>Pilih Lokasi di Peta </FormLabel>
                        <span className="text-sm font-medium">atau </span>
                        <button
                            type="button"
                            className="text-sm font-medium text-blue-500 underline"
                            onClick={() => {
                                if (navigator.geolocation) {
                                    navigator.geolocation.getCurrentPosition(
                                        (position) => {
                                            const { latitude, longitude } =
                                                position.coords;
                                            form.setValue("latitude", latitude);
                                            form.setValue(
                                                "longitude",
                                                longitude
                                            );

                                            form.trigger("latitude");
                                            form.trigger("longitude");

                                            setCurrentLocation({
                                                lat: latitude,
                                                lng: longitude,
                                            });
                                            toast.success(
                                                "Lokasi berhasil diambil!"
                                            );
                                        },
                                        (error) => {
                                            toast.error(
                                                "Tidak dapat mengambil lokasi: " +
                                                    error.message
                                            );
                                        }
                                    );
                                } else {
                                    toast.error(
                                        "Geolocation tidak didukung di browser ini."
                                    );
                                }
                            }}
                        >
                            Gunakan Lokasi saat ini
                        </button>
                    </div>
                    <MyMapComponent
                        className="h-[20rem] w-full"
                        onCoordinatesChange={handleCoordinatesChange}
                        currentLocation={currentLocation}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Masukkan Latitude"
                                    {...field}
                                    className="focus-visible:ring-[#063b3e]"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Masukkan Longitude"
                                    {...field}
                                    type="text"
                                    className="focus-visible:ring-[#063b3e]"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Forms>
    );
}
