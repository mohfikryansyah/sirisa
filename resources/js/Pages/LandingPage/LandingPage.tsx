import Main from "@/Layouts/Main";
import { FlipWords } from "@/Components/ui/flip-words";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Input } from "@/Components/ui/input";
import { Search, Twitter } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import toast from "react-hot-toast";
import { AnimatedTestimonials } from "@/Components/ui/animated-testimonials";
import {
    animate,
    motion,
    useAnimate,
    useInView,
    useMotionValue,
    useTransform,
    Variants,
} from "framer-motion";
import MyCard from "@/Components/ui/mycard";
import { useMediaQuery } from "@/hooks/use-media-query";
import Header from "./parts/Header";
import TujuanDanManfaat from "./parts/TujuanDanManfaat";
import Risiko from "./Risiko/Risiko";
import Footer from "./parts/Footer";
import Sinergi from "./Sinergi/sinergi";
import { Complaint } from "@/types";
import { HistoryLaporan } from "./HistoryLaporan/history-laporan";

export default function LandingPage({
    complaints,
}: {
    complaints: Complaint[];
}) {
    return (
        <Main>
            <Head title="Balai Pemantapan Kawasan Hutan dan Tata Lingkungan XV Gorontalo" />
            <Header />
            <WhyUs complaints={complaints} />
            <Risiko />
            <Sinergi />
            <HistoryLaporan complaints={complaints} />
            <Footer />
        </Main>
    );
}

function WhyUs({ complaints }: { complaints: Complaint[] }) {
    return (
        <div id="whyus" className="w-full h-auto pb-20 pt-5 text-center px-8">
            <div className="max-w-for-monitor mx-auto space-y-6 px-3">
                <h2 className="uppercase text-[#348d9d] font-semibold text-xl">
                    Why Us
                </h2>
                <h1 className="text-2xl md:text-4xl max-w-3xl md:leading-[3rem] leading-[2.5rem] mx-auto text-[#1d1e20] font-bold">
                    Kami memberikan solusi cepat, transparan, dan tanggap
                    terhadap setiap pengaduan masyarakat.
                </h1>
                <p className="text-gray-500 max-w-lg text-xl mx-auto font-semibold pt-7">
                    Lebih dari 10.000 laporan berhasil ditangani dan
                    penyelesaian rata-rata dalam 3 hari kerja.
                </p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pt-20 max-w-6xl mx-auto md:space-y-0 space-y-8">
                <div className="space-y-5">
                    <p className="font-bold text-7xl text-yellow-400">
                        {
                            complaints.filter(
                                (complaint) =>
                                    complaint.statuses.status ===
                                    "Belum diproses"
                            ).length
                        }
                    </p>
                    <p className="font-semibold text-gray-800 text-xl">
                        Laporan belum diproses
                    </p>
                </div>
                <div className="space-y-5">
                    <p className="font-bold text-7xl text-yellow-400">
                        {
                            complaints.filter(
                                (complaint) =>
                                    complaint.statuses.status ===
                                    "Sedang diproses"
                            ).length
                        }
                    </p>
                    <p className="font-semibold text-gray-800 text-xl">
                        Laporan sedang diproses
                    </p>
                </div>
                <div className="space-y-5">
                    <p className="font-bold text-7xl text-yellow-400">
                        {
                            complaints.filter(
                                (complaint) =>
                                    complaint.statuses.status ===
                                    "Selesai"
                            ).length
                        }
                    </p>
                    <p className="font-semibold text-gray-800 text-xl">
                        Laporan selesai diproses
                    </p>
                </div>
                {/* <div className="space-y-5">
                    <p className="font-bold text-7xl text-yellow-400">1000</p>
                    <p className="font-semibold text-gray-800 text-xl">
                        Laporan ditolak
                    </p>
                </div> */}
            </div>
        </div>
    );
}
