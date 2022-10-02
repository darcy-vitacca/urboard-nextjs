import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { AuthStatus } from "../types/custom-next-auth";
import { Spinner } from "../components/spinner/spinner";
import { trpc } from "../utils/trpc";
import { FC } from "react";
import { Session } from "next-auth";
import Link from "next/link";

export const UserInfo: FC<{ session: Session | null }> = ({ session }) => {
  return (
    <div className="flex w-full">
      <div className="w-48">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="prose-xl">{session?.user?.name}</h1>
            <p className="prose-md">{session?.user?.email}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <button className="btn" onClick={() => signOut()}>
            Sign out
          </button>
          {session?.user?.image ? (
            <Image
              className="rounded-full"
              src={session?.user?.image}
              width={50}
              height={50}
              alt="User image"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const FolderCard: FC<{ name: string; folderId: string }> = ({
  name,
  folderId,
}) => {
  return (
    <Link href={`/folder/${folderId}`}>
      <div className="card flex h-52  w-52 cursor-pointer items-center justify-center border bg-base-100 p-2 shadow-xl">
        <h1 className="r card-title">{name}</h1>
      </div>
    </Link>
  );
};

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
      <main>
        {session ? (
          <div className="ml-4 flex w-full flex-col ">
            <UserInfo session={session} />
            <div className="flex flex-wrap gap-4">
              {data?.map((folder) => (
                <FolderCard
                  key={folder?.id}
                  name={folder?.name}
                  folderId={folder?.id}
                />
              ))}
              {data?.map((folder) => (
                <FolderCard
                  key={folder?.id}
                  name={folder?.name}
                  folderId={folder?.id}
                />
              ))}
              {data?.map((folder) => (
                <FolderCard
                  key={folder?.id}
                  name={folder?.name}
                  folderId={folder?.id}
                />
              ))}
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
      </main>
    </>
  );
};

export default Home;
