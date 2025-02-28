export interface User {
    id: number;
    name: string;
    avatar: string;
    email: string;
    email_verified_at?: string;
}

export type Coordinates = {
    lat: number;
    lng: number;
};

export interface Item {
    id: number;
    name: string;
    description: string;
    stock: number;
}

export interface ComplaintStatus {
    id: number;
    complaint_id: number;
    status: string;
    note: string;
}

export interface ComplaintFile {
    id: number;
    file_path: string;    
}

export interface Complaint {
    id: number;
    name: string;
    message: string;
    latitude: number;
    longitude: number;
    audio: string;
    files: ComplaintFile[];
    statuses: ComplaintStatus;
    created_at: string;
    created_at_formatted: string;
}

export interface Repair {
    id: number;
    user: User[];
    item: Item[];
    complaint: Complaint[];
    latitude: number;
    longitude: number;
    note: string;
    created_at: string;
}

export interface Status {
    value: string;
    label: string;
    icon: LucideIcon;
    color: string;
};

export interface PopupMap {
    position: [number, number];
    type: "banjir" | "tanahLongsor" | "gempa" | "gelombang";
    category: string;
    sumber: string;
}

export interface GeoLocation {
    id: number;
    title: string;
    path: string;
    geo_json_data: any;
    created_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
