import InputError from "@/Components/InputError";
// import Label from "@/Components/Label";
import PrimaryButton from "@/Components/PrimaryButton";
import NavbarLogo from "@/Components/ui/navbar-logo";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import TemplateAuth from "./Template/TemplateAuth";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <TemplateAuth
                title={"Daftar"}
                subtitle={"Selamat Datang di BPKHTL!"}
            >
                <form onSubmit={submit}>
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            className="bg-gray-100 border-0 focus-visible:border-0 rounded-xl"
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4 space-y-1">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="bg-gray-100 border-0 focus-visible:border-0 rounded-xl"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4 space-y-1">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="bg-gray-100 border-0 focus-visible:border-0 rounded-xl"
                            autoComplete="new-password"
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

                    <div className="mt-4 space-y-1">
                        <Label htmlFor="password_confirmation">
                            Konfirmasi Password
                        </Label>

                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="bg-gray-100 border-0 focus-visible:border-0 rounded-xl"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-8 space-y-6">
                        <Button
                            disabled={processing}
                            className="w-full rounded-xl text-md bg-sirisa-primary hover:bg-sirisa-primary/80"
                        >
                            Daftar
                        </Button>
                        <div className="text-center text-md text-gray-800">
                            Sudah mendaftar?{" "}
                            <Link
                                href={route("login")}
                                className="underline underline-offset-4"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </TemplateAuth>
        </GuestLayout>
    );
}
