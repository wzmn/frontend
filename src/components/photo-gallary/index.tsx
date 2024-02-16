import React, { useState, useRef, useEffect } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
const ProductGallery = ({ image_list }: { image_list: string[] }) => {
  const [images, setImages] = useState(image_list);
  const [selected, setSelected] = useState(images[0]);
  const [isSelectedImage, setIsSelectedImage] = useState(true);
  const [shouldScroll, setShouldScroll] = useState(true);
  const thumbnails = useRef(null);
  const scrollUp = () => {
    const element = thumbnails.current as unknown as HTMLElement;
    if (shouldScroll) {
      element.scrollTop -= 100;
    }
  };
  const scrollDown = () => {
    const element = thumbnails.current as unknown as HTMLElement;
    if (shouldScroll) {
      element.scrollTop += 100;
    }
  };
  useEffect(() => {
    console.log(image_list.length);
    setSelected(images[0]);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // The image is in view
          setShouldScroll(true);
        } else {
          // The image is not in view, stop scrolling
          setShouldScroll(false);
        }
      });
    });

    if (thumbnails.current) {
      observer.observe(thumbnails.current);
    }

    return () => {
      if (thumbnails.current) {
        observer.unobserve(thumbnails.current);
      }
    };
  }, []);
  return (
    <div className="flex w-full gap-x-2">
      <div className="max-w-[75px] flex flex-col justify-between">
        <div className="border py-2 flex justify-center rounded-sm cursor-pointer mb-2">
          <GoChevronUp onClick={scrollUp} />
        </div>
        <div
          className="flex-col gap-y-2 flex max-h-[500px]"
          style={{
            overflow: "hidden",
            userSelect: "none",
            scrollBehavior: "smooth",
          }}
          ref={thumbnails}
        >
          {images.map((_: any) => {
            const fileExtension = _.split(".").pop().toLowerCase();
            const isImage = ["jpg", "jpeg", "png", "gif"].includes(
              fileExtension
            );
            const isVideo = ["mp4", "avi", "mov"].includes(fileExtension);

            return (
              <div
                onClick={() => {
                  setSelected(_);
                  if (isImage) {
                    setIsSelectedImage(true);
                  } else {
                    setIsSelectedImage(false);
                  }
                }}
                className="w-44"
              >
                {isImage && <img className="cursor-pointer" src={_} alt="" />}
                {isVideo && (
                  <video className="cursor-pointer" src={_} controls />
                )}
              </div>
            );
          })}
        </div>
        <div className="border py-2 flex justify-center rounded-sm cursor-pointer mt-2">
          <GoChevronDown onClick={scrollDown} />
        </div>
      </div>
      <div
        className="flex justify-center items-center grow rounded-md border"
        style={{ userSelect: "none" }}
      >
        {isSelectedImage ? (
          <img src={selected} alt="" />
        ) : (
          <video src={selected} controls />
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
