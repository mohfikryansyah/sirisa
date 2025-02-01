import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Contact2, HomeIcon, LogInIcon, Map } from "lucide-react";
import { Link } from "@inertiajs/react";

const navbar = [
    {
        url: "#",
        label: "Home",
    },
    {
        url: "#about",
        label: "About",
    },
    {
        url: "#whyus",
        label: "WhyUs",
    },
    {
        url: "#",
        label: "About",
    },
];

export default function Main({ children }: PropsWithChildren) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return (
        <div className="relative">
            {isDesktop ? (
                <Navbar navbar={navbar}/>
            ) : (
                <>
                    <Navbar navbar={navbar}/>
                    <div className="fixed z-[100] bottom-0 w-full p-5 bg-white border-t border-gray-200">
                        <div className="flex items-center justify-center">
                            <ul className="flex justify-around w-full gap-4">
                                <li>
                                    <Link href="/" className="text-white">
                                        <HomeIcon className="text-stone-800" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#about" className="text-white">
                                        <Contact2 className="text-stone-800" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-white">
                                        <Map className="text-stone-800" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route("login")} className="text-white">
                                        <LogInIcon className="text-stone-800" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
            <main>{children}</main>
        </div>
    );
}
