import type { NextPage } from "next";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import { AuthStatus } from "../types/custom-next-auth";
import { Spinner } from "../components/spinner/spinner";
import { trpc } from "../utils/trpc";

import Link from "next/link";
import SearchBar from "../components/search/search";
import { FolderCard } from "../components/folder/folder";



const Home: NextPage = () => {
  const { data: session, status } = useSession();

  const { data, isLoading, error } = trpc.useQuery([
    "protected.get-my-folders",
  ]);

  if (status === AuthStatus.LOADING || isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Head>
        <title>urboard</title>
        <meta name="description" content="urboard" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      {session ? (
        <div className="ml-4 flex w-full flex-col md:mx-4">
          <div className="flex flex-wrap justify-center gap-5 ">
            <div className="flex-start flex w-full flex-row justify-center">
              {/* <UserInfo session={session} /> */}
              <SearchBar />
            </div>
            {data?.map((folder) => (
              <FolderCard
                key={folder?.id}
                name={folder?.name}
                folderId={folder?.id}
              />
            ))}
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
