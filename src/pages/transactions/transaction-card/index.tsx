import { Disclosure } from "@headlessui/react";
import Button from "components/button";
import Divider from "components/divider";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import * as commonStyles from "styles/pages/common.module.scss";
import * as styles from "../styles.module.scss";

const TransactionCard = () => {
  return (
    <div>
      <div className={`${styles.profileSetting} ${styles.mtb}`}>
        <p className={styles.textBold}>Order ID: OD152595555</p>

        <p className={styles.userSettings}>Download Invoice</p>
      </div>
      <Divider />
      <p className={styles.mtb}>
        <span className={styles.textBold}>Order Placed:</span>
        15 December 2023
      </p>

      <p className={styles.mtb}>
        <span className={styles.textBold}>Order Completed:</span>
        18 December 2023
      </p>
      <Divider />

      <Disclosure>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of an icon. */
          <>
            <Disclosure.Button className={` ${open ? "" : ""} ${styles.mtb}`}>
              <div className={styles.dwBtn}>
                <p className="">
                  <span className={styles.textBold}>Batch Name:</span>
                  CLU ASSESSMENT(03)
                </p>

                <FaChevronDown
                  className={`${open ? "rotate-180 transform" : ""}`}
                />
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className={`${styles.panel} mb-5`}>
              {[1, 2, 3].map((item: number) => {
                return <List data={{}} />;
              })}
            </Disclosure.Panel>

            {!open && <Divider />}
          </>
        )}
      </Disclosure>

      <p className={styles.mtb}>
        <span className={styles.textBold}>Price:</span>
        <div className={styles.priceTag}>
          <Button title="$1200" />
        </div>
      </p>
    </div>
  );
};

function List({ data }: { data: any }) {
  const { card, cardInfo, contactInfo, icon, contact } = commonStyles;
  // const { open, setElement, toggle } = useRightBarContext();

  return (
    <div className={`${styles.card} ${styles.cardBorder}`}>
      <div className={styles.cardInfo}>
        <p className="mb-2">
          {/* {data.user?.first_name} */}
          Jason Stone
        </p>
        <p className="mb-2">
          {" "}
          {/* Created on: {TimeFormat(data.user?.created_at,'ddd, MM a')} */}
          created on: Mon,3.40 am
        </p>
      </div>
      <div className={`${styles.contactInfo} ${styles.contact}`}>
        <div className="flex gap-2 items-center">
          <span className={styles.icon}>
            <TfiEmail className={styles.icon} />
          </span>

          <span className={styles.contact}>
            {/* {data.user?.email} */}
            jason@gmail.com
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <span className={styles.icon}>
            <IoCallOutline className={styles.icon} />
          </span>

          <span className={styles.contact}>
            {/* {data.user?.phone} */}
            jason@gmail.com
          </span>
        </div>

        <LuClipboardList className={styles.absIcon} />
        <p className={styles.count}>3</p>
      </div>
    </div>
  );
}

export default TransactionCard;
