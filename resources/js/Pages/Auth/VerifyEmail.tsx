import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import TemplateAuth from "./Template/TemplateAuth";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <TemplateAuth
                title={"Verifikasi"}
                subtitle={"Pastikan Anda menggunakan email yang aktif!"}
            >
                <div className="mb-4 text-sm text-gray-600">
                    Terima kasih telah mendaftar! Sebelum memulai, bisakah Anda
                    memverifikasi alamat email Anda dengan mengklik tautan yang
                    baru saja kami kirim ke email Anda? Jika Anda tidak menerima
                    emailnya, kami akan dengan senang hati mengirimkannya lagi.
                </div>

                {status === "verification-link-sent" && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        Tautan verifikasi baru telah dikirim ke alamat email
                        yang Anda berikan saat pendaftaran.
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="mt-4 flex items-center justify-between">
                        <PrimaryButton disabled={processing}>
                            Kirim Ulang Email Verifikasi
                        </PrimaryButton>

                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Log Out
                        </Link>
                    </div>
                </form>
            </TemplateAuth>
        </GuestLayout>
    );
}
