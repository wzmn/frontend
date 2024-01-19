import React, { useState, useRef } from "react";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import * as settingtyles from "../styles.module.scss";
import { Link } from "gatsby";
import { GrUserWorker } from "react-icons/gr";
import Button from "components/button";
import { navigate } from "gatsby";
import * as styles from "styles/pages/common.module.scss";
import Label from "components/label";
import DNDImage from "components/dnd-image";
import * as pageStyles from "./styles.module.scss";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import Dropdown from "components/dropdown";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useAppContext } from "providers/app-provider";


interface Props {
  toggle: boolean;
  toggleHandler: (x: boolean) => void;
}


interface FileProps extends File {
  preview: string;
}

const Products = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState([]);
  const { workTypes, category } = useAppContext();
  const [openWK, setOpenWK] = useState(false);
  const [openCat, setOpenCat] = useState(false);

  // function toggle() {
  //   setOpen((prev) => !prev);
  // }




  return (
    <div className="grow">
      <p className={styles.title}>Settings/Add Products</p>
      <FormSection title="General Information" style={{ zIndex: 1 }}>
        <FormWraper>
          <div className={`flex flex-col`}>
            <div className="mb-4">
              Tell the Customer about the Product
            </div>
            <div className="flex flex-wrap gap-8">
              <div className="flex flex-col w-[calc(50%-1rem)] rounded-sm">
                <div className="mb-2">Name</div>
                <input placeholder="Image Title" className="border px-4 py-2" />
              </div>
              <div className="flex flex-col w-[calc(50%-1rem)] rounded-sm">
                <div className="mb-2">Work Type</div>
                <div className={`${styles.dropdownCont} border py-2 px-4`}>
                  <button className="flex items-center justify-between w-full" onClick={setOpenWK.bind(this)}>
                    Selected Work Type
                    <IoIosArrowDown />
                  </button>
                  {openWK && (
                    <Dropdown handleToggle={setOpenWK.bind(this)} position={styles.position}>
                      <>
                        {workTypes.map(s => {
                          return (
                            <div className="shadow mb-4 py-2 px-2" key={s.ref_id}>{s.title}</div>
                          )
                        })}
                      </>
                    </Dropdown>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-[calc(50%-1rem)] rounded-sm">
                <div className="mb-2">Category</div>
                <div className={`${styles.dropdownCont} border py-2 px-4`}>
                  <button className="flex items-center justify-between w-full" onClick={setOpenCat.bind(this)}>
                    Select a Category
                    <IoIosArrowDown />
                  </button>
                  {openCat && (
                    <Dropdown handleToggle={setOpenCat.bind(this)} position={styles.position}>
                      <>
                        {category.map(s => {
                          return (
                            <div className="shadow mb-4 py-2 px-2" key={s.id}>{s.category}</div>
                          )
                        })}
                      </>
                    </Dropdown>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-[calc(50%-1rem)] rounded-sm">
                <div className="mb-2">Price</div>
                <input placeholder="Image Title" className="border px-4 py-2" />
              </div>
            </div>
          </div>
        </FormWraper>
      </FormSection>
      <FormSection title="Images">
        <FormWraper>
          <div>
            <div className={`flex flex-col`}>
              <div className="mb-2">Add Images ({files.length})</div>
              <div className={`${styles.file} mb-8`}>
                <DNDImage maxFiles={10} setFiles={(file) => {
                  setFiles(files.concat(file))
                }} />
              </div>
              <div className="flex gap-x-4 flex-wrap">
                {files.map((f, idx) => {
                  console.log(f)
                  return (
                    <div key={idx} className={"mb-8 pb-8 border-b-2 w-[calc(50%-0.5rem)]"}>
                      <input placeholder="Image Title" className="border px-4 py-2 w-full mb-4 rounded-sm" />
                      <div className={pageStyles.preview}>
                        {f?.preview ? (
                          <div className="image-preview">
                            <img
                              src={f?.preview}
                              alt="image preview"
                              // Revoke data uri after image is loaded
                              onLoad={() => {
                                URL.revokeObjectURL(f?.preview);
                              }}
                            />
                            <RiDeleteBin6Line
                              className="w-5 h-5 text-red cursor-pointer absolute top-3 right-4"
                              onClick={() => {
                                const shallowClone = [...files].filter((_, index) => {
                                  if (idx !== index) {
                                    return true;
                                  }
                                }).map((item) => {
                                  item.preview = URL.createObjectURL(item)
                                  return item;
                                });
                                setFiles(shallowClone);
                              }}
                            />
                          </div>
                        ) : (
                          <div className="empty">
                            <img
                              src="/assets/images/picture.svg"
                            // Revoke data uri after image is loaded
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </FormWraper>
      </FormSection>
      <FormSection title="Description">
        <FormWraper>
          <div className={`${settingtyles.profileSetting} flex flex-col`}>
            <div className="mb-8">Enter Description of the Product for Detailed View</div>
            <div className="flex gap-x-4 flex-wrap">
              <div className="flex flex-col w-[calc(50%-0.5rem)] mb-8">
                <div className="flex items-center mb-4">
                  <GrUserWorker className="text-4xl mr-4 text-blue-500" />
                  <span className="">Card Description</span>
                </div>
                <textarea className="w-full border rounded-md p-2" rows={3} placeholder="Card Description"></textarea>
              </div>
              <div className="flex flex-col w-[calc(50%-0.5rem)] mb-8">
                <div className="flex items-center mb-4">
                  <GrUserWorker className="text-4xl mr-4 text-blue-500" />
                  <span className="">Deatiled Description</span>
                </div>
                <textarea className="w-full border rounded-md p-2" rows={3} placeholder="Deatiled Description"></textarea>
              </div>
              <div className="flex flex-col w-[calc(50%-0.5rem)] mb-8">
                <div className="flex items-center mb-4">
                  <GrUserWorker className="text-4xl mr-4 text-blue-500" />
                  <span className="">Techinical Specification</span>
                </div>
                <textarea className="w-full border rounded-md p-2" rows={3} placeholder="Techinical Specification"></textarea>
              </div>
              <div className="flex flex-col w-[calc(50%-0.5rem)] mb-8">
                <div className="flex items-center mb-4">
                  <GrUserWorker className="text-4xl mr-4 text-blue-500" />
                  <span className="">User Manual</span>
                </div>
                <div className="flex">
                  <label htmlFor="user_manual" className="flex border h-[90px] w-full items-center pl-2 text-gray-400">
                    User Manual (pdf)
                    <input type="file" className="hidden" name="user_manual" id="user_manual" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </FormWraper>
      </FormSection>
      <FormSection title="Fact Sheet">
        <FormWraper>
          <div className={`${settingtyles.profileSetting} flex flex-col`}>
            <div className="mb-8">Upload Fact Sheet for Customer Acknowledgement in <span className="text-red">PDF format</span></div>
            <div className="flex gap-x-4 flex-wrap">
              <div className="flex flex-col w-[calc(50%-1rem)] rounded-sm">
                <div className="mb-2">Work Type</div>
                <div className={`${styles.dropdownCont} border py-2 px-4`}>
                  <button className="flex items-center justify-between w-full" onClick={setOpenWK.bind(this)}>
                    Selected Work Type
                    <IoIosArrowDown />
                  </button>
                  {openWK && (
                    <Dropdown handleToggle={setOpenWK.bind(this)} position={styles.position}>
                      <>
                        {workTypes.map(s => {
                          return (
                            <div className="shadow mb-4 py-2 px-2" key={s.ref_id}>{s.title}</div>
                          )
                        })}
                      </>
                    </Dropdown>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-[calc(50%-0.5rem)] mb-8">
                <div className="flex items-center mb-2">
                  <span className="">Document</span>
                </div>
                <div className="flex">
                  <label htmlFor="user_manual" className=" py-2 px-4 flex border w-full items-center pl-2 text-gray-400">
                    Factsheet (pdf)
                    <input type="file" className="hidden" name="user_manual" id="user_manual" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </FormWraper>
      </FormSection>
      <div className="flex justify-center gap-36 mt-10 ml-[16rem] mb-10">
        <Button title="Submit" type="submit" isLoading={isSubmitting} onClick={() => {
          setIsSubmitting(!isSubmitting);
        }} />

        <Button
          title="Cancel"
          type="button"
          color="red"
          className="py-10"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
    </div>
  )
}

export default Products;