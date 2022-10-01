import {
    HomeIcon, FolderIcon, PencilSquareIcon, TrashIcon, Cog8ToothIcon,
    ArrowLeftOnRectangleIcon, LinkIcon
} from '@heroicons/react/24/outline'

export type INavItem = {
    toolTip: string;
    Icon: (props: React.ComponentProps<'svg'>) => JSX.Element
    href: string;
};


export const navItems: INavItem[] = [
    {
        toolTip: "Home",
        Icon: HomeIcon,
        href: "/"
    },
    {
        toolTip: "Add Folder",
        Icon: FolderIcon,
        href: "/add-folder"
    },
    {
        toolTip: "Add Link",
        Icon: LinkIcon,
        href: "/add-link"
    },
    {
        toolTip: "Edit",
        Icon: PencilSquareIcon,
        href: "/edit"
    },
    {
        toolTip: "Delete",
        Icon: TrashIcon,
        href: "/"
    },
    {
        toolTip: "Settings",
        Icon: Cog8ToothIcon,
        href: "/settings"
    },
];

export const logoutMenuItem: INavItem = {
    toolTip: "Logout",
    Icon: ArrowLeftOnRectangleIcon,
    href: "/"
}