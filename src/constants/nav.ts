import {
    HomeIcon, FolderIcon, PencilSquareIcon, TrashIcon, Cog8ToothIcon,
    ArrowLeftOnRectangleIcon, LinkIcon
} from '@heroicons/react/24/outline'

export type INavItem = {
    id: string;
    toolTip: string;
    Icon: (props: React.ComponentProps<'svg'>) => JSX.Element
    href?: string;
    onClick?: () => void;
};


export const navItems: INavItem[] = [
    {
        id: 'home',
        toolTip: "Home",
        Icon: HomeIcon,
        href: "/",

    },
    {
        id: 'addFolder',
        toolTip: "Add Folder",
        Icon: FolderIcon,
        href: "/add-folder",

    },
    {
        id: 'edit',
        toolTip: "Drag item to Edit",
        Icon: PencilSquareIcon,
        href: "/edit",

    },
    {
        id: 'addLink',
        toolTip: "Add Link",
        Icon: LinkIcon,
        href: "/add-link",

    },
    // {
    //     id: 'settings',
    //     toolTip: "Settings",
    //     Icon: Cog8ToothIcon,
    //     href: "/settings",

    // },
    {
        id: 'delete',
        toolTip: "Drag item to Delete",
        Icon: TrashIcon,
        href: "/",

    },
];

export const logoutMenuItem: INavItem = {
    toolTip: "Logout",
    Icon: ArrowLeftOnRectangleIcon,
    href: "/",
    id: 'logout'
}