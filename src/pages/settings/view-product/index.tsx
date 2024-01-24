import Button from "components/button";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import { Link } from "gatsby";
import React from "react";
import * as styles from "styles/pages/common.module.scss";
import * as locStyles from "./styles.module.scss";
import Divider from "components/divider";
import Textarea from "components/textarea";
import ProductGallery from "components/photo-gallary";

const ViewProduct = () => {
  return (
    <div className="grow">
      <p className={styles.title}>Settings/View Products</p>

      <div className="space-y-16 mb-3">
        <FormSection title="General Information">
          <div className="grow space-y-5">
            <FormWraper>
              <div className="">
                <div className="flex justify-between">
                  <div className="border px-2 py-2 rounded-lg  w-80">
                    Hot Water Pump
                  </div>

                  <div className="border px-2 py-2 rounded-lg bg-[#ddd]  w-80">
                    Fact Sheet
                  </div>
                </div>

                <div className="flex justify-around items-center mt-8 mb-5">
                  <p className="text-sm">
                    <span className="font-semibold">WorkType</span> : HWS
                  </p>

                  <p className="text-sm">
                    <span className="font-semibold">Category </span> : Split
                  </p>

                  <p className="text-sm flex items-center gap-3">
                    <span className="font-semibold">Price </span> :{" "}
                    <div className={locStyles.priceViewBtn}>
                      <Button title="$1200" />
                    </div>
                  </p>
                </div>
                <Divider />

                <div className="grid grid-cols-2 gap-5 mt-16">
                  <div className="">
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

                  <div className="">
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

                  <div className="">
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

                  <div className="">
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

                    <div className="border px-2 py-2 rounded-lg bg-[#ddd]  w-80">
                      User Manual (Pdf){" "}
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
