import ComboBox, { ComboBoxDataT } from "components/combo-box";
import SelectList from "components/select-list";
import { useCompanyContext } from "providers/company-provider";
import { useSidebarContext } from "providers/sidebar-provider";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaGripLines } from "react-icons/fa";
import companyList from "services/company-list";
import UserIdentifyer from "services/user-identifyer";
import { Result } from "type/company";
import { debounce } from "utility/debounce";
import * as styles from "./styles.module.scss";

const data = [
  { label: "Wade Cooper" },
  { label: "Arlene Mccoy" },
  { label: "Devon Webb" },
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

const hasUnreadNotifications = false;

const Navbar = () => {
  const { toggle } = useSidebarContext();
  const { navbar, burger, rightSide, leftSide } = styles;
  const { company, setCompany } = useCompanyContext();
  const [companyListData, setCompanyListData] = useState<ComboBoxDataT[]>([]);
  const userRole = UserIdentifyer();

  const handleCompany = debounce(async (e?: ChangeEvent<HTMLInputElement>) => {
    const res = await companyList({
      search: e?.target?.value ?? "",
    });

    const companyFilteredList = res.results?.map((item) => ({
      label: item.company_name,
      ...item,
    })) as ComboBoxDataT[];

    JSON.stringify(company) === "{}" && setCompany(res.results![0]);

    setCompanyListData(() => companyFilteredList);
  });

  useEffect(() => {
    handleCompany();
  }, []);

  return (
    <>
      {userRole === "superadmin" ? (
        <div className={styles.navbar}>
          <div className={styles.leftSide}>
            <FaGripLines onClick={toggle} className={styles.burger} />
            <div className="ml-1">
              <ComboBox<Result>
                placeholder={company?.company_name}
                data={companyListData}
                handleSelect={(e) => {
                  setCompany(e);
                }}
                onChange={handleCompany}
              />
            </div>
          </div>
          <div className={styles.rightSide}>
            {/* <svg id="notification" xmlns="http://www.w3.org/2000/svg" width="24.394" height="27.113" viewBox="0 0 24.394 27.113">
          <g id="Group_249" data-name="Group 249">
            <path id="Path_238" data-name="Path 238" d="M38.867,17.147V12a9.014,9.014,0,0,0-5.8-8.409,3.072,3.072,0,0,0,.061-.6,2.975,2.975,0,1,0-5.95,0,3.21,3.21,0,0,0,.057.582,8.732,8.732,0,0,0-5.793,8.239v5.34a.346.346,0,0,1-.344.346,3.129,3.129,0,0,0-3.128,2.764,3.058,3.058,0,0,0,3.036,3.359h5.253a3.917,3.917,0,0,0,7.788,0H39.3a3.055,3.055,0,0,0,2.256-1,3.064,3.064,0,0,0-2.348-5.121.343.343,0,0,1-.344-.346Zm-8.712-15.4a1.237,1.237,0,0,1,1.233,1.238,1.073,1.073,0,0,1-.017.166,7.69,7.69,0,0,0-.9-.083,8.941,8.941,0,0,0-1.533.087,1.073,1.073,0,0,1-.017-.166,1.238,1.238,0,0,1,1.233-1.242Zm0,23.615a2.188,2.188,0,0,1-2.134-1.749H32.29A2.187,2.187,0,0,1,30.155,25.364Zm10.45-4.942a1.305,1.305,0,0,1-1.3,1.443H21.008a1.312,1.312,0,0,1-1.3-1.443A1.371,1.371,0,0,1,21.1,19.242a2.094,2.094,0,0,0,2.086-2.095v-5.34a6.986,6.986,0,0,1,6.969-7c.087,0,.17,0,.257,0A7.143,7.143,0,0,1,37.125,12v5.152a2.094,2.094,0,0,0,2.086,2.095A1.374,1.374,0,0,1,40.605,20.422Z" transform="translate(-17.958 0)"/>
            {hasUnreadNotifications && <circle id="Ellipse_3" data-name="Ellipse 3" cx="5" cy="5" r="5" transform="translate(14.288 1)" fill="#fed000"/>}
          </g>
        </svg> */}
            <SelectList />
            <a href="https://support.snippit.com.au/" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="29.55" height="29.532" viewBox="0 0 29.55 29.532">
                <g id="help" transform="translate(-5.999 -6.036)">
                  <g id="LWPOLYLINE" transform="translate(15.967 13.443)">
                    <g id="Group_1964" data-name="Group 1964" transform="translate(0)">
                      <path id="Path_39488" data-name="Path 39488" d="M27.961,30.342h-.01A1.137,1.137,0,0,1,26.824,29.2l.005-.568a.939.939,0,0,1,.005-.1,5.442,5.442,0,0,1,2.138-3.481c.3-.276.582-.537.823-.809a1.539,1.539,0,0,0,.272-1.829,2.511,2.511,0,0,0-2.759-.989,2.114,2.114,0,0,0-1.536,1.609,1.137,1.137,0,0,1-2.2-.588A4.311,4.311,0,0,1,26.8,19.2a4.73,4.73,0,0,1,5.261,2.114,3.8,3.8,0,0,1-.566,4.428,13.6,13.6,0,0,1-.982.971c-.816.753-1.325,1.257-1.412,1.984l0,.513a1.135,1.135,0,0,1-1.136,1.128Z" transform="translate(-23.537 -19.069)" />
                    </g>
                  </g>
                  <g id="POINT" transform="translate(19.254 25.871)">
                    <g id="Group_1965" data-name="Group 1965">
                      <path id="Path_39489" data-name="Path 39489" d="M30.457,43.189a1.146,1.146,0,0,1-.8-.33,1.132,1.132,0,0,1,0-1.608,1.176,1.176,0,0,1,1.6,0,1.127,1.127,0,0,1,.335.8,1.126,1.126,0,0,1-1.137,1.137Z" transform="translate(-29.32 -40.935)" />
                    </g>
                  </g>
                  <g id="CIRCLE_2_" transform="translate(5.999 6.036)">
                    <g id="Group_1966" data-name="Group 1966">
                      <path id="Path_39490" data-name="Path 39490" d="M20.733,35.568a14.658,14.658,0,0,1-3.81-.5A14.776,14.776,0,1,1,27.374,7.573a14.774,14.774,0,0,1-6.641,27.995ZM20.8,8.309a12.5,12.5,0,0,0-3.29,24.563,12.4,12.4,0,0,0,3.219.423h0A12.5,12.5,0,0,0,26.358,9.607,12.474,12.474,0,0,0,20.8,8.309Z" transform="translate(-5.999 -6.036)" />
                    </g>
                  </g>
                </g>
              </svg>
            </a>
          </div>
        </div>
      ) : (
        <div className={styles.navbar}>
          <div className={styles.leftSide}>
            <FaGripLines onClick={toggle} className={styles.burger} />
          </div>
          <div className={styles.rightSide}>
            <svg
              id="notification"
              xmlns="http://www.w3.org/2000/svg"
              width="24.394"
              height="27.113"
              viewBox="0 0 24.394 27.113"
            >
              <g id="Group_249" data-name="Group 249">
                <path
                  id="Path_238"
                  data-name="Path 238"
                  d="M38.867,17.147V12a9.014,9.014,0,0,0-5.8-8.409,3.072,3.072,0,0,0,.061-.6,2.975,2.975,0,1,0-5.95,0,3.21,3.21,0,0,0,.057.582,8.732,8.732,0,0,0-5.793,8.239v5.34a.346.346,0,0,1-.344.346,3.129,3.129,0,0,0-3.128,2.764,3.058,3.058,0,0,0,3.036,3.359h5.253a3.917,3.917,0,0,0,7.788,0H39.3a3.055,3.055,0,0,0,2.256-1,3.064,3.064,0,0,0-2.348-5.121.343.343,0,0,1-.344-.346Zm-8.712-15.4a1.237,1.237,0,0,1,1.233,1.238,1.073,1.073,0,0,1-.017.166,7.69,7.69,0,0,0-.9-.083,8.941,8.941,0,0,0-1.533.087,1.073,1.073,0,0,1-.017-.166,1.238,1.238,0,0,1,1.233-1.242Zm0,23.615a2.188,2.188,0,0,1-2.134-1.749H32.29A2.187,2.187,0,0,1,30.155,25.364Zm10.45-4.942a1.305,1.305,0,0,1-1.3,1.443H21.008a1.312,1.312,0,0,1-1.3-1.443A1.371,1.371,0,0,1,21.1,19.242a2.094,2.094,0,0,0,2.086-2.095v-5.34a6.986,6.986,0,0,1,6.969-7c.087,0,.17,0,.257,0A7.143,7.143,0,0,1,37.125,12v5.152a2.094,2.094,0,0,0,2.086,2.095A1.374,1.374,0,0,1,40.605,20.422Z"
                  transform="translate(-17.958 0)"
                />
                {hasUnreadNotifications && (
                  <circle
                    id="Ellipse_3"
                    data-name="Ellipse 3"
                    cx="5"
                    cy="5"
                    r="5"
                    transform="translate(14.288 1)"
                    fill="#fed000"
                  />
                )}
              </g>
            </svg>
            <a href="https://support.snippit.com.au/" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="29.55" height="29.532" viewBox="0 0 29.55 29.532">
                <g id="help" transform="translate(-5.999 -6.036)">
                  <g id="LWPOLYLINE" transform="translate(15.967 13.443)">
                    <g id="Group_1964" data-name="Group 1964" transform="translate(0)">
                      <path id="Path_39488" data-name="Path 39488" d="M27.961,30.342h-.01A1.137,1.137,0,0,1,26.824,29.2l.005-.568a.939.939,0,0,1,.005-.1,5.442,5.442,0,0,1,2.138-3.481c.3-.276.582-.537.823-.809a1.539,1.539,0,0,0,.272-1.829,2.511,2.511,0,0,0-2.759-.989,2.114,2.114,0,0,0-1.536,1.609,1.137,1.137,0,0,1-2.2-.588A4.311,4.311,0,0,1,26.8,19.2a4.73,4.73,0,0,1,5.261,2.114,3.8,3.8,0,0,1-.566,4.428,13.6,13.6,0,0,1-.982.971c-.816.753-1.325,1.257-1.412,1.984l0,.513a1.135,1.135,0,0,1-1.136,1.128Z" transform="translate(-23.537 -19.069)" />
                    </g>
                  </g>
                  <g id="POINT" transform="translate(19.254 25.871)">
                    <g id="Group_1965" data-name="Group 1965">
                      <path id="Path_39489" data-name="Path 39489" d="M30.457,43.189a1.146,1.146,0,0,1-.8-.33,1.132,1.132,0,0,1,0-1.608,1.176,1.176,0,0,1,1.6,0,1.127,1.127,0,0,1,.335.8,1.126,1.126,0,0,1-1.137,1.137Z" transform="translate(-29.32 -40.935)" />
                    </g>
                  </g>
                  <g id="CIRCLE_2_" transform="translate(5.999 6.036)">
                    <g id="Group_1966" data-name="Group 1966">
                      <path id="Path_39490" data-name="Path 39490" d="M20.733,35.568a14.658,14.658,0,0,1-3.81-.5A14.776,14.776,0,1,1,27.374,7.573a14.774,14.774,0,0,1-6.641,27.995ZM20.8,8.309a12.5,12.5,0,0,0-3.29,24.563,12.4,12.4,0,0,0,3.219.423h0A12.5,12.5,0,0,0,26.358,9.607,12.474,12.474,0,0,0,20.8,8.309Z" transform="translate(-5.999 -6.036)" />
                    </g>
                  </g>
                </g>
              </svg>
            </a>
          </div>
        </div>
      )}


    </>
  );
};

export default Navbar;
