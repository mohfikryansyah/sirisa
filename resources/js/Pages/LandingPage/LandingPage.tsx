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
import Risiko from "./parts/Risiko";
import Footer from "./parts/Footer";
import BencanaMap from "./Peta/PetaBencana";

export default function LandingPage() {
    return (
        <Main>
            <Head title="Balai Pemantapan Kawasan Hutan dan Tata Lingkungan XV Gorontalo" />
            <Header />
            <WhyUs />
            <Risiko />
            {/* <BencanaMap /> */}
            <Footer />
        </Main>
    );
}

function AlurPengaduan() {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const cardVariants: Variants = {
        offscreen: {
            y: 200,
        },
        onscreen: {
            y: 0,
            transition: {
                type: "bounce",
                bounce: 0.4,
                duration: 1.3,
            },
        },
    };

    const data = [
        {
            number: "1",
            title: "Ajukan Pengaduan",
            description: `Mulailah dengan mengisi formulir pengaduan secara online, yang mencakup deskripsi rinci mengenai masalah yang Anda hadapi. Anda dapat menyertakan foto atau bukti pendukung untuk memperjelas laporan Anda. Proses ini dapat dilakukan melalui perangkat apa saja, kapan saja.`,
        },
        {
            number: "2",
            title: "Proses Verifikasi",
            description: `Setelah pengaduan Anda diterima, tim Disperkim akan melakukan verifikasi untuk memastikan keakuratan informasi dan keabsahan masalah yang dilaporkan. Jika diperlukan, tim akan menghubungi Anda untuk klarifikasi lebih lanjut sebelum memprosesnya lebih lanjut.`,
        },
        {
            number: "3",
            title: "Tindak Lanjut",
            description: `Setelah pengaduan diverifikasi, tim terkait akan segera mengambil langkah-langkah untuk menyelesaikan masalah yang dilaporkan. Solusi yang diberikan akan sesuai dengan kebijakan dan prioritas yang ada, dengan tujuan untuk menyelesaikan masalah secepat mungkin.`,
        },
        {
            number: "4",
            title: "Notifikasi",
            description: `Selama proses penyelesaian, Anda akan mendapatkan pembaruan status pengaduan melalui email atau notifikasi di aplikasi. Anda akan diberi tahu jika ada perkembangan baru, seperti perubahan status atau penyelesaian masalah, sehingga Anda selalu mengetahui status pengaduan Anda.`,
        },
    ];

    return (
        <motion.div
            id="about"
            className="w-full h-auto bg-[#083247] lg:py-20 lg:px-32 md:p-10 px-5 py-10 overflow-hidden"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{
                once: true,
                amount: isDesktop ? 0.6 : 0.3,
            }}
        >
            {/* <p className="text-[#126792]">STEP</p> */}
            <h1 className="text-white md:text-4xl text-2xl font-bold text-center md:text-start">
                Alur Pengaduan Disperkim
            </h1>
            <motion.div
                variants={cardVariants}
                className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-10"
            >
                {data.map((card, index) => (
                    <MyCard
                        key={index}
                        number={card.number}
                        title={card.title}
                        body={card.description}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}

function WhyUs() {

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
            <div
                className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 pt-20 max-w-6xl mx-auto md:space-y-0 space-y-8"
            >
                <div className="space-y-5">
                    <p className="font-bold text-7xl text-yellow-400">
                        1000
                    </p>
                    <p className="font-semibold text-gray-800 text-xl">
                        Laporan belum diproses
                    </p>
                </div>
                <div className="space-y-5">
                    <p className="font-bold text-7xl text-yellow-400">
                        1000
                    </p>
                    <p className="font-semibold text-gray-800 text-xl">
                        Laporan sedang diproses
                    </p>
                </div>
                <div className="space-y-5">
                    <p className="font-bold text-7xl text-yellow-400">
                        1000
                    </p>
                    <p className="font-semibold text-gray-800 text-xl">
                        Laporan selesai diproses
                    </p>
                </div>
                <div className="space-y-5">
                    <p className="font-bold text-7xl text-yellow-400">
                        1000
                    </p>
                    <p className="font-semibold text-gray-800 text-xl">
                        Laporan ditolak
                    </p>
                </div>
            </div>
        </div>
    );
}

function AnimatedTestimonialsDemo() {
    const testimonials = [
        {
            quote: "Bagus sekali! Saya sangat senang dengan layanan yang diberikan. Sangat mudah digunakan dan hasilnya melebihi ekspektasi kami.",
            name: "Mohamad Fiqriansyah Panu",
            designation: "Air bersih",
            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote: "Layanan yang luar biasa! Saya sangat senang dengan hasilnya. Saya sangat suka!",
            name: "Oten Syahputra",
            designation: "CTO at InnovateSphere",
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote: "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
            name: "Emily Watson",
            designation: "Operations Director at CloudScale",
            src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote: "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
            name: "James Kim",
            designation: "Engineering Lead at DataPro",
            src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote: "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
            name: "Lisa Thompson",
            designation: "VP of Technology at FutureNet",
            src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];
    return (
        <div className="w-full py-10">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="uppercase text-[#348d9d] font-semibold text-xl">
                    Testimoni
                </h2>
            </div>
            <AnimatedTestimonials testimonials={testimonials} />
        </div>
    );
}

function Pertanyaan() {
    return (
        <div className="max-w-screen-lg mx-auto py-10 md:px-0 px-10">
            <h1 className="text-4xl">Pertanyaan yang sering diajukan</h1>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It's animated by default, but you can disable it if
                        you prefer.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}


