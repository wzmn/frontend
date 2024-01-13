import Geolocation from "components/google-map";
import Label from "components/label";
import LocationAutocomplete from "components/location-autocomplete";
import SelectBox from "components/selectBox";
import TextField from "components/text-field";
import { useAddressLabelContext } from "providers/address-labels";
import { useRightBarContext } from "providers/right-bar-provider";
import React from "react";
import { useFormContext } from "react-hook-form";
import { AddressSchemaT } from "schema/address-schema";
import * as styles from "styles/pages/common.module.scss";
import { States, StreetTypes, UnitTypes } from "../../constants";
import TextButton from "components/text-button";
import * as localStyle from "./styles.module.scss";

const countries = [
  { label: "UK" },
  { label: "USA" },
  { label: "IND" },
  { label: "CAD" },
  { label: "RUS" },
  { label: "JAP" },
  { label: "AUS" },
  { label: "NZL" },
];

type AddressT = {
  [key in string]: AddressSchemaT;
};

const Address = ({ wat = "address" }) => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<AddressT>(); // retrieve all hook methods
  const address = watch(wat);
  const { city, district, postcode } = useAddressLabelContext();
  const { open, toggle, setElement } = useRightBarContext();
  const { formatedComponents, Map } = Geolocation();

  return (
    <>
      <div className={localStyle.searchGrid}>
        <LocationAutocomplete
          placeholder="Search Place..."
          // onFocus={(e) => {

          // }}
          onBlur={(e) => {
            // toggle();
            // console.log("off focused");
          }}
          setFields={(val) => {
            console.log(val);
            setValue(wat, val as AddressSchemaT);
          }}
        />
        <TextButton
          type="button"
          className={localStyle.viewInMapBtn}
          label="View in Map"
          onClick={() => {
            !open && setElement(<Map />, "Map");
            !open && toggle();
          }}
        />
      </div>

      <div className={styles.formGrid}>
        <div className="max-w-3xl">
          <TextField
            title="Building Name"
            // asterisk
            {...register(`${wat}.building_number`)}
            errormessage={errors[wat]?.building_number?.message}
          />
        </div>
        <div className="max-w-3xl">
          <TextField
            title="Level No"
            // asterisk
            {...register(`${wat}.level_number`)}
            errormessage={errors[wat]?.level_number?.message}
          />
        </div>

        <div className="max-w-3xl">
          <TextField
            title="Unit No"
            {...register(`${wat}.unit_number`)}
            errormessage={errors[wat]?.unit_number?.message}
          />
        </div>

        <div className="max-w-3xl">
          <TextField
            title="Lot No"
            // asterisk
            {...register(`${wat}.lot_number`)}
            errormessage={errors[wat]?.lot_number?.message}
          />
        </div>

        <div className="max-w-3xl">
          <TextField
            title="Street No"
            // asterisk
            {...register(`${wat}.street_number`)}
            errormessage={errors[wat]?.street_number?.message}
          />
        </div>

        <div className="max-w-3xl">
          <TextField
            title="Street Name"
            asterisk
            {...register(`${wat}.street_name`)}
            errormessage={errors[wat]?.street_name?.message}
          />
        </div>

        <div className="max-w-3xl">
          <TextField
            title="Suffix"
            // asterisk
            {...register(`${wat}.suffix`)}
            errormessage={errors[wat]?.suffix?.message}
          />
        </div>
        <div className="max-w-3xl">
          <TextField
            title={district()}
            asterisk
            {...register(`${wat}.suburb`)}
            errormessage={errors[wat]?.suburb?.message}
          />
        </div>

        <div className="max-w-3xl">
          <TextField
            title={postcode()}
            asterisk
            {...register(`${wat}.pincode`)}
            errormessage={errors[wat]?.pincode?.message}
          />
        </div>

        <div className="max-w-3xl">
          <TextField
            title={city()}
            asterisk
            {...register(`${wat}.lga`)}
            errormessage={errors[wat]?.lga?.message}
          />
        </div>

        <div className="max-w-3xl">
          <Label title="State" />
          <SelectBox
            name="State"
            color="full-white"
            placeholder="State"
            data={States}
            asterisk
            value={address?.state}
            onChange={(e) => {
              setValue(`${wat}.state`, e.label);
            }}
          />
          <p className={`${styles.error} text-xs mt-1`}>
            {errors[wat]?.state?.message}
          </p>
        </div>

        <div className="max-w-3xl">
          <Label title="Select Unit Type" />

          <SelectBox
            name="Select_Unit_Type"
            color="full-white"
            placeholder="Select Unit Type"
            data={UnitTypes}
            asterisk
            value={address?.unit_type!}
            onChange={(e) => {
              setValue(`${wat}.unit_type`, e.label);
            }}
          />
        </div>

        <div className="max-w-3xl">
          <Label title="Street Type" />

          <SelectBox
            color="full-white"
            name="Street_Type"
            placeholder="Street Type"
            data={StreetTypes}
            // asterisk
            value={address?.street_type!}
            onChange={(e) => {
              setValue(`${wat}.street_type`, e.label);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Address;
