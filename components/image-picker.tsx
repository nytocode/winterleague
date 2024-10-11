import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { EditIcon } from "lucide-react";

interface Props {
  value?: any;
  onChange: (val: any) => void;
}

export const ImagePicker = ({ value, onChange }: Props) => {
  const [preview, setPreview] = useState(value?.preview ?? "");
  const inputRef = useRef<any>();
  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (!value) {
      setPreview("");
    }
  }, [value]);

  return (
    <div className="flex justify-center">
      <div className="group relative flex h-[100px] w-[100px] items-center justify-center rounded-lg border bg-background">
        {preview && (
          <>
            <Image src={preview} alt="logo-preview" fill />
            <div className="absolute h-full w-full bg-black opacity-0 group-hover:opacity-40" />
            <Button
              className="absolute hidden border border-background bg-transparent text-xs text-background hover:bg-transparent hover:text-background group-hover:flex"
              variant={"ghost"}
              size={"icon"}
              onClick={(e) => {
                e.preventDefault();
                if (inputRef) {
                  inputRef.current.click();
                }
              }}
            >
              <EditIcon className="h-4 w-4" />
            </Button>
          </>
        )}
        {!preview && (
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={(e) => {
              e.preventDefault();
              if (inputRef) {
                inputRef.current.click();
              }
            }}
          >
            Seleziona
          </Button>
        )}
      </div>
      <input
        ref={inputRef}
        className="hidden"
        onChange={handleChange}
        type="file"
        accept="image/*"
      />
    </div>
  );
};
