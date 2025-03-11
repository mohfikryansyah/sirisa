import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Contact2, HomeIcon, LogInIcon, Map } from "lucide-react";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const navbar = [
    {
        url: "/",
        label: "Beranda",
    },
    {
        url: "#whyus",
        label: "Statistik",
    },
    {
        url: "#risiko",
        label: "Risiko",
    },
    // {
    //     url: "#",
    //     label: "About",
    // },
];

type PageProps = {
    className?: string;
    navbarClassName?: string;
    textColor?: string;
    backgroundLogo?: string;
};

export default function Main({ children, className, navbarClassName, textColor, backgroundLogo }: PropsWithChildren<PageProps>) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const isMobile = useIsMobile()

    return (
        <div className={cn("relative", !isMobile && "h-screen")}>
            {isDesktop ? (
                <Navbar navbar={navbar} navbarClassName={navbarClassName} textColor={textColor} backgroundLogo={backgroundLogo} />
            ) : (
                <>
                    <Navbar navbar={navbar}/>
                    <div className={cn("fixed z-[100] bottom-0 w-full p-5 bg-white border-t border-gray-200")}>
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
            <main className={cn("flex flex-col flex-1 mb-20", className)}>{children}</main>
        </div>
    );
}
