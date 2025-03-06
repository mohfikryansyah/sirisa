import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

export default function NavbarLogo({
    logoRef,
    textColor,
    backgroundLogo,
}: {
    logoRef?: any;
    textColor?: string;
    backgroundLogo?: string;
}) {
    return (
        <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
        >
            <div className={backgroundLogo}>
                <img
                    src="/kehutanan-logo.png"
                    className="w-9 h-auto"
                    alt="Flowbite Logo"
                />
            </div>
            <div
                ref={logoRef}
                className={cn("-space-y-1 text-neutral-700", textColor)}
            >
                <p className="self-center text-xl font-bold whitespace-nowrap">
                    BPKHTL XV
                </p>
                <p className="self-center text-md font-bold whitespace-nowrap">
                    GORONTALO
                </p>
            </div>
        </Link>
    );
}
