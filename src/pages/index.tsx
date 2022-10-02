import type { NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import { AuthStatus } from "../types/custom-next-auth";

import { Spinner } from "../components/spinner/spinner";
import FolderSection from "../components/folder/folder-section";
import { useFolder } from "../utils/hooks/useFolder";

const Home: NextPage = (props) => {
  const { data: session, status } = useSession();

  const { isLoading } = useFolder();

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
        <FolderSection />
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
