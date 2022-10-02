import { FC } from "react";
import { Session } from "next-auth";
import Image from "next/image";
import { signOut } from "next-auth/react";

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
