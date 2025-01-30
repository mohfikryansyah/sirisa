import { Link } from "@inertiajs/react";

export default function NavbarLogo({logoRef}: {logoRef?: any}) {
    return (
        <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
        >
            <img
                src="/kehutanan-logo.png"
                className="w-9 h-auto"
                alt="Flowbite Logo"
            />
            <div ref={logoRef} className="-space-y-1 text-neutral-700">
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
