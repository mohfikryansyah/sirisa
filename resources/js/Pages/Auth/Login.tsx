"use client";

import { Checkbox } from "@/Components/ui/checkbox";
import InputError from "@/Components/InputError";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import NavbarLogo from "@/Components/ui/navbar-logo";
import TemplateAuth from "./Template/TemplateAuth";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <TemplateAuth
                title={"Masuk"}
                subtitle={"Selamat Datang di BPKHTL!"}
            >
                <form onSubmit={submit} className={cn("flex flex-col gap-6")}>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            className="bg-gray-100 border-0 focus-visible:border-0 rounded-xl"
                            placeholder="m@example.com"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href={route("password.request")}
                                className="ml-auto text-sm underline-offset-2 hover:underline"
                            >
                                Lupa password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            className="bg-gray-100 border-0 focus-visible:border-0 rounded-xl"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onCheckedChange={(checked: boolean) =>
                                setData("remember", checked)
                            }
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Ingat saya
                        </label>
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-xl text-md bg-sirisa-primary hover:bg-sirisa-primary/80"
                    >
                        Masuk
                    </Button>
                </form>
                <div className="relative my-7 flex items-center justify-center">
                    <div className="h-[2px] z-0 absolute w-full bg-gray-100"></div>
                    <div className="bg-white z-10 px-3">Atau</div>
                </div>

                <a href={route("auth.google")}>
                    <Button className="w-full rounded-xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            className="block"
                        >
                            <path
                                fill="#EA4335"
                                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                            ></path>
                            <path
                                fill="#4285F4"
                                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                            ></path>
                            <path
                                fill="#FBBC05"
                                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                            ></path>
                            <path
                                fill="#34A853"
                                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                            ></path>
                            <path fill="none" d="M0 0h48v48H0z"></path>
                        </svg>
                        Masuk dengan Akun Google
                    </Button>
                </a>
            </TemplateAuth>
        </GuestLayout>
    );
}
