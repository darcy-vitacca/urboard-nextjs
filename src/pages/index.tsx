import { clsx } from "clsx";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import { AuthStatus } from "../types/custom-next-auth";
import { Spinner } from "../components/spinner/spinner";
import { trpc } from "../utils/trpc";

import SearchBar from "../components/search/search";
import { FolderCard } from "../components/folder/folder";
import { filterSearch } from "../utils/filterSearch";

export const ReorderBtn: FC<{
  reorder: boolean;
  setReorder: Dispatch<SetStateAction<boolean>>;
}> = ({ reorder, setReorder }) => {
  return (
    <button
      className="mt-3 flex w-12 flex-col justify-center text-center"
      onClick={() => setReorder(!reorder)}
    >
      <div
        className={clsx("flex flex-col justify-center text-center", {
          ["rounded-xl border-black"]: reorder,
        })}
      >
        <ArrowPathRoundedSquareIcon
          className={clsx("m-auto block h-6 w-6 ", {
            ["animate-spin text-teal-500"]: reorder,
          })}
        />
        <label
          htmlFor="search"
          className=" block min-w-[50px] text-xs font-bold text-gray-700"
        >
          {reorder ? "Save" : "Reorder"}
        </label>
      </div>
    </button>
  );
};

const Home: NextPage = (props) => {
  const { data: session, status } = useSession();

  const { data, isLoading, error } = trpc.useQuery([
    "protected.get-my-folders",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [reorder, setReorder] = useState(false);

  if (status === AuthStatus.LOADING || isLoading) {
    return <Spinner />;
  }

  const filteredFolders =
    searchTerm !== "" ? filterSearch({ data, searchTerm }) : data;

  return (
    <>
      <Head>
        <title>urboard</title>
        <meta name="description" content="urboard" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      {session ? (
        <div className="mx-3 flex w-full flex-col md:mx-4">
          <div className="flex flex-wrap justify-center gap-5 ">
            <div className="mx-auto flex w-full flex-col items-center">
              {/* <UserInfo session={session} /> */}
              <SearchBar
                disabled={reorder}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredSearchData={filteredFolders}
              />
              <ReorderBtn setReorder={setReorder} reorder={reorder} />
            </div>
            <div className="flex-start flex w-full flex-row justify-center"></div>
            {filteredFolders?.length ? (
              filteredFolders.map((folder, index) => (
                <FolderCard
                  key={folder?.id}
                  name={folder?.name}
                  folderId={folder?.id}
                  index={index}
                  disabled={reorder}
                />
              ))
            ) : (
              <p>No folders found</p>
            )}
          </div>
        </div>
      ) : (
        <>
          Not signed in <br />
          <button className="btn" onClick={() => signIn()}>
            Sign in
          </button>
        </>
      )}
    </>
  );
};

export default Home;
