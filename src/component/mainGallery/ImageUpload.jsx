import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({ onImageUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const uploadedImage = {
          id: Date.now().toString(),
          path: event.target.result,
          caption: "Uploaded Image",
          isFeatured: false,
          timestamp: new Date().toISOString(),
        };
        onImageUpload(uploadedImage);
      };
      reader.readAsDataURL(file);
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="relative rounded-lg overflow-hidden border-dashed border-2 border-gray-500 flex flex-col items-center justify-center p-4"
    >
      <input {...getInputProps()} />
      <p className="text-gray-500 text-center">
        Drag & drop image here, or click to select an image.
      </p>
    </div>
  );
};

export default ImageUpload;
