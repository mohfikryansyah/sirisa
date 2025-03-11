"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/Components/ui/infinite-moving-cards";
import { Complaint } from "@/types";

export function HistoryLaporan({ complaints }: { complaints: Complaint[] }) {
    return (
        <section id="riwayat" className="w-full px-4 mt-20">
           <h1 className="text-center text-4xl font-bold text-sirisa-primary">
                    Riwayat Laporan
                </h1>
                <p className="text-center  text-xl mt-3">
                    "Catatan lengkap semua laporan yang telah diajukan"
                </p>
            <div className="pt-10 rounded-md flex flex-col antialiased dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                <InfiniteMovingCards
                    items={complaints}
                    direction="right"
                    speed="slow"
                />
            </div>
        </section>
    );
}
