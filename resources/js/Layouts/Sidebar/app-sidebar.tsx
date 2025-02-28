"use client";

import * as React from "react";
import {
    BookOpen,
    Bot,
    CheckCircle,
    Command,
    Frame,
    LayoutGrid,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/Layouts/Sidebar/nav-main";
import { NavProjects } from "@/Layouts/Sidebar/nav-projects";
import { NavSecondary } from "@/Layouts/Sidebar/nav-secondary";
import { NavUser } from "@/Layouts/Sidebar/nav-user";
import { Link, usePage } from "@inertiajs/react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: route("dashboard"),
            icon: LayoutGrid,
        },
        {
            title: "Pengaturan Akun",
            url: route("profile.edit"),
            icon: SquareTerminal,
        },
        {
            title: "Data Peta",
            url: route("geo-location.index"),
            icon: Map,
        },
        {
            title: "Data Pengaduan",
            url: route("complaint.index"),
            icon: CheckCircle,
        }
    ],
    navSecondary: [
        {
            title: "Support",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "Feedback",
            url: "#",
            icon: Send,
        },
    ],
    projects: [
        {
            name: "Lokasi APJ Kota Gorontalo",
            url: "#",
            icon: Frame,
        },
        {
            name: "Lokasi Panel Kota Gorontalo",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Lokasi MAKAM Kota Gorontalo",
            url: "#",
            icon: Map,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { url } = usePage();

    const isActive = (item: any) => {
        if (item.url === url || item.url === route("dashboard")) {
            return true;
        }

        return item.items?.some(
            (subItem: any) =>
                subItem.url === url || subItem.url === route("dashboard")
        );
    };

    return (
        <Sidebar
            variant="inset"
            {...props}
            className="bg-stone-700 text-white"
        >
            <SidebarHeader className="bg-stone-700 text-slate-900">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="bg-white rounded-lg">
                            <Link href="/">
                                <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-transparent text-sidebar-primary-foreground">
                                    <img
                                        src="/kehutanan-logo.png"
                                        className="h-9"
                                        alt="Logo Kementerian Kehutanan"
                                    />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate uppercase font-semibold">
                                        BPKHTL XV
                                    </span>
                                    <span className="truncate text-xs">
                                        Gorontalo
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="bg-stone-700 text-white">
                <NavMain items={data.navMain} />
                {/* <NavProjects projects={data.projects} />
                <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
            </SidebarContent>
            <SidebarFooter className="bg-stone-700 text-white">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
