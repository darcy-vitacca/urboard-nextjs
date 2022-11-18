import { useRouter } from "next/router";
import { useFolder } from "../../utils/hooks/useFolder";
import { NextPage } from "next";
import LinkSection from "../../components/link/link-section";
import { Spinner } from "../../components/spinner/spinner";

const FolderPage: NextPage = (props) => {
  const router = useRouter();
  const isReady = router.isReady;
  const { id } = router.query as { id: string };
  const { filteredSearchData } = useFolder();

  if (!isReady) {
    return <Spinner />;
  }

  if (!id || typeof id != "string" || !filteredSearchData) {
    router.push("/");
  }

  return id ? <LinkSection id={id} /> : null;
};

export default FolderPage;
