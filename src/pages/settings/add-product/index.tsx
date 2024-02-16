import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import * as settingtyles from "../styles.module.scss";
import { Link } from "gatsby";
import { GrUserWorker } from "react-icons/gr";
import Button from "components/button";
import { navigate } from "gatsby";
import * as styles from "styles/pages/common.module.scss";
import Label from "components/label";
import DNDImage, { DNDImageFileType } from "components/dnd-image";
import * as pageStyles from "./styles.module.scss";
import { RiDeleteBin6Line, RiUpload2Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import Dropdown from "components/dropdown";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useAppContext } from "providers/app-provider";
import ComboBox, { ComboBoxDataT } from "components/combo-box";
import Input from "components/input";
import { debounce } from "utility/debounce";
import companyList from "services/company-list";
import SelectBox from "components/selectBox";
import { CategoryT } from "type/category";
import categoryList from "services/category-list";
import certificatesList from "services/certificates-list";
import { useForm } from "react-hook-form";

interface Props {
  toggle: boolean;
  toggleHandler: (x: boolean) => void;
}

interface FileProps extends File {
  preview: string;
}

const Region = [
  {
    label: "Victoria",
  },
  {
    label: "Federal",
  },
  {
    label: "New South Wales",
  },
];

const AddProducts = () => {
  const [files, setFiles] = useState<DNDImageFileType[]>([]);
  const { workTypes, category } = useAppContext();

  const [companyListData, setCompanyListData] = useState<ComboBoxDataT[]>([]);
  const [categoryListData, setCategoryListData] = useState<ComboBoxDataT[]>([]);
  const [certificatesListData, setcertifiCatesListData] = useState<
    ComboBoxDataT[]
  >([]);

  const [certificatecompanyListData, setCertificateCompanyListData] = useState<
    ComboBoxDataT[]
  >([]);

  const [certificates, setCertificates] = useState([
    { id: 1, title: "Veecs", amount: 0 },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  const workTypesList = workTypes.map((workType) => ({
    ...workType,
    label: workType.title,
  }));

  const handleCompany = debounce(async (e?: ChangeEvent<HTMLInputElement>) => {
    const res = await companyList({
      search: e?.target?.value ?? "",
      company_type: "seller",
    });

    const companyFilteredList = res.results?.map((item) => {
      return {
        label: item.company_name,
        value: item.id,
        ...item,
      };
    });

    setCompanyListData(() => companyFilteredList!);
  });

  const handleCategory = debounce(async (e?: ChangeEvent<HTMLInputElement>) => {
    try {
      const res = await categoryList({
        search: e?.target?.value ?? "",
      });

      const categoryFilteredList = res.results?.map((item) => {
        return {
          label: item.category,
          value: item.id,
          ...item,
        };
      });

      setCategoryListData(() => categoryFilteredList!);
    } catch (error) {}
  });

  const handleCertificates = debounce(
    async (e?: ChangeEvent<HTMLInputElement>) => {
      try {
        const res = await certificatesList({
          search: e?.target?.value ?? "",
        });

        const certificatesFilteredList = res.results?.map((item) => {
          return {
            label: item.certificate,
            value: item.id,
            ...item,
          };
        });

        setcertifiCatesListData(() => certificatesFilteredList!);
      } catch (error) {}
    }
  );

  const certificateHandleCompany = debounce(
    async (e?: ChangeEvent<HTMLInputElement>) => {
      const res = await companyList({
        search: e?.target?.value ?? "",
      });

      const companyFilteredList = res.results?.map((item) => {
        return {
          label: item.company_name,
          value: item.id,
          ...item,
        };
      });

      setCertificateCompanyListData(() => companyFilteredList!);
    }
  );

  useEffect(() => {
    handleCompany();
    certificateHandleCompany();
    handleCategory();
    handleCertificates();
  }, []);

  return (
    <div className="grow">
      <p className={styles.title}>Settings/Add Products</p>
      <FormSection title="General Information" style={{ zIndex: 1 }}>
        <FormWraper>
          <div className={`flex flex-col`}>
            <div className="mb-4">Tell the Customer about the Product</div>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col w-full rounded-sm">
                <div className="mb-2">Name</div>

                <Input placeholder="Enter Name for the Product" />
              </div>

              <div
                className="flex flex-col w-full  rounded-sm"
                style={{ zIndex: 52 }}
              >
                <div className="mb-2">Work Type</div>

                <SelectBox
                  color="full-white"
                  placeholder="Add Work Type"
                  data={workTypesList || []}
                  // asterisk
                  // value={address?.state}
                  // onChange={(e) => {
                  //   setValue(`${wat}.state`, e.label);
                  // }}
                />
              </div>
              <div
                className="flex flex-col w-full rounded-sm"
                style={{ zIndex: 1 }}
              >
                <div className="mb-2">Category</div>
                <ComboBox
                  placeholder="Select Category"
                  data={categoryListData}
                  contClass={styles.lCont}
                  className={styles.boxInput}
                  handleSelect={() => {}}
                  onChange={handleCategory}
                />
              </div>

              <div className="flex flex-col w-full rounded-sm">
                <div className="mb-2">Supplier Company</div>
                <ComboBox
                  placeholder="Select Company"
                  data={companyListData}
                  contClass={styles.lCont}
                  className={styles.boxInput}
                  handleSelect={() => {}}
                  onChange={handleCompany}
                />
              </div>

              <div className="flex flex-col w-full rounded-sm">
                <div className="mb-2">Retail Price</div>

                <Input placeholder="Enter Price for Product" />
              </div>

              <div className="flex flex-col w-full rounded-sm">
                <div className="mb-2">Discount Price</div>

                <Input placeholder="Enter Price for Product" />
              </div>
            </div>
          </div>
        </FormWraper>
      </FormSection>

      <FormSection title="Validity">
        <FormWraper>
          <div>
            <div className={`flex gap-x-4 flex-wrap`}>
              <div className="flex-1">
                <div className="mb-2">From</div>

                <Input type="date" />
              </div>
              <div className="flex-1">
                <div className="mb-2">To</div>
                <Input type="date" />
              </div>
            </div>
          </div>
        </FormWraper>
      </FormSection>

      <FormSection title="Address" style={{ zIndex: 2 }}>
        <FormWraper>
          <div className="grid grid-cols-2">
            <div className="flex flex-col w-full rounded-sm">
              <div className="mb-2">Region</div>
              <SelectBox
                color="full-white"
                placeholder="Region"
                data={Region || []}
                // asterisk
                // value={address?.state}
                // onChange={(e) => {
                //   setValue(`${wat}.state`, e.label);
                // }}
              />
            </div>
            {/* <div className={`flex gap-x-4 flex-wrap`}>
              <div className="mb-4 w-full md:w-[calc(50%-0.5rem)]">
                <div className="mb-2">Region</div>
                <div>
                  <Input placeholder="Enter Region" />
                </div>
              </div>
              <div className="mb-4 w-full md:w-[calc(50%-0.5rem)]">
                <div className="mb-2">Suburb</div>
                <div>
                  <Input placeholder="Enter Suburb" />
                </div>
              </div>
              <div className="mb-4 w-full md:w-[calc(50%-0.5rem)]">
                <div className="mb-2">LGA</div>
                <div>
                  <Input placeholder="Enter LGA" />
                </div>
              </div>
            </div> */}
          </div>
        </FormWraper>
      </FormSection>

      <FormSection title="Images">
        <FormWraper>
          <div>
            <div className={`flex flex-col`}>
              <div className="mb-2">Add Images ({files.length})</div>
              <div className={`${styles.file} mb-8`}>
                <DNDImage
                  maxFiles={10}
                  setFiles={(file) => {
                    setFiles(files.concat(file));
                  }}
                />
              </div>
              <div className="flex gap-x-4 flex-wrap">
                {files.map((f, idx) => {
                  console.log(f);
                  return (
                    <div
                      key={idx}
                      className={
                        "mb-8 pb-8 border-b-2  w-full md:w-[calc(50%-0.5rem)]"
                      }
                    >
                      {/* <input
                        placeholder="Image Title"
                        className="border px-4 py-2 w-full mb-4 rounded-sm"
                      /> */}
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
                                const shallowClone = [...files]
                                  .filter((_, index) => {
                                    if (idx !== index) {
                                      return true;
                                    }
                                  })
                                  .map((item) => {
                                    item.preview = URL.createObjectURL(item);
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
                  );
                })}
              </div>
            </div>
          </div>
        </FormWraper>
      </FormSection>

      <FormSection title="Description">
        <FormWraper>
          <div className={`${settingtyles.profileSetting} flex flex-col`}>
            <div className="mb-8">
              Enter Description of the Product for Detailed View
            </div>
            <div className="flex gap-x-4 flex-wrap">
              <div className="flex flex-col  w-full md:w-[calc(50%-0.5rem)] mb-8">
                <div className="flex items-center mb-4">
                  <svg
                    className="mr-4 h-12"
                    xmlns="http://www.w3.org/2000/svg"
                    width="39.686"
                    height="39.686"
                    viewBox="0 0 39.686 39.686"
                  >
                    <path
                      id="inspection"
                      d="M34.288,8H30.234a1.171,1.171,0,0,0-1.169,1.169v4.054a1.171,1.171,0,0,0,1.169,1.169h4.054a1.171,1.171,0,0,0,1.169-1.169V9.168A1.171,1.171,0,0,0,34.288,8Zm-.111,5.112H30.345V9.279h3.832v3.832ZM30.73,11.543a.64.64,0,1,1,.905-.905l.386.386.821-1.015a.64.64,0,1,1,1,.805l-1.268,1.568a.64.64,0,0,1-.464.237h-.034a.64.64,0,0,1-.453-.187Zm16.956,1.11a.64.64,0,0,1-.64.64h-9a.64.64,0,0,1,0-1.28h9A.64.64,0,0,1,47.686,12.653ZM37.407,9.737a.64.64,0,0,1,.64-.64h9a.64.64,0,0,1,0,1.28h-9A.64.64,0,0,1,37.407,9.737Zm-3.119,6.019H30.234a1.171,1.171,0,0,0-1.169,1.169v4.054a1.171,1.171,0,0,0,1.169,1.169h4.054a1.171,1.171,0,0,0,1.169-1.169V16.925a1.171,1.171,0,0,0-1.169-1.169Zm-.111,5.112H30.345V17.036h3.832v3.832ZM30.73,19.3a.64.64,0,1,1,.905-.905l.386.386.821-1.015a.64.64,0,1,1,1,.805l-1.268,1.568a.64.64,0,0,1-.464.237h-.034a.64.64,0,0,1-.453-.187ZM47.686,20.41a.64.64,0,0,1-.64.64h-9a.64.64,0,0,1,0-1.28h9A.64.64,0,0,1,47.686,20.41Zm0-2.917a.64.64,0,0,1-.64.64h-9a.64.64,0,0,1,0-1.28h9A.64.64,0,0,1,47.686,17.494Zm-13.4,6.019H30.234a1.171,1.171,0,0,0-1.169,1.169v4.054a1.171,1.171,0,0,0,1.169,1.169h4.054a1.171,1.171,0,0,0,1.169-1.169V24.682a1.171,1.171,0,0,0-1.169-1.169Zm-.111,5.112H30.345V24.793h3.832v3.832ZM30.73,27.057a.64.64,0,1,1,.905-.905l.386.386.821-1.015a.64.64,0,1,1,1,.805L32.568,27.9a.64.64,0,0,1-.464.237h-.034a.64.64,0,0,1-.453-.187Zm16.956-1.806a.64.64,0,0,1-.64.64h-9a.64.64,0,0,1,0-1.28h9A.64.64,0,0,1,47.686,25.251Zm0,2.917a.64.64,0,0,1-.64.64h-9a.64.64,0,0,1,0-1.28h9A.64.64,0,0,1,47.686,28.167Zm-13.4,3.1H30.234a1.171,1.171,0,0,0-1.169,1.169v4.054a1.171,1.171,0,0,0,1.169,1.169h4.054a1.171,1.171,0,0,0,1.169-1.169V32.439A1.171,1.171,0,0,0,34.288,31.27Zm-.111,5.112H30.345V32.55h3.832v3.832ZM30.73,34.814a.64.64,0,1,1,.905-.905l.386.386.821-1.015a.64.64,0,1,1,1,.805l-1.268,1.568a.64.64,0,0,1-.464.237h-.034a.64.64,0,0,1-.453-.187Zm16.956-1.806a.64.64,0,0,1-.64.64h-9a.64.64,0,0,1,0-1.28h9A.64.64,0,0,1,47.686,33.008Zm0,2.917a.64.64,0,0,1-.64.64h-9a.64.64,0,0,1,0-1.28h9A.64.64,0,0,1,47.686,35.925ZM26.195,39.861a1.328,1.328,0,0,0-1.436-.27l-1.6-1.553a8.183,8.183,0,1,0-2.144,2.349l1.531,1.485a1.328,1.328,0,0,0,.313,1.427l4.134,4.012a1.326,1.326,0,0,0,1.873-.028h0l1.493-1.538a1.326,1.326,0,0,0-.028-1.873Zm-2.4.575-.431.444-1.376-1.335q.217-.221.418-.457ZM9.28,33.816A6.888,6.888,0,1,1,16.168,40.7,6.9,6.9,0,0,1,9.28,33.816ZM29.438,44.853l-1.493,1.538a.047.047,0,0,1-.063,0l-4.134-4.012a.047.047,0,0,1,0-.063l1.493-1.538a.042.042,0,0,1,.031-.013h0a.042.042,0,0,1,.031.012l4.134,4.012a.047.047,0,0,1,0,.063ZM16.168,27.77a6.046,6.046,0,1,0,6.046,6.046A6.053,6.053,0,0,0,16.168,27.77Zm0,10.811a4.766,4.766,0,1,1,4.766-4.766A4.771,4.771,0,0,1,16.168,38.581Zm-7.691-16.3,12.191,3.2a.64.64,0,0,0,.481-.064l5.572-3.2a.64.64,0,0,0,.321-.555V11.84a.64.64,0,0,0-.478-.619L14.375,8.02a.64.64,0,0,0-.416.031l-5.573,2.4A.64.64,0,0,0,8,11.04V21.667a.64.64,0,0,0,.478.619Zm.8-10.417,10.911,2.864v9.3L9.28,21.173ZM21.471,23.762v-9.1l4.292-1.849V21.3ZM14.263,9.314l10.18,2.673L20.78,13.565,10.6,10.892Z"
                      transform="translate(-8 -7.999)"
                      fill="#0a84ff"
                    />
                  </svg>

                  <span className="">Techinical Specification</span>
                </div>
                <textarea
                  className="w-full border rounded-md p-2"
                  rows={3}
                  placeholder="Techinical Specification"
                ></textarea>
              </div>

              <div className="flex flex-col  w-full md:w-[calc(50%-0.5rem)] mb-8">
                <div className="flex items-center mb-4">
                  <svg
                    className="mr-4 h-12"
                    xmlns="http://www.w3.org/2000/svg"
                    width="35.404"
                    height="34.224"
                    viewBox="0 0 35.404 34.224"
                  >
                    <g id="website" transform="translate(-16 -24)">
                      <path
                        id="Path_39880"
                        data-name="Path 39880"
                        d="M49.634,24H17.77A1.772,1.772,0,0,0,16,25.77V56.453a1.772,1.772,0,0,0,1.77,1.77H49.634a1.772,1.772,0,0,0,1.77-1.77V25.77A1.772,1.772,0,0,0,49.634,24ZM17.77,25.18H49.634a.591.591,0,0,1,.59.59v2.95H17.18V25.77A.591.591,0,0,1,17.77,25.18ZM49.634,57.044H17.77a.591.591,0,0,1-.59-.59V29.9H50.224V56.453A.591.591,0,0,1,49.634,57.044Z"
                        fill="#0a84ff"
                      />
                      <circle
                        id="Ellipse_226"
                        data-name="Ellipse 226"
                        cx="0.773"
                        cy="0.773"
                        r="0.773"
                        transform="translate(22.955 26.318)"
                        fill="#0a84ff"
                      />
                      <circle
                        id="Ellipse_227"
                        data-name="Ellipse 227"
                        cx="0.773"
                        cy="0.773"
                        r="0.773"
                        transform="translate(20.637 26.318)"
                        fill="#0a84ff"
                      />
                      <circle
                        id="Ellipse_228"
                        data-name="Ellipse 228"
                        cx="0.773"
                        cy="0.773"
                        r="0.773"
                        transform="translate(18.318 26.318)"
                        fill="#0a84ff"
                      />
                      <path
                        id="Path_39881"
                        data-name="Path 39881"
                        d="M91.733,136H64.59a.59.59,0,0,0-.59.59v9.441a.59.59,0,0,0,.59.59H91.733a.59.59,0,0,0,.59-.59V136.59A.59.59,0,0,0,91.733,136Zm-9.673,8.738,1.413-1.413,2.116,2.116h-3Zm-.948.7H76.391l2.36-3.147Zm-6.2,0H70.444l3-4.282,2.262,3.232Zm16.227,0H87.257l-3.368-3.368a.59.59,0,0,0-.835,0l-1.711,1.711-2.121-2.828a.59.59,0,0,0-.944,0L76.448,143.4l-2.524-3.606a.59.59,0,0,0-.967,0L69,145.441H65.18V137.18H91.143Z"
                        transform="translate(-44.46 -103.739)"
                        fill="#0a84ff"
                      />
                      <ellipse
                        id="Ellipse_229"
                        data-name="Ellipse 229"
                        cx="0.386"
                        cy="0.773"
                        rx="0.386"
                        ry="0.773"
                        transform="translate(36.865 35.592)"
                        fill="#0a84ff"
                      />
                      <path
                        id="Path_39882"
                        data-name="Path 39882"
                        d="M220.13,392h-2.36a1.77,1.77,0,1,0,0,3.54h2.36a1.77,1.77,0,1,0,0-3.54Zm0,2.36h-2.36a.59.59,0,0,1,0-1.18h2.36a.59.59,0,0,1,0,1.18Z"
                        transform="translate(-185.248 -340.857)"
                        fill="#0a84ff"
                      />
                      <path
                        id="Path_39883"
                        data-name="Path 39883"
                        d="M207.671,313.18a.59.59,0,1,0,0-1.18H200.59a.59.59,0,0,0,0,1.18Z"
                        transform="translate(-170.429 -266.758)"
                        fill="#0a84ff"
                      />
                      <path
                        id="Path_39884"
                        data-name="Path 39884"
                        d="M173.571,344H160.59a.59.59,0,1,0,0,1.18h12.981a.59.59,0,1,0,0-1.18Z"
                        transform="translate(-133.379 -296.398)"
                        fill="#0a84ff"
                      />
                      <path
                        id="Path_39885"
                        data-name="Path 39885"
                        d="M113.77,344h-1.18a.59.59,0,1,0,0,1.18h1.18a.59.59,0,1,0,0-1.18Z"
                        transform="translate(-88.919 -296.398)"
                        fill="#0a84ff"
                      />
                      <path
                        id="Path_39886"
                        data-name="Path 39886"
                        d="M369.77,344h-1.18a.59.59,0,1,0,0,1.18h1.18a.59.59,0,1,0,0-1.18Z"
                        transform="translate(-326.037 -296.398)"
                        fill="#0a84ff"
                      />
                    </g>
                  </svg>

                  <span className="">Deatiled Description</span>
                </div>
                <textarea
                  className="w-full border rounded-md p-2"
                  rows={3}
                  placeholder="Deatiled Description"
                ></textarea>
              </div>
            </div>
          </div>
        </FormWraper>
      </FormSection>

      <FormSection title="Certificates" style={{ zIndex: 2 }}>
        <FormWraper>
          <div>
            <div className="flex justify-between items-center w-full gap-x-8 mb-4"></div>
            <div className={`flex flex-col`}>
              {certificates.map((c, idx) => {
                return (
                  <div key={idx} className={"w-full mb-4"}>
                    <div className="grid grid-cols-3 gap-x-4">
                      <div className="">
                        <div className="flex-1 font-semibold">
                          Certificate Company
                        </div>

                        <ComboBox
                          placeholder="Choose Company"
                          data={certificatecompanyListData}
                          contClass={styles.lCont}
                          className={styles.boxInput}
                          handleSelect={() => {}}
                          onChange={certificateHandleCompany}
                        />
                      </div>

                      <div className="">
                        <div className="flex-1 font-semibold">Certificate</div>

                        <ComboBox
                          placeholder="Certificate Title"
                          data={certificatesListData}
                          contClass={styles.lCont}
                          className={styles.boxInput}
                          handleSelect={() => {}}
                          onChange={handleCertificates}
                        />
                      </div>
                      <div className="flex items-end ">
                        <div className="">
                          <div className="flex-1 font-semibold">Quantity</div>

                          <div className="flex items-center">
                            <Input type="number" />

                            <div className="ml-4">
                              <RiDeleteBin6Line
                                className="w-5 h-5 text-red cursor-pointer"
                                onClick={() => {
                                  const shallowClone = [...certificates].filter(
                                    (_, index) => {
                                      if (idx !== index) {
                                        return true;
                                      }
                                    }
                                  );
                                  setCertificates(shallowClone);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div>
                <button
                  className="flex items-center text-blue-500"
                  onClick={() => {
                    setCertificates(
                      certificates.concat({
                        id: certificates.length + 1,
                        title: "",
                        amount: 0,
                      })
                    );
                  }}
                >
                  <FaPlus className="mr-4" />
                  Add Certificate
                </button>
              </div>
            </div>
          </div>
        </FormWraper>
      </FormSection>

      {/* <FormSection title="Fact Sheet">
        <FormWraper>
          <div className={`${settingtyles.profileSetting} flex flex-col`}>
            <div className="mb-8">
              Upload Fact Sheet for Customer Acknowledgement in{" "}
              <span className="text-red">PDF format</span>
            </div>
            <div className="flex gap-x-4 flex-wrap">
              <div className="flex flex-col w-full md:w-[calc(50%-0.5rem)] rounded-sm mb-2">
                <div className="mb-2">Work Type</div>
                <ComboBox
                  placeholder="Selected Work Type"
                  data={[]}
                  contClass={styles.lCont}
                  className={styles.boxInput}
                  handleSelect={() => {}}
                />
              </div>
              <div className="flex flex-col w-full md:w-[calc(50%-0.5rem)] mb-8">
                <div className="flex items-center mb-2">
                  <span className="">Document</span>
                </div>
                <div className="flex">
                  <label
                    htmlFor="user_manual"
                    className=" py-2 px-4 flex border w-full items-center justify-between pl-2 text-gray-400"
                  >
                    Factsheet (pdf)
                    <RiUpload2Line />
                    <input
                      type="file"
                      className="hidden"
                      name="user_manual"
                      id="user_manual"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </FormWraper>
      </FormSection> */}
      <div className="flex justify-center gap-36 mt-10 ml-[16rem] mb-10">
        <Button
          title="Submit"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          onClick={() => {}}
        />

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
  );
};

export default AddProducts;
