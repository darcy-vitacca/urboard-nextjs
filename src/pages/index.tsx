import { Dispatch, FC, SetStateAction, useState } from "react";
import type { NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";

import { trpc } from "../utils/trpc";

import { AuthStatus } from "../types/custom-next-auth";
import { Spinner } from "../components/spinner/spinner";
import SearchBar from "../components/search/search";
import { filterSearch } from "../utils/filterSearch";
import SortableContainer from "../components/folder/folder-container";
import { FolderCard } from "../components/folder/folder";
import FolderSection from "../components/folder/folder-section";

const Home: NextPage = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reorder, setReorder] = useState(false);

  const { data: session, status } = useSession();
  const { data, isLoading, error } = trpc.useQuery([
    "protected.get-my-folders",
  ]);

  const [reorderItems, setReorderItems] = useState(data);

  const filteredFolders =
    searchTerm !== "" ? filterSearch({ data, searchTerm }) : data;

  if (status === AuthStatus.LOADING || isLoading) {
    return <Spinner />;
  }
  console.log("data", data);

  console.log("reorderItems", reorderItems);

  return (
    <>
      <Head>
        <title>urboard</title>
        <meta name="description" content="urboard" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      {session ? (
        <FolderSection
          reorder={reorder}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredSearchData={filteredFolders}
          setReorder={setReorder}
          setReorderItems={setReorderItems}
          reorderItems={reorderItems}
        />
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
