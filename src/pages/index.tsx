import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import { AuthStatus } from "../types/custom-next-auth";
import { Spinner } from "../components/spinner/spinner";
import { trpc } from "../utils/trpc";

import SearchBar from "../components/search/search";
import { FolderCard } from "../components/folder/folder";
import { filterSearch } from "../utils/filterSearch";

const Home: NextPage = () => {
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
            {/* <UserInfo session={session} /> */}
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filteredSearchData={filteredFolders}
            />
            <div className="flex-start flex w-full flex-row justify-center"></div>
            {filteredFolders?.length ? (
              filteredFolders.map((folder, index) => (
                <FolderCard
                  key={folder?.id}
                  name={folder?.name}
                  folderId={folder?.id}
                  index={index}
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
