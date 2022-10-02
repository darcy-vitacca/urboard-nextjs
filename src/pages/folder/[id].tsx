import { FC } from "react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

import { Spinner } from "../../components/spinner/spinner";

const FolderContent: FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery([
    "protected.get-folder-by-id",
    { id },
  ]);

  console.log("data", data);

  if (isLoading || !data) {
  return <Spinner />;
  }

  return (
    <div>
      Folder {id}
      <h1 className="prose-xl font-bold">{data?.name}</h1>
    </div>
  );
};

const FolderPage: FC = () => {
  const { query } = useRouter();
  const { id } = query;
  if (!id || typeof id != "string") return <div>No id</div>;

  return (
    <div className="flex flex-col p-6">
      Folder Page : {id}
      <FolderContent id={id} />
    </div>
  );
};

export default FolderPage;
