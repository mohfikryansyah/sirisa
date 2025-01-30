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
import UsaPopulationMap from "./parts/Map";
import TujuanDanManfaat from "./parts/TujuanDanManfaat";
import { GlobeDemo } from "./parts/Globe";
import Risiko from "./parts/Risiko";

export default function Home() {
    return (
        <Main>
            <Head title="Balai Pemantapan Kawasan Hutan dan Tata Lingkungan XV Gorontalo" />
            <Header />
            {/* <TujuanDanManfaat/> */}
            {/* <FormPengaduan /> */}
            {/* <AlurPengaduan /> */}
            <GlobeDemo />
            <Risiko />
            <UsaPopulationMap />
            {/* <WhyUs /> */}
            {/* <AnimatedTestimonialsDemo /> */}
            {/* <Pertanyaan /> */}
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
    const counts = [
        useMotionValue(0),
        useMotionValue(0),
        useMotionValue(0),
        useMotionValue(0),
    ];
    const roundedCounts = counts.map((count) =>
        useTransform(count, (value) => Math.round(value))
    );
    const [scope, animate] = useAnimate();
    const isInView = useInView(scope);

    useEffect(() => {
        if (isInView) {
            // Target angka untuk masing-masing animasi
            const targets = [100, 152, 10000, 1000];
            targets.forEach((target, index) => {
                animate(counts[index], target, {
                    duration: 2,
                    ease: "easeOut",
                });
            });
        }
    }, [isInView]);

    return (
        <div id="whyus" className="w-full h-auto py-10 text-center">
            <div className="max-w-screen-lg mx-auto space-y-3 px-3">
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
                ref={scope}
                className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 pt-14 max-w-6xl mx-auto md:space-y-0 space-y-8"
            >
                <div className="space-y-5">
                    <motion.pre className="font-bold text-7xl text-yellow-400">
                        {roundedCounts[0]}
                    </motion.pre>
                    <p className="font-semibold text-gray-800 text-xl">
                        Laporan belum diproses
                    </p>
                </div>
                <div className="space-y-5">
                    <motion.pre className="font-bold text-7xl text-yellow-400">
                        {roundedCounts[1]}
                    </motion.pre>
                    <p className="font-semibold text-gray-800 text-xl">
                        Laporan sedang diproses
                    </p>
                </div>
                <div className="space-y-5">
                    <motion.pre className="font-bold text-7xl text-yellow-400">
                        {roundedCounts[2]}
                    </motion.pre>
                    <p className="font-semibold text-gray-800 text-xl">
                        Laporan selesai diproses
                    </p>
                </div>
                <div className="space-y-5">
                    <motion.pre className="font-bold text-7xl text-yellow-400">
                        {roundedCounts[3]}
                    </motion.pre>
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

// function Fitur() {
//     return (
//         <div
//             id="about"
//             className="w-full h-auto bg-[#083247] md:py-20 md:px-32 p-5"
//         >
//             {/* <p className="text-[#126792]">STEP</p> */}
//             <h1 className="text-white md:text-4xl text-lg">
//                 Fitur Utama Sistem
//             </h1>
//             <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mt-10">
//                 <div className="bg-[#113a4e] rounded-lg h-auto space-y-2 p-5 text-white">
//                     <h1 className="text-7xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-b from-white to-[#113a4e]">
//                         1
//                     </h1>
//                     <h2 className="text-xl font-bold text-[#1989c2]">
//                         Mudah Digunakan
//                     </h2>
//                     <p className="text-sm text-gray-300">
//                         Sistem ini dirancang dengan antarmuka sederhana,
//                         memungkinkan pengajuan pengaduan hanya dalam beberapa
//                         langkah melalui perangkat apa pun.
//                     </p>
//                 </div>
//                 <div className="bg-[#113a4e] rounded-lg h-auto space-y-2 p-5 text-white">
//                     <h1 className="text-7xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-b from-white to-[#113a4e]">
//                         2
//                     </h1>
//                     <h2 className="text-xl font-bold text-[#1989c2]">
//                         Pelacakan Real-Time
//                     </h2>
//                     <p className="text-sm text-gray-300">
//                         Pantau perkembangan laporan Anda secara langsung, mulai
//                         dari tahap verifikasi hingga penyelesaian, dengan
//                         pembaruan status yang transparan.
//                     </p>
//                 </div>
//                 <div className="bg-[#113a4e] rounded-lg h-auto space-y-2 p-5 text-white">
//                     <h1 className="text-7xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-b from-white to-[#113a4e]">
//                         3
//                     </h1>
//                     <h2 className="text-xl font-bold text-[#1989c2]">
//                         Tanggap dan Transparan
//                     </h2>
//                     <p className="text-sm text-gray-300">
//                         Setiap pengaduan diproses cepat dengan tindakan yang
//                         tercatat dan dapat dilacak, memastikan keterbukaan dalam
//                         penyelesaian masalah.
//                     </p>
//                 </div>
//                 <div className="bg-[#113a4e] rounded-lg h-auto space-y-2 p-5 text-white">
//                     <h1 className="text-7xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-b from-white to-[#113a4e]">
//                         4
//                     </h1>
//                     <h2 className="text-xl font-bold text-[#1989c2]">
//                         Layanan 24/7
//                     </h2>
//                     <p className="text-sm text-gray-300">
//                         Ajukan laporan kapan saja, tanpa batasan waktu, melalui
//                         sistem yang selalu aktif sepanjang hari.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }

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

function Footer() {
    return (
        <footer className="m-4 mt-16 rounded-2xl bg-neutral-800 text-white md:m-8 md:mt-32">
            <div className="container mx-auto flex flex-col gap-8 px-6 py-8 md:py-12">
                <div className="flex w-full flex-col gap-8 md:flex-row md:gap-20">
                    <div className="flex w-full flex-col gap-2 md:w-1/3">
                        <img src="kehutanan-logo.png" alt="" className="w-28 h-auto" />
                        {/* <p className="mt-4 text-sm leading-relaxed lg:text-base">
                        Sirisa adalah platform informasi untuk membantu kamu memahami dan mengelola risiko sumber daya alam secara lebih baik.
                        </p> */}
                        <div className="mt-4 flex flex-col items-start gap-4 xl:flex-row">
                            <div className="flex items-center justify-center gap-1 text-sm text-neutral-300">
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 384 512"
                                    className="text-2xl"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path>
                                </svg>
                                <p> Gorontalo, Indonesia</p>
                            </div>
                            <a
                                target="_blank"
                                className="flex items-center justify-center gap-1 text-sm text-neutral-300"
                                href="https://wa.me/6282290142486"
                            >
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 24 24"
                                    className="text-2xl"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
                                </svg>
                                <p>+6282290142486</p>
                            </a>
                        </div>
                    </div>
                    <div className="flex w-full flex-wrap gap-8 md:w-2/3 md:flex-nowrap">
                        <div className="flex w-2/5 flex-col gap-4 md:w-1/3">
                            <h2 className="mb-2 font-bold">Program</h2>
                            <a
                                className="w-fit text-neutral-400 hover:text-neutral-200"
                                href="/course"
                            >
                                Online Course
                            </a>
                            <a
                                className="w-fit text-neutral-400 hover:text-neutral-200"
                                href="/#"
                            >
                                Bootcamp
                            </a>
                            <a
                                className="w-fit text-neutral-400 hover:text-neutral-200"
                                href="/#"
                            >
                                Corporate Training
                            </a>
                        </div>
                        <div className="flex w-2/5 flex-col gap-4 md:w-1/3">
                            <h2 className="mb-2 font-bold">Company</h2>
                            <a
                                className="w-fit text-neutral-400 hover:text-neutral-200"
                                href="/about"
                            >
                                Tentang Kami
                            </a>
                            <a
                                className="w-fit text-neutral-400 hover:text-neutral-200"
                                href="https://discord.gg/wpu"
                            >
                                Komunitas
                            </a>
                            <a
                                className="w-fit text-neutral-400 hover:text-neutral-200"
                                href="/#"
                            >
                                Karir
                            </a>
                        </div>
                        <div className="flex w-2/5 flex-col gap-4 md:w-1/3">
                            <h2 className="mb-2 font-bold">Support</h2>
                            <a
                                className="w-fit text-neutral-400 hover:text-neutral-200"
                                href="/contact"
                            >
                                Hubungi Kami
                            </a>
                            <a
                                className="w-fit text-neutral-400 hover:text-neutral-200"
                                href="/terms-condition"
                            >
                                Syarat dan Ketentuan
                            </a>
                            <a
                                className="w-fit text-neutral-400 hover:text-neutral-200"
                                href="/privacy-policy"
                            >
                                Kebijakan Privasi
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col-reverse justify-between gap-4 border-t-2 border-neutral-700 pt-4 md:flex-row lg:items-center">
                    <p className="text-sm text-neutral-400">
                        Mohamad Fiqriansyah Panu
                    </p>
                    <div className="flex gap-4">
                        <a
                            className="text-3xl text-neutral-400 hover:text-neutral-200"
                            target="_blank"
                            href="https://instagram.com/bpkhtlxvgorontalo"
                        >
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 448 512"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
