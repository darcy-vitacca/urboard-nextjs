

export const filterSearch = ({ data, searchTerm }: {
    data:
    // should be folder or link
    any, searchTerm: string | null
}): any[] => data?.filter((folder) => {
    return folder.name.toLowerCase().includes(searchTerm?.toLowerCase());
});