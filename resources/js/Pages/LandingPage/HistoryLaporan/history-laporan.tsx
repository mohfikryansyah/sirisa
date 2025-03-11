"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/Components/ui/infinite-moving-cards";
import { Complaint } from "@/types";

export function HistoryLaporan({ complaints }: { complaints: Complaint[] }) {
    return (
        <section className="w-full px-4 mt-20">
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

const testimonials = [
    {
        quote: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
        name: "Charles Dickens",
        title: "A Tale of Two Cities",
    },
    {
        quote: "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
        name: "William Shakespeare",
        title: "Hamlet",
    },
    {
        quote: "All that we see or seem is but a dream within a dream.",
        name: "Edgar Allan Poe",
        title: "A Dream Within a Dream",
    },
    {
        quote: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
        name: "Jane Austen",
        title: "Pride and Prejudice",
    },
    {
        quote: "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
        name: "Herman Melville",
        title: "Moby-Dick",
    },
];
