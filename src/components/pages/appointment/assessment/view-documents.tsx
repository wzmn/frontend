import { StringInBetweenReg } from "constants/regex";
import React from "react";
import { DocumentsAnsT } from "type/global";

const imageType = ["signature", "image"];
const videoType = ["video"];
const fileType = ["file"];

const ViewDocuments = ({ data }: { data: DocumentsAnsT }) => {
  data.question.question_type;
  return (
    <>
      {data.documents.map((doc, index) => {
        return (
          <div className="" key={index}>
            <p className="mb-4">{data?.question?.content}</p>
            <div className="border w-80 h-fit p-4 rounded-xl relative">
              {/* <p className="absolute top-0 left-0">switch</p> */}
              <div className="flex flex-col  justify-center items-center h-full">
                <div className="w-60 h-32 flex ">
                  {imageType.includes(data?.question?.question_type) && (
                    <a
                      href={doc?.file}
                      className="w-full h-full"
                      target="_black"
                    >
                      <img
                        className="w-full h-full object-contain border-2"
                        src={doc?.file}
                        alt=""
                        srcSet=""
                      />
                    </a>
                  )}

                  {fileType.includes(data?.question?.question_type) && (
                    <a
                      className="self-center mx-auto justify-self-end items-center  border-2"
                      href={doc?.file}
                      target="_black"
                    >
                      Click to View Pdf
                    </a>
                  )}

                  {videoType.includes(data?.question?.question_type) && (
                    <video
                      className="w-full h-full object-contain border-2"
                      controls
                    >
                      <source src={doc?.file} type="video/mp4"></source>
                    </video>
                  )}
                </div>
                <p className="self-start mt-5 ml-2">{data.formatted_address}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ViewDocuments;
