import { Link, usePage } from "@inertiajs/react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { MenuIcon } from "lucide-react";
import { PageProps } from "@/types";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import NavbarLogo from "@/Components/ui/navbar-logo";

export default function Navbar({navbar}: {navbar: {label: string, url: string}[]}) {
    const { auth } = usePage<PageProps>().props;
    const [scrollY, setScrollY] = useState<number>(0);
    const navbarRef = useRef<HTMLElement | null>(null);
    const navbarItemRef = useRef<HTMLDivElement | null>(null);
    const logoRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = (): void => {
            const scrollY = window.scrollY;
            setScrollY(scrollY);
            const navbar = navbarRef.current;
            const navbarItem = navbarItemRef.current;
            if (navbar) {
                if (scrollY > 0) {
                    navbarItem?.classList.add("max-w-7xl");
                    navbarItem?.classList.remove("max-w-for-monitor");
                    navbar.classList.add("bg-white", "py-1", "shadow-md");
                    navbar.classList.remove("mt-3");
                } else {
                    navbarItem?.classList.remove("max-w-7xl");
                    navbarItem?.classList.add("max-w-for-monitor");
                    navbar.classList.add("mt-3");
                    navbar.classList.remove("bg-white", "py-1", "shadow-md");
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            ref={navbarRef}
            className={cn(
                "fixed w-full z-[121] top-0 lg:px-12 px-6 duration-300 transition-all mt-3"
            )}
        >
            <div
                ref={navbarItemRef}
                className="max-w-for-monitor flex flex-wrap items-center justify-between mx-auto py-3 duration-300 transition-all"
            >
                <NavbarLogo logoRef={logoRef} />

                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="md:hidden bg-transparent"
                        >
                            <MenuIcon className="h-6 w-6 text-gray-800" />
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                        <SheetHeader>
                            <SheetTitle>
                                <Link
                                    href="/"
                                    className="flex items-center space-x-3 text-left rtl:space-x-reverse"
                                >
                                    <img
                                        src="/kehutanan-logo.png"
                                        className="w-9 h-auto"
                                        alt="Flowbite Logo"
                                    />
                                    <div
                                        ref={logoRef}
                                        className="-space-y-1 text-neutral-700"
                                    >
                                        <p className="self-center text-xl font-bold whitespace-nowrap">
                                            BPKHTL XV
                                        </p>
                                        <p className="self-center text-md font-bold whitespace-nowrap">
                                            GORONTALO
                                        </p>
                                    </div>
                                </Link>
                            </SheetTitle>
                            <SheetDescription>
                                <ul className="font-medium flex flex-col items-center p-4 mt-4 border-gray-100 rounded-lg rtl:space-x-reverse text-lg space-y-8">
                                    {navbar.map((nav, index) => (
                                        <li key={index}>
                                            <a
                                                href={nav.url}
                                                className="block text-neutral-500 font-semibold hover:text-blue-400 transition-all duration-300"
                                                aria-current="page"
                                            >
                                                {nav.label}
                                            </a>
                                        </li>
                                    ))}
                                    <li className="text-neutral-500 font-semibold">
                                        {auth.user ? (
                                            <Link href={route("dashboard")}>
                                                <Button
                                                    variant={"default"}
                                                    className="bg-sirisa-primary active:scale-90 duration-300 transition-all text-lg hover:bg-sirisa-primary/80"
                                                >
                                                    Dashboard
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Link href={route("login")}>
                                                <Button
                                                    variant={"default"}
                                                    className="bg-sirisa-primary active:scale-90 duration-300 transition-all text-lg hover:bg-sirisa-primary/80"
                                                >
                                                    Login
                                                </Button>
                                            </Link>
                                        )}
                                    </li>
                                </ul>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>

                <div
                    className="hidden w-full md:block md:w-auto"
                    id="navbar-default"
                >
                    <ul
                        className={cn(
                            "font-medium -ml-[7rem] flex flex-col items-center p-4 md:py-1 mt-4 border border-gray-100 rounded-lg bg-gray-800 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent text-lg text-gray-50"
                        )}
                    >
                        {navbar.map((nav, index) => (
                            <li key={index}>
                                <a
                                    href={nav.url}
                                    className="block text-neutral-500 font-semibold rounded md:bg-transparent md:p-0 hover:text-blue-400 transition-all duration-300"
                                    aria-current="page"
                                >
                                    {nav.label}
                                </a>
                            </li>
                        ))}
                        <li className="text-neutral-500 font-semibold">
                            {auth.user ? (
                                <Link href={route("dashboard")}>
                                    <Button
                                        variant={"default"}
                                        className="bg-sirisa-primary active:scale-90 duration-300 transition-all text-lg hover:bg-sirisa-primary/80"
                                    >
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <Link href={route("login")}>
                                    <Button
                                        variant={"default"}
                                        className="bg-sirisa-primary active:scale-90 duration-300 transition-all text-lg hover:bg-sirisa-primary/80"
                                    >
                                        Login
                                    </Button>
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
