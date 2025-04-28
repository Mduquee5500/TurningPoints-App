import { FC, useRef, useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import toast from "react-hot-toast";
import useHttp from "@/lib/use-http.ts";
import { Button } from "@/components/ui/button.tsx";
import { Trash } from "lucide-react";
import { ArrowPathIcon, PhotoIcon } from "@heroicons/react/24/outline";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;
}

interface authProps {
  token: string;
  expire: Date;
  signature: string;
}

const publicKey = "public_OU/b/e8OfeNbs4sISfhs20GjvRs=";
const urlEndpoint = "https://ik.imagekit.io/ilwabtrdhx";

export const ImageUpload: FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const { fetchData } = useHttp();
  const uploadRef = useRef<any>(null);

  const [isUploading, setIsUploading] = useState(false);

  const authenticator = async () => {
    return (await fetchData("image-auth")) as authProps;
  };

  const onError = (err: any) => {
    setIsUploading(false);
    toast.error("Upload failed");
    console.error(err);
  };

  const onSuccess = (res: any) => {
    setIsUploading(false);
    onChange(res.url);
  };

  const onUploadStart = () => {
    setIsUploading(true);
  };

  const handleUploadClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  return (
    <div className="w-full">
      {value ? (
        <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden border">
          <div className="absolute top-2 right-2 z-10">
            <Button
              type="button"
              onClick={() => onRemove(value)}
              variant="destructive"
              size="icon"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
          <img
            src={value}
            alt="Uploaded"
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <IKContext
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticator={authenticator}
        >
          <div
            className="flex items-center justify-center mt-2 border-2 border-dashed p-6 rounded-lg cursor-pointer"
            onClick={handleUploadClick}
          >
            <IKUpload
              ref={uploadRef}
              fileName="upload.png"
              onError={onError}
              onSuccess={onSuccess}
              onUploadStart={onUploadStart}
              className="hidden"
            />
            {isUploading ? (
              <div className="flex flex-col items-center justify-center text-gray-500 animate-pulse">
                <ArrowPathIcon className="h-8 w-8 text-indigo-600 animate-spin" />
                <span className="mt-2 text-sm">Uploading...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-indigo-600">
                <PhotoIcon className="h-12 w-12 text-indigo-600" />
                <span className="mt-2 text-sm text-gray-500">
                  Click to upload a photo
                </span>
              </div>
            )}
          </div>
        </IKContext>
      )}
    </div>
  );
};
