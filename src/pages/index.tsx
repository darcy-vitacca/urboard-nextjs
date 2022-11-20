import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { AuthStatus } from "../types/custom-next-auth";

import { Spinner } from "../components/spinner/spinner";
import FolderSection from "../components/folder/folder-section";
import { Landing } from "../components/landing/landing";

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
      {session?.user ? <FolderSection /> : <Landing />}
    </>
  );
};

export default Home;
