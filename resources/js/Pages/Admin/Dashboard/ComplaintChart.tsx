"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/Components/ui/chart";
import { Complaint } from "@/types";

const chartConfig = {
    belumDiproses: {
        label: "Belum diproses",
        color: "hsl(var(--chart-4))",
    },
    sedangDiproses: {
        label: "Sedang diproses",
        color: "hsl(var(--chart-5))",
    },
    selesaiDiproses: {
        label: "Selesai diproses",
        color: "hsl(var(--chart-2))",
    },
    ditolak: {
        label: "Ditolak",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export default function ComplaintChart({
    complaints,
}: {
    complaints: Complaint[];
}) {
    const currentYear = new Date().getFullYear();

    const complaintsChartData = complaints
        .filter(
            (complaint) =>
                new Date(complaint.created_at).getFullYear() === currentYear
        )
        .reduce((acc, complaint) => {
            const date = new Date(complaint.created_at);
            const month = date.toLocaleString("id-ID", { month: "long" });

            if (!acc[month]) {
                acc[month] = {
                    month,
                    belumDiproses: 0,
                    sedangDiproses: 0,
                    selesaiDiproses: 0,
                    ditolak: 0,
                };
            }

            switch (complaint.statuses.status) {
                case "Belum diproses":
                    acc[month].belumDiproses += 1;
                    break;
                case "Sedang diproses":
                    acc[month].sedangDiproses += 1;
                    break;
                case "Selesai diproses":
                    acc[month].selesaiDiproses += 1;
                    break;
                case "Pengaduan ditolak":
                    acc[month].ditolak += 1;
                    break;
            }

            return acc;
        }, {} as Record<string, { month: string; belumDiproses: number; sedangDiproses: number; selesaiDiproses: number; ditolak: number }>);

    const monthOrder = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    const chartData = Object.values(complaintsChartData).sort(
        (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    );

    const monthsDisplayed = chartData.map((data) => data.month);
    const firstMonth = monthsDisplayed[0];
    const lastMonth = monthsDisplayed[monthsDisplayed.length - 1];

    const lastMonthData = chartData[chartData.length - 1] || { 
        belumDiproses: 0, 
        sedangDiproses: 0, 
        selesaiDiproses: 0, 
        ditolak: 0 
    };
    
    const prevMonthData = chartData[chartData.length - 2] || { 
        belumDiproses: 0, 
        sedangDiproses: 0, 
        selesaiDiproses: 0, 
        ditolak: 0 
    };

    const totalLastMonth =
        lastMonthData.belumDiproses +
        lastMonthData.sedangDiproses +
        lastMonthData.selesaiDiproses +
        lastMonthData.ditolak;

    const totalPrevMonth =
        prevMonthData.belumDiproses +
        prevMonthData.sedangDiproses +
        prevMonthData.selesaiDiproses +
        prevMonthData.ditolak;

    const percentageChange =
        totalPrevMonth === 0
            ? 100
            : ((totalLastMonth - totalPrevMonth) / totalPrevMonth) * 100;

    const trendText =
        percentageChange > 0
            ? `Meningkat ${percentageChange.toFixed(1)}%`
            : percentageChange < 0
            ? `Menurun ${Math.abs(percentageChange).toFixed(1)}%`
            : "Tidak ada perubahan";

    return (
        <Card className="max-w-screen-md">
            <CardHeader>
                <CardTitle>Diagram Laporan Kejadian</CardTitle>
                <CardDescription>
                    {chartData.length > 0
                        ? `${chartData[0].month} - ${
                              chartData[chartData.length - 1].month
                          } ${new Date().getFullYear()}`
                        : "Tidak ada data"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Line
                            dataKey="belumDiproses"
                            type="monotone"
                            stroke="var(--color-belumDiproses)"
                            strokeWidth={2}
                            dot={false}
                            label="TEs"
                        />
                        <Line
                            dataKey="sedangDiproses"
                            type="monotone"
                            stroke="var(--color-sedangDiproses)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="selesaiDiproses"
                            type="monotone"
                            stroke="var(--color-selesaiDiproses)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="ditolak"
                            type="monotone"
                            stroke="var(--color-ditolak)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            {trendText} pada bulan {lastMonth}{" "}
                            <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Menampilkan total laporan dari {firstMonth} -{" "}
                            {lastMonth} {currentYear}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
