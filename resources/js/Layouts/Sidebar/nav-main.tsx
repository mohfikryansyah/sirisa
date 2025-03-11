"use client";

import {
    CheckCircle,
    ChevronRight,
    Cross,
    LayoutGrid,
    type LucideIcon,
} from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/Components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";
import { hasRole } from "@/helpers";

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon: LucideIcon;
        isActive?: boolean;
        roles?: string[];
        items?: {
            isActive?: boolean;
            title: string;
            url: string;
        }[];
    }[];
}) {
    const url = window.location.href;

    const user = usePage().props.auth.user;

    return (
        <SidebarGroup>
            <SidebarMenu>
                {items
                    .filter(
                        (item) =>
                            !item.roles ||
                            item.roles.some((role) => hasRole(user, role))
                    )
                    .map((item) => {
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    {...(url === item.url
                                        ? { isActive: true }
                                        : {})}
                                >
                                    <a href={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
