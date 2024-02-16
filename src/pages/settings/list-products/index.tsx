import React, { useState, useRef, useEffect } from "react";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import { Link } from "gatsby";
import * as styles from "styles/pages/common.module.scss";
import { RiDeleteBin6Line, RiEdit2Line, RiEyeLine } from "react-icons/ri";

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
          <div className="flex gap-4 flex-wrap justify-center md:justify-between">
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
    <div className="rounded-lg w-48 bg-slate-100 shadow-md">
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
          to={`/settings/view-product?product=${productID}`}
          className="bg-[#0A84FF] rounded-bl-lg cursor-pointer flex-1 flex justify-center py-3"
        >
            <RiEyeLine className="text-white text-xl" />
        </Link>
        <Link
          to={`/settings/edit-product?product=${productID}`}
          className="bg-[#97dc21] cursor-pointer flex-1 flex justify-center py-3"
        >
          <RiEdit2Line className="text-white text-xl" />
        </Link>
        <div
          className="bg-red cursor-pointer rounded-br-lg flex-1 flex justify-center py-3"
          onClick={() => {
            setIsDeleting(!isDeleting);
          }}
        >
          {isDeleting ? (
            <img src="/assets/loader/Spinner.svg" className="w-5" />
          ) : (
            <RiDeleteBin6Line className="text-white text-xl" />
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProducts;
