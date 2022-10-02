import { useSearchShortcut } from "../../utils/hooks/useSearchShortcut";

export default function SearchBar() {
  const { searchFocusRef } = useSearchShortcut();

  return (
    <div className="w-full  max-w-[400px]">
      <label
        htmlFor="search"
        className="block text-sm font-medium text-gray-700"
      >
        Quick search
      </label>
      <div className="relative mt-1   flex  items-center">
        <input
          type="text"
          name="search"
          id="search"
          ref={searchFocusRef}
          className="block w-full rounded-md border-gray-200 pr-12 shadow-md focus:border-gray-600 focus:ring-gray-600 sm:text-sm"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  );
}
