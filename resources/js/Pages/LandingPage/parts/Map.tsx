import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import $ from "jquery";

export default function UsaPopulationMap() {
    const chartRef = useRef<HTMLDivElement>(null);
    const ROOT_PATH = `${window.location.origin}/geojson`;

    useEffect(() => {
        if (!chartRef.current) return;

        const chartInstance = echarts.init(chartRef.current);

        chartInstance.showLoading();

        // Fetch the map JSON data
        $.get(`${ROOT_PATH}/gempa.geojson`, function (usaJson: any) {
            chartInstance.hideLoading();

            echarts.registerMap("USA", usaJson, {
                Alaska: {
                    left: -131,
                    top: 25,
                    width: 15,
                },
                Hawaii: {
                    left: -110,
                    top: 28,
                    width: 5,
                },
                "Puerto Rico": {
                    left: -76,
                    top: 26,
                    width: 2,
                },
            });

            const option: echarts.EChartsOption = {
                title: {
                    text: "USA Population Estimates (2012)",
                    subtext: "Data from www.census.gov",
                    sublink: "http://www.census.gov/popest/data/datasets.html",
                    left: "right",
                },
                tooltip: {
                    trigger: "item",
                    showDelay: 0,
                    transitionDuration: 0.2,
                },
                visualMap: {
                    left: "right",
                    min: 0,
                    max: 5,
                    inRange: {
                        color: [
                            "#313695",
                            "#4575b4",
                            "#74add1",
                            "#abd9e9",
                            "#e0f3f8",
                            "#ffffbf",
                            "#fee090",
                            "#fdae61",
                            "#f46d43",
                            "#d73027",
                            "#a50026",
                        ],
                    },
                    text: ["High", "Low"],
                    calculable: true,
                },
                toolbox: {
                    show: true,
                    left: "left",
                    top: "top",
                    feature: {
                        dataView: { readOnly: false },
                        restore: {},
                        saveAsImage: {},
                    },
                },
                series: [
                    {
                        name: "USA PopEstimates",
                        type: "map",
                        roam: true,
                        map: "USA",
                        emphasis: {
                            label: {
                                show: true,
                            },
                        },
                        data: [
                            { name: "Alabama", value: 4 },
                            { name: "Alaska", value: 1 },
                            { name: "Arizona", value: 1 },
                            { name: "Arkansas", value: 1 },
                            { name: "California", value: 1 },
                            { name: "Colorado", value: 993248204 },
                            { name: "Connecticut", value: 1 },
                            { name: "Delaware", value: 1 },
                            { name: "District of Columbia", value: 1 },
                            { name: "Florida", value: 1 },
                            { name: "Georgia", value: 1 },
                            { name: "Hawaii", value: 1 },
                            { name: "Idaho", value: 1 },
                            { name: "Illinois", value: 1 },
                            { name: "Indiana", value: 1 },
                            { name: "Iowa", value: 1 },
                            { name: "Kansas", value: 1 },
                            { name: "Kentucky", value: 1 },
                            { name: "Louisiana", value: 1 },
                            { name: "Maine", value: 1 },
                            { name: "Maryland", value: 1 },
                            { name: "Massachusetts", value: 1 },
                            { name: "Michigan", value: 1 },
                            { name: "Minnesota", value: 1 },
                            { name: "Mississippi", value: 1 },
                            { name: "Missouri", value: 1 },
                            { name: "Montana", value: 1 },
                            { name: "Nebraska", value: 1 },
                            { name: "Nevada", value: 1 },
                            { name: "New Hampshire", value: 1 },
                            { name: "New Jersey", value: 1 },
                            { name: "New Mexico", value: 1 },
                            { name: "New York", value: 1 },
                            { name: "North Carolina", value: 1 },
                            { name: "North Dakota", value: 1 },
                            { name: "Ohio", value: 1 },
                            { name: "Oklahoma", value: 1 },
                            { name: "Oregon", value: 1 },
                            { name: "Pennsylvania", value: 1 },
                            { name: "Rhode Island", value: 1 },
                            { name: "South Carolina", value: 1 },
                            { name: "South Dakota", value: 1 },
                            { name: "Tennessee", value: 1 },
                            { name: "Texas", value: 1 },
                            { name: "Utah", value: 1 },
                            { name: "Vermont", value: 1 },
                            { name: "Virginia", value: 1 },
                            { name: "Washington", value: 1 },
                            { name: "West Virginia", value: 1 },
                            { name: "Wisconsin", value: 1 },
                            { name: "Wyoming", value: 1 },
                            { name: "Puerto Rico", value: 1 },
                        ],
                    },
                ],
            };

            chartInstance.setOption(option);
        });

        return () => {
            chartInstance.dispose();
        };
    }, []);

    return <div id="map" ref={chartRef} className="max-w-for-monitor h-[45rem] mx-auto py-20" />;
}
