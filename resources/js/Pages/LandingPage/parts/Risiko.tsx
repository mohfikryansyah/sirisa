import { ExpandableCardDemo } from "../Risiko/ExpandableCard";

export default function Risiko() {
    return (
        <section id="risiko" className="w-full py-20 px-4">
            <div className="relative max-w-for-monitor rounded-3xl h-auto mx-auto bg-gradient-to-r from-[#187f80] to-[#14a89c] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center z-0">
                    <img
                        src="kehutanan-logo.png"
                        className="w-80 h-auto grayscale opacity-20"
                        alt="Kehutanan Logo"
                    />
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#187f80] rounded-full opacity-20"></div>
                <div className="absolute -bottom-28 left-10 w-40 h-40 bg-[#14a89c] rounded-full opacity-20"></div>
                <div className="relative w-full h-full py-14">
                    <div className="text-white">
                        <h1 className="mb-4 text-center text-2xl font-extrabold lg:text-4xl">
                            Kenapa Harus Memahami Risiko?
                        </h1>
                        <p className="mx-auto w-full text-center text-white/65 lg:w-2/3 lg:text-lg">
                            Dengan memahami risiko, kita dapat mengambil langkah
                            pencegahan untuk menghindari kerugian.
                        </p>
                        <div className="pt-10 md:px-0 px-3">
                            <ExpandableCardDemo />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
