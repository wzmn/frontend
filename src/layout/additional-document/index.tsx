import { Disclosure, Transition } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import DNDImage, { DNDImageFileType } from "components/dnd-image";
import Input from "components/input";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { InferType, object, string } from "yup";
import * as styles from "./styles.module.scss";

const schema = object({
  name: string().trim().required("required"),
  expire: string().trim().required("required"),
});

type Schema = InferType<typeof schema>;

type ListType = Schema & {
  file?: DNDImageFileType;
};

type List = {
  additionalDocument: ListType[];
};

const AdditionalDocument = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Schema>({
    resolver: yupResolver(schema),
  });

  const { control, setValue } = useForm<List>({
    defaultValues: {
      additionalDocument: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "additionalDocument",
  });

  const onSubmit = (data: any) => {
    append(data);
  };
  return (
    <div className={styles.additionalDocumentCont}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.additionalDocument}
      >
        <table className={styles.table}>
          <tr>
            <td className={`${!!errors.name && styles.error}`}>
              <label htmlFor="">Name of Document</label>
              <Input
                {...register("name")}
                sizeVarient="small"
                placeholder="Type the name"
                varient="regular"
              />
            </td>
          </tr>
          <tr>
            <td className={`${!!errors.expire && styles.error}`}>
              <label htmlFor="">Expiry Date</label>
              <Input
                {...register("expire")}
                sizeVarient="small"
                type="date"
                placeholder="Type the name"
                varient="regular"
                // errorMessage={!errors.name + ""}
              />
            </td>
          </tr>
        </table>
        <button type="submit">
          <AiOutlinePlus />
        </button>
      </form>
      {/* {JSON.stringify(fields)} */}
      {fields.map((item, index) => (
        <Disclosure defaultOpen={!!item?.file} key={item.id}>
          {({ open }) => (
            <>
              <Disclosure.Button className={`${styles.disclosureBtn} `}>
                <span>{item.name}</span>
                <div className={styles.pts}>
                  <BiPencil
                    onClick={() => {
                      //
                    }}
                    className={styles.actionIcon}
                  />{" "}
                  &nbsp;
                  <RiDeleteBin6Line
                    onClick={() => remove(index)}
                    className={styles.actionIcon}
                  />
                  &nbsp;
                  <FaChevronDown
                    className={`${open ? "rotate-180 transform" : ""}`}
                  />
                </div>
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                //   leave="transition duration-75 ease-out"
                //   leaveFrom="transform scale-100 opacity-100"
                //   leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className={styles.panel}>
                  {/* {JSON.stringify(fields[index])} */}
                  {item?.file ? (
                    <div className={styles.preview}>
                      <img
                        src={item?.file?.preview}
                        alt="/assets/images/picture.svg"
                      />
                      <RiDeleteBin6Line
                        className="w-5 h-5 cursor-pointer absolute top-1 right-4"
                        onClick={() => {
                          update(index, { ...item, file: undefined });
                        }}
                      />
                    </div>
                  ) : (
                    <DNDImage
                      setFiles={(e) => {
                        update(index, { ...item, file: e[0] });
                      }}
                    />
                  )}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default AdditionalDocument;
