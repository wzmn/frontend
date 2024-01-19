import React, { useState, useRef, useEffect } from "react";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import { Link } from "gatsby";
import * as styles from "styles/pages/common.module.scss";
import { RiDeleteBin6Line } from "react-icons/ri";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(Array(10).fill(0) as any);
  }, []);
  return (
    <div className="grow">
      <p className={styles.title}>Settings/My Products</p>
      <FormSection title="My Products">
        <FormWraper>
          <div className="flex gap-4 flex-wrap justify-center">
            {products?.map((s) => (
              <Card productID={1} />
            ))}
          </div>
        </FormWraper>
      </FormSection>
    </div>
  );
};
function Card({ productID }: any) {
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <div className="rounded-lg w-[calc(25%-1rem)] bg-slate-100">
      <div className="w-full p-4">
        <img src="/assets/images/product.png" alt="Product Image" />
      </div>
      <div className="p-4 text-sm">
        <div className="mb-2 font-semibold">Hot Water Pump</div>
        <ul className="list-disc pl-4">
          <li className="mb-2">Is Energy Safe</li>
          <li className="mb-2">Consumption of Less Energy</li>
        </ul>
        <div className="font-bold mb-2">$ 1200</div>
      </div>
      <div className="flex">
        <Link
          to={`view?product=${productID}`}
          className="bg-[#0A84FF] text-white grow py-2 px-2 text-center rounded-bl-lg"
        >
          View
        </Link>
        <div
          className="bg-red w-12 flex items-center justify-center rounded-br-lg cursor-pointer"
          onClick={() => {
            setIsDeleting(!isDeleting);
          }}
        >
          {isDeleting ? (
            <img src="/assets/loader/Spinner.svg" className="w-10" />
          ) : (
            <RiDeleteBin6Line className="text-white" />
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProducts;
