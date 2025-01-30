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
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <NavbarLogo/>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-2xl">
                            <form
                                onSubmit={submit}
                                className={cn("flex flex-col gap-6")}
                            >
                                <div className="space-y-7">
                                    <div className="space-y-2">
                                        <h1 className="text-4xl font-bold text-gray-800">
                                            Masuk
                                        </h1>
                                        <p className="text-balance text-muted-foreground">
                                            Selamat Datang di BPKHTL!
                                        </p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                className="bg-gray-100 border-0 focus-visible:border-0 rounded-xl"
                                                placeholder="m@example.com"
                                                value={data.email}
                                                autoFocus
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.email}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">
                                                    Password
                                                </Label>
                                                <Link
                                                    href={route(
                                                        "password.request"
                                                    )}
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
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.password}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onCheckedChange={(
                                                checked: boolean
                                            ) => setData("remember", checked)}
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
                                    <div className="text-center text-md text-gray-800">
                                        Belum punya akun?{" "}
                                        <Link
                                            href={route("register")}
                                            className="underline underline-offset-4"
                                        >
                                            Hubungi Admin
                                        </Link>
                                    </div>
                                </div>
                            </form>
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
