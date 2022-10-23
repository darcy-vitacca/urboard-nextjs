import { FC } from "react";
import { useRouter } from "next/router";
import { useFolder } from "../../utils/hooks/useFolder";
import { LinkCard } from "../../components/link/link";
import { useLinks } from "../../utils/hooks/useLinks";
import { NextPage } from "next";

const FolderPage: NextPage = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { filteredSearchData } = useFolder();
  const { folder, sortedLinks, nextFolder, previousFolder, singleFolder } =
    useLinks({ id });

  if (!id || typeof id != "string" || !filteredSearchData) {
    router.push("/");
  }

  return (
    <div className="mx-3 flex w-full flex-col md:mx-4">
      <div className="flex flex-wrap justify-center gap-5 ">
        <div className="mx-auto flex w-full flex-col items-center">
          <p>Folder {folder?.name}</p>
          <div className="flex flex-row justify-center">
            <button
              className="btn"
              onClick={previousFolder}
              disabled={singleFolder}
            >
              Previous
            </button>
            <button
              className="btn"
              onClick={nextFolder}
              disabled={singleFolder}
            >
              Next
            </button>
          </div>
        </div>
        <div className="flex-start flex w-full flex-row justify-center"></div>
        {sortedLinks ? (
          sortedLinks?.map((link) => (
            <LinkCard
              key={link?.id}
              name={link?.name}
              url={link?.url}
              linkId={link?.id}
            />
          ))
        ) : (
          <p>No links found</p>
        )}
      </div>
    </div>
  );
};

export default FolderPage;
