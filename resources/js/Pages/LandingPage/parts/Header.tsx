import BubbleText from "@/Components/ui/bubble-text";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { ComplaintForm } from "../Form/ComplaintForm";

export default function Header() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 500);
    }, []);

    return (
        <div className="w-full h-screen overflow-hidden relative">
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] overflow-hidden">
                <GridPattern />
            </div>
            <div className="w-full lg:grid grid-cols-4 items-center justify-center h-full">
                <div className="lg:block hidden">
                    {show && (
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
                </div>
                <div className="w-full h-full col-span-2 flex flex-col md:gap-4 items-center md:relative absolute justify-center z-10">
                    <div className="h-auto">
                        <h1 className="inline-block max-w-5xl leading-10 bg-gradient-to-r from-blue-500 via-green-500 to-sirisa-primary bg-clip-text text-center text-3xl font-bold text-transparent md:py-2 md:text-6xl">
                            Cegah Risiko
                        </h1>
                    </div>
                    <h1 className="text-center text-3xl font-bold text-gray-700 md:text-6xl md:px-0 px-5">
                        Lindungi Sumber Daya Alam
                    </h1>
                    <p className="mx-auto md:max-w-xl max-w-xs mt-4 text-center text-xl font-medium text-gray-700 md:w-2/3">
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
                        <ComplaintForm/> 
                    </div>
                </div>
                <div className="lg:block hidden">
                    {show && (
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
            } ${isDesktop ? "w-28 h-28" : "w-10 h-10"}`}
        />
    );
}

function GridPattern() {
    const columns = 41;
    const rows = 11;
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
        <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
            {gridData.map((rowData, rowIndex) =>
                rowData.map((isDark, colIndex) => (
                    <GridBox key={`${colIndex}-${rowIndex}`} isDark={isDark} />
                ))
            )}
        </div>
    );
}
