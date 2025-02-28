import NavbarLogo from "@/Components/ui/navbar-logo";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { PropsWithChildren, ReactNode } from "react";

interface PropsTemplate {
    title: string;
    subtitle: string;
}

export default function TemplateAuth({ children, title, subtitle }: PropsWithChildren<PropsTemplate>) {
    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="absolute flex justify-center gap-2 md:justify-start">
                        <NavbarLogo />
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-2xl">
                            <div className="space-y-2 mb-5">
                                <h1 className="text-4xl font-bold text-gray-800">
                                    {title}
                                </h1>
                                <p className="text-balance text-muted-foreground">
                                    {subtitle}
                                </p>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
                <div className="relative hidden lg:block p-5">
                    <div className="bg-gray-50 h-full w-full rounded-xl flex items-center justify-center">
                        <img
                            src="/kehutanan-logo.png"
                            alt="Image"
                            className="w-[35rem] h-auto object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
