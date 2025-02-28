import { Button } from "@/Components/ui/button";
import { FileUpload } from "@/Components/ui/file-upload";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";

import { Input } from "@/Components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { GeoLocationFormSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

export default function FormUploadPeta() {
    const form = useForm<z.infer<typeof GeoLocationFormSchema>>({
        resolver: zodResolver(GeoLocationFormSchema),
        defaultValues: {
            title: "",
            path: undefined,
        },
        mode: "onChange",
    });
    const [resetFileUpload, setResetFileUpload] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    function onSubmit(values: z.infer<typeof GeoLocationFormSchema>) {
        console.table(values);
        router.post(route("geo-location.store"), values, {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                setResetFileUpload(!resetFileUpload);
                toast.success("Berhasil menambahkan data peta");
                setOpenDialog(false);
            },
            onError: (errors) => {
                console.log(errors);
                toast.error("Terjadi Kesalahan");
                Object.keys(errors).forEach((key) => {
                    form.setError(
                        key as keyof z.infer<typeof GeoLocationFormSchema>,
                        {
                            type: "server",
                            message: errors[key],
                        }
                    );
                });
            },
        });
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}> 
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    className="rounded-xl"
                >
                    Buat Data Baru
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Buat Peta Baru</DialogTitle>
                    <DialogDescription>
                        Tambahkan Peta Baru dengan Format File .json
                    </DialogDescription>
                    <div className="pt-5">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-2"
                                encType="multipart/form-data"
                            >
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Judul Peta</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Contoh: Peta Kawasan Rawan Banjir"
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
                                    name="path"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>
                                                Dokumen Pendukung
                                            </FormLabel>
                                            <FormControl>
                                                <div className="w-full mx-auto min-h-[33vh] border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                                                    <FileUpload
                                                        onChange={(
                                                            path: File[]
                                                        ) =>
                                                            form.setValue(
                                                                "path",
                                                                path
                                                            )
                                                        }
                                                        multiple={false}
                                                        resetFileUpload={
                                                            resetFileUpload
                                                        }
                                                        setResetFileUpload={
                                                            setResetFileUpload
                                                        }
                                                        // accept=".json"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="pt-2">
                                    <Button type="submit" className="">
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
