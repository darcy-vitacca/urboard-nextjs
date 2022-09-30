import { HomeIcon, FolderIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

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