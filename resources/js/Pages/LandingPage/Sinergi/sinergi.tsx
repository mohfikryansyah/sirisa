export default function Sinergi() {
    return (
        <section id="sinergy" className="w-full px-4">
            <div className="max-w-for-monitor mx-auto">
                <h1 className="text-center text-4xl font-bold text-sirisa-primary">
                    Sinergi BPKHTL
                </h1>
                <div className="max-w-3xl mx-auto">

                <p className="text-center  text-xl mt-3">
                    "Membangun Sinergi Antar Lembaga untuk Mengoptimalkan Peran
                    BPKHTL dalam Pengelolaan Hutan yang Berkelanjutan"
                </p>
                </div>
                <div className="flex md:flex-row flex-col items-center justify-center gap-4 mt-10">
                    <a href="https://gorontalo.basarnas.go.id/" target="_blank">
                        <div className="rounded-xl border flex items-center justify-center w-[300px] py-5 duration-300 gap-3">
                            <img
                                src="/sinergi/basarnas.png"
                                className="h-20"
                                alt=""
                            />
                            <h1 className="text-orange-400 font-semibold text-2xl">
                                BASARNAS
                            </h1>
                        </div>
                    </a>
                    <a href="https://bpbd.bonebolangokab.go.id/" target="_blank">
                        <div className="rounded-xl border flex items-center justify-center w-[300px] py-5 duration-300 gap-3">
                            <img
                                src="/sinergi/bpbd.png"
                                className="h-20"
                                alt=""
                            />
                            <h1 className="text-orange-400 font-semibold text-2xl">
                                BPBD
                            </h1>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
