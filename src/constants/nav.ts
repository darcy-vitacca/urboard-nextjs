import { HomeIcon, FolderIcon, PencilSquareIcon, TrashIcon, Cog8ToothIcon } from '@heroicons/react/24/outline'

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
        toolTip: "Settings",
        Icon: Cog8ToothIcon,
        href: "/settings"
    },
    {
        toolTip: "Add Folder",
        Icon: FolderIcon,
        href: "/add-folder"
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
];

export const logoutMenuItem: INavItem = {
    toolTip: "Logout",
    Icon: HomeIcon,
    href: "/"
}