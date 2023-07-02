"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";

import {ImagePlus, Trash} from "lucide-react";

import { Button } from "@/components/ui/button";
import {CldUploadWidget} from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange(value: string): void;
  onRemove(value: string): void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
                size="icon"
                type="button"
                variant="destructive"
                onClick={() => onRemove(url)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="Image"
              className="object-cover"
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="w07xvvui">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="w-4 h-4" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
