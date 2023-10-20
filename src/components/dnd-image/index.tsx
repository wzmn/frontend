import React, { Dispatch } from "react";
import { useDropzone } from "react-dropzone";
import * as styles from "./styles.module.scss";
type Generic = File & any;
type Props = {
  setFiles: Dispatch<React.SetStateAction<Generic[]>>;
};

function DNDImage({ setFiles }: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,

    accept: {
      "image/*": [],
    },
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
