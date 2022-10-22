import type { NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import { AuthStatus } from "../types/custom-next-auth";

import { Spinner } from "../components/spinner/spinner";
import FolderSection from "../components/folder/folder-section";

const Home: NextPage = (props) => {
  const { data: session, status } = useSession();

  if (status === AuthStatus.LOADING) {
    return <Spinner absolute />;
  }

  return (
    <>
      <Head>
        <title>urboard</title>
        <meta name="description" content="urboard" />
      </Head>
      {session?.user ? (
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
