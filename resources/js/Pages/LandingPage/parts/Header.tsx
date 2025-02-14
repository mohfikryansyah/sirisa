import BubbleText from "@/Components/ui/bubble-text";
import { useMediaQuery } from "@/hooks/use-media-query";
import { FormEventHandler, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { ComplaintForm } from "../Form/ComplaintForm";
import { PlaceholdersAndVanishInput } from "@/Components/ui/placeholder-and-vanish-input";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";
import { searchComplaintSchema } from "@/schema/schema";
import { z } from "zod";
import { Card } from "@/Components/ui/card";
import { Pin } from "lucide-react";

export default function Header() {
    const [showTips, setShowTips] = useState(false);
    const [searchComplaint, setSearchComplaint] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setShowTips(false);
        }, 500);
    }, []);

    const placeholders = [
        "Masukkan nomor Anda disini",
        "Untuk melihat proses laporan Anda",
        "Contoh: 082290142486",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setSearchComplaint(value);

        // try {
        //     searchComplaintSchema.parse(value);
        //     setError(null);
        // } catch (err) {
        //     if (err instanceof z.ZodError) {
        //         setError(err.errors[0].message);
        //     }
        // }
    };

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        try {
            searchComplaintSchema.parse(searchComplaint);
            router.get(
                route("complaint.search", { search_query: searchComplaint })
            );
        } catch (error) {
            if (error instanceof z.ZodError) {
                error.errors.map((error) => toast.error(error.message));
            }
        }
    };

    return (
        <div className="w-full h-screen overflow-hidden relative">
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] overflow-hidden">
                <GridPattern />
            </div>
            <div className="w-full lg:grid grid-cols-4 items-center justify-center h-full">
                <div className="xl:block hidden">
                    {showTips && (
                        <>
                            <BubbleText className="top-[15%] left-28">
                                Dilarang menebang pohon tanpa izin resmi.
                            </BubbleText>
                            <BubbleText className="top-[44%] left-10">
                                Pastikan api benar-benar padam setelah
                                digunakan.
                            </BubbleText>
                            <BubbleText className="top-[75%] left-20">
                                Lindungi ekosistem dengan tidak merusaknya.
                            </BubbleText>
                        </>
                    )}
                    <Card className="bg-[#fef18c] shadow-lg pl-5 py-2 border-[#fef18c] h-[20rem] ml-32 w-[18rem] relative rotate-6 hover:scale-105 transition duration-300">
                        <div className="flex flex-col items-center -mt-6 absolute left-0 right-0 w-full">
                            <div className="rounded-full z-10 h-5 w-5 bg-red-500 bg-radial-gradient"></div>
                            <div className="h-6 w-[0.1rem] -mt-2 rounded-lg bg-black"></div>
                        </div>
                        <div className="w-full h-full p-5 border-l-2 border-black/80 border-dashed font-grapenuts text-3xl space-y-4">
                            <p>Dilarang menebang pohon tanpa izin resmi.</p>
                            <p>Jangan membakar hutan atau lahan.</p>
                        </div>
                    </Card>
                </div>
                <div className="w-full h-full col-start-2 col-span-2 flex flex-col md:gap-4 items-center md:relative absolute justify-center z-10">
                    <div className="md:max-w-md max-w-xs w-full px-4 md:px-0 md:mb-0 mb-4">
                        {/* {error && <p className="text-destructive text-base mb-2">{error}</p>} */}
                        <PlaceholdersAndVanishInput
                            placeholders={placeholders}
                            onChange={handleChange}
                            onSubmit={onSubmit}
                        />
                    </div>
                    <h1 className="inline-block max-w-5xl bg-gradient-to-r from-blue-500 via-green-500 to-sirisa-primary bg-clip-text text-center text-2xl font-bold text-transparent md:py-2 md:text-6xl">
                        Lindungi Sumber Daya Alam
                    </h1>
                    <h1 className="text-center text-2xl md:py-0 py-2 font-bold text-gray-700 md:text-[3.5rem] md:px-0 px-5 inline-block max-w-5xl leading-[1]">
                        Bersama Lindungi Bumi Kita
                    </h1>
                    <p className="mx-auto md:max-w-xl max-w-xs md:mt-4 text-center text-lg font-medium text-gray-700 md:w-2/3">
                        Temukan informasi risiko terkini untuk melindungi masa
                        depan lingkungan.
                    </p>
                    <div className="flex gap-3 items-center justify-center md:mt-3 mt-5">
                        <a
                            className="rounded-xl bg-[#187f80] px-4 py-3 font-medium text-white"
                            href="#map"
                        >
                            Lihat Peta
                        </a>
                        <ComplaintForm />
                    </div>
                </div>
                <div className="xl:block hidden">
                    {showTips && (
                        <>
                            <BubbleText className="top-[10%] right-35">
                                Jangan membakar hutan atau lahan.
                            </BubbleText>
                            <BubbleText className="top-[40%] right-10">
                                Gunakan sumber daya alam secara bijak dan
                                bertanggung jawab.
                            </BubbleText>
                            <BubbleText className="top-[70%] right-32">
                                Pelihara lingkungan dengan menanam pohon
                            </BubbleText>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

interface GridBoxProps {
    isDark: boolean;
}

function GridBox({ isDark }: GridBoxProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <div
            className={`flex flex-shrink-0 rounded-[2px] ${
                isDark
                    ? "bg-gray-50 dark:bg-neutral-950"
                    : "bg-gray-200 dark:bg-neutral-950 dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
            } ${isDesktop ? "w-32 h-32" : "w-10 h-10"}`}
        />
    );
}

export function GridPattern() {
    const columns = 41;
    const rows = 4;
    const [gridData, setGridData] = useState<boolean[][]>([]);

    useEffect(() => {
        const generateGridData = (): boolean[][] => {
            const data = [];
            for (let row = 0; row < rows; row++) {
                const rowData = [];
                for (let col = 0; col < columns; col++) {
                    rowData.push(Math.random() < 0.9);
                }
                data.push(rowData);
            }
            return data;
        };

        setGridData(generateGridData());
    }, []);

    return (
        <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px">
            {gridData.map((rowData, rowIndex) =>
                rowData.map((isDark, colIndex) => (
                    <GridBox key={`${colIndex}-${rowIndex}`} isDark={isDark} />
                ))
            )}
        </div>
    );
}
