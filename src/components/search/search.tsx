import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { useSearchShortcut } from "../../utils/hooks/useSearchShortcut";

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};
const SearchBar: FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const { searchFocusRef } = useSearchShortcut();

  return (
    <div className="w-full  max-w-[400px]">
      <label htmlFor="search" className="block text-sm font-bold text-gray-700">
        Quick search
      </label>
      <div className="relative mt-1   flex  items-center">
        <input
          type="text"
          name="search"
          value={searchTerm}
          id="search"
          ref={searchFocusRef}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          className="block w-full rounded-md border  pr-12 shadow-md focus:border-gray-600 focus:ring-gray-600 sm:text-sm"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
