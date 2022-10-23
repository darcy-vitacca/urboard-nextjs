import { Link } from "./link";

export type Folder = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    name: string;
    imageUrl: string | null;
    links: Link[];
    linkOrders: LinkOrder[]
};


export type LinkOrder = {
    id: string
    createdAt: Date
    updatedAt: Date
    folderId: string
    order: string[]
}