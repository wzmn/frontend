import Button from "components/button";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import { Link } from "gatsby";
import React from "react";
import * as styles from "styles/pages/common.module.scss";
import * as locStyles from "./styles.module.scss";
import Divider from "components/divider";
import ProductGallery from "components/photo-gallary";
import { RiDownload2Line, RiFilePdf2Line } from "react-icons/ri";

const ViewProduct = () => {
  const { loading } = locStyles
  return (
    <div className="grow">
      <p className={styles.title}>Settings/View Product</p>

      <div className="space-y-16 mb-3">
        <FormSection title="General Information">
          <div className="grow space-y-5">
            <FormWraper>
              <div className="">
                <div className="flex justify-between">
                  <div className="py-2 text-2xl w-80 flex-1">
                    Hot Water Pump
                  </div>
                  <div className="border flex-1 items-center flex justify-between px-2 py-2 rounded-lg bg-[#ddd]  w-80 cursor-pointer">
                    <RiFilePdf2Line className="text-xl" />
                    Fact Sheet
                    <RiDownload2Line className="text-xl" />
                  </div>
                </div>

                <div className="flex items-center mt-8 mb-8 flex-wrap gap-4">
                  <p className="text-sm w-full md:w-[calc(50%-0.5rem)] py-1 h-10 flex items-center justify-between">
                    <span className="font-semibold">WorkType:</span> HWS
                  </p>

                  <p className="text-sm flex items-center w-full md:w-[calc(50%-0.5rem)] py-1 h-10 justify-between">
                    <span className="font-semibold">Price:</span>
                    <div className={locStyles.priceViewBtn}>
                      <Button title="$1200" />
                    </div>
                  </p>
                  <p className="text-sm w-full md:w-[calc(50%-0.5rem)] py-1 h-10 flex items-center justify-between">
                    <span className="font-semibold">Category:</span> Split
                  </p>

                  <p className="text-sm w-full md:w-[calc(50%-0.5rem)] py-1 h-10 flex items-center justify-between">
                    <span className="font-semibold">Supplier:</span> Snippit Central
                  </p>
                  <p className="text-sm w-full md:w-[calc(50%-0.5rem)] py-1 h-10 flex items-center justify-between">
                    <span className="font-semibold">Validity:</span> <div>
                      20/1/23:11:00 AM <b>To</b> 20/7/23:11:00 AM
                    </div>
                  </p>
                  <p className="text-sm w-full md:w-[calc(50%-0.5rem)] py-1 h-10 flex items-center justify-between">
                    <span className="font-semibold">Region:</span> NSW
                  </p>
                  <p className="text-sm w-full md:w-[calc(50%-0.5rem)] py-1 h-10 flex items-center justify-between">
                    <span className="font-semibold">Suburb:</span> Suburb
                  </p>
                  <p className="text-sm w-full md:w-[calc(50%-0.5rem)] py-1 h-10 flex items-center justify-between">
                    <span className="font-semibold">LGA:</span> LGA
                  </p>
                  <p className="text-sm w-full md:w-[calc(50%-0.5rem)] py-1 h-10 flex items-center justify-between">
                    <span className="font-semibold">Certificates:</span> Veecs: 100, STC: 100
                  </p>
                </div>

                <Divider className="mb-8" />

                <div className="flex flex-wrap gap-4">
                  <div className="w-full md:w-[calc(50%-0.5rem)]">
                    <div className="flex items-center gap-8 mb-8">
                      <div className="w-7 h-7">
                        <img
                          src="/assets/images/task.png"
                          className="h-full w-full object-contain"
                          alt=""
                          srcSet=""
                        />
                      </div>
                      <p className="font-medium text-base">Card Description</p>
                    </div>

                    <textarea
                      value="Heat Pump to be done with all the gathered requirements"
                      className="w-full border rounded-md p-2"
                      rows={3}
                      placeholder="Card Description"
                    ></textarea>
                  </div>

                  <div className="w-full md:w-[calc(50%-0.5rem)]">
                    <div className="flex items-center gap-8 mb-8">
                      <div className="w-7 h-7">
                        <img
                          src="/assets/images/website.png"
                          className="h-full w-full object-contain"
                          alt=""
                          srcSet=""
                        />
                      </div>
                      <p className="font-medium text-base">
                        Detailed Decription
                      </p>
                    </div>

                    <textarea
                      value="Heat Pump to be done with all the gathered requirements"
                      className="w-full border rounded-md p-2"
                      rows={3}
                      placeholder="Card Description"
                    ></textarea>
                  </div>

                  <div className="w-full md:w-[calc(50%-0.5rem)]">
                    <div className="flex items-center gap-8 mb-8">
                      <div className="w-7 h-7">
                        <img
                          src="/assets/images/inspection.png"
                          className="h-full w-full object-contain"
                          alt=""
                          srcSet=""
                        />
                      </div>
                      <p className="font-medium text-base">
                        Technical Specifications
                      </p>
                    </div>

                    <textarea
                      value="Heat Pump to be done with all the gathered requirements"
                      className="w-full border rounded-md p-2 "
                      rows={3}
                      placeholder="Card Description"
                    ></textarea>
                  </div>

                  <div className="w-full md:w-[calc(50%-0.5rem)]">
                    <div className="flex items-center gap-8 mb-8">
                      <div className="w-7 h-7">
                        <img
                          src="/assets/images/questions.png"
                          className="h-full w-full object-contain"
                          alt=""
                          srcSet=""
                        />
                      </div>
                      <p className="font-medium text-base">User Manual</p>
                    </div>

                    <div className="border justify-between px-2 py-2 rounded-lg bg-[#ddd] w-full h-[90px] flex cursor-pointer items-center">
                      <RiFilePdf2Line className="text-3xl" />
                      User Manual (Pdf)
                      <RiDownload2Line className="text-3xl" />
                    </div>
                  </div>
                </div>

                <Divider className="my-8" />

                <ProductGallery
                  image_list={[
                    // "https://snippitv2.s3.ap-southeast-2.amazonaws.com/uploads/1706012990387_qay8pq.mp4?AWSAccessKeyId=AKIAT4Q3NCLTCLXX3HOX&Signature=Mlc1LwhxHfCwgZ3tUFg9VirPkXg%3D&Expires=1706022737",
                    "/assets/images/task.png",
                    "/assets/images/task.png",
                    "/assets/images/task.png",
                    "/assets/images/task.png",
                    "/assets/images/website.png",
                    "/assets/images/task.png",
                    "/assets/images/task.png",
                    "/assets/images/task.png",
                  ]}
                />
              </div>
            </FormWraper>
          </div>
        </FormSection>
      </div>
    </div>
  );
};

export default ViewProduct;
