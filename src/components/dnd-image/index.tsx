import React, { Dispatch } from "react";
import { useDropzone } from "react-dropzone";
import * as styles from "./styles.module.scss";

export type DNDImageFileType = File & {
  preview: string;
};
type Props = {
  setFiles: (file: DNDImageFileType[]) => void;
  maxFiles?: number;
  accept?: Record<string, any>;
};

function DNDImage({
  setFiles,
  maxFiles = 1,
  accept = {
    "image/*": [],
  },
}: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: maxFiles,

    accept: accept,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  return (
    <section className={`${styles.dropzoneCont}`}>
      <div {...getRootProps({ className: "dropzone " })}>
        <input {...getInputProps()} />
        <div className={styles.content}>
          <img
            src="/assets/images/picture.svg"
            alt=""
            // srcSet="Picture"
            className="text-3xl w-44"
          />
          <p>Drag and drop or browse</p>
        </div>
      </div>
    </section>
  );
}

export default DNDImage;
