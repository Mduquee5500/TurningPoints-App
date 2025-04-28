import FileUploader from "@/upload-file/_components/FileUploader.tsx";
import { useEffect } from "react";
import useHttp from "@/lib/use-http.ts";
import RecentFilesList from "@/upload-file/_components/RecentFilesList.tsx";

export interface FileUploaderProps {
  id: string;
  filename: string;
  filetypeId: string;
  uploadtime: Date;
}

const UploadFile = () => {
  const { fetchData, loading, data } = useHttp<any, FileUploaderProps[]>();

  const recentlyList = async () => {
    await fetchData("file/recentlyFiles");
  };

  useEffect(() => {
    recentlyList();
  }, []);
  return (
    <div className="h-full  w-full flex flex-col items-center justify-center">
      <div className="w-3/5 space-y-4">
        <FileUploader />
        {loading ? <div>loading...</div> : <RecentFilesList files={data} />}
      </div>
    </div>
  );
};

export default UploadFile;
