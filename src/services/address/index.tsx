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
  address: AddressSchemaT;
};

const Address = () => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<AddressT>(); // retrieve all hook methods
  const address = watch("address");
  const { city, district, postcode } = useAddressLabelContext();
  const { open, toggle, setElement } = useRightBarContext();
  const { formatedComponents, Map } = Geolocation();

  return (
    <>
      <div className="mb-10">
        <LocationAutocomplete
          placeholder="Search Place..."
          onFocus={(e) => {
            !open && setElement(<Map />, "Map");
            !open && toggle();
          }}
          onBlur={(e) => {
            // toggle();
            // console.log("off focused");
          }}
          setFields={(val) => {
            console.log(val);
            setValue("address", val as AddressSchemaT);
          }}
        />
      </div>

      <div className={styles.formGrid}>
        <div className="max-w-3xl">
          <TextField
            title="Building Name"
            // asterisk
            {...register("address.building_number")}
            errorMessage={errors.address?.building_number?.message}
          />
        </div>
        <div className="max-w-3xl">
          <TextField
            title="Level No"
            // asterisk
            {...register("address.level_number")}
            errorMessage={errors.address?.level_number?.message}
          />
        </div>
        <div className="max-w-3xl">
          <SelectBox
            color="full-white"
            placeholder="Select Unit Type"
            data={UnitTypes}
            asterisk
            value={address?.unit_type!}
            onChange={(e) => {
              setValue("address.unit_type", e.label);
            }}
          />
        </div>
        <div className="max-w-3xl">
          <TextField
            title="Unit No"
            asterisk
            {...register("address.unit_number")}
            errorMessage={errors.address?.unit_number?.message}
          />
        </div>

        <div className="max-w-3xl">
          <TextField
            title="Lot No."
            // asterisk
            {...register("address.lot_number")}
            errorMessage={errors.address?.lot_number?.message}
          />
        </div>

        <div className="max-w-3xl">
          <TextField
            title="Street No"
            // asterisk
            {...register("address.street_number")}
            errorMessage={errors.address?.street_number?.message}
          />
        </div>

        <div className="max-w-3xl">
          <TextField
            title="Street Name"
            asterisk
            {...register("address.street_name")}
            errorMessage={errors.address?.street_name?.message}
          />
        </div>

        <div className="max-w-3xl">
          <SelectBox
            color="full-white"
            placeholder="Street Type"
            data={StreetTypes}
            // asterisk
            value={address?.street_type!}
            onChange={(e) => {
              setValue("address.street_type", e.label);
            }}
          />
        </div>

        <div className="max-w-3xl">
          <TextField
            title="Suffix."
            // asterisk
            {...register("address.suffix")}
            errorMessage={errors.address?.suffix?.message}
          />
        </div>
        <div className="max-w-3xl">
          <TextField
            title={district()}
            asterisk
            {...register("address.suburb")}
            errorMessage={errors.address?.suburb?.message}
          />
        </div>

        <div className="max-w-3xl">
          <Label title="State" />
          <SelectBox
            color="full-white"
            placeholder="State"
            data={States}
            asterisk
            value={address?.state}
            onChange={(e) => {
              setValue("address.state", e.label);
            }}
          />
          <p className={`${styles.error} text-xs mt-1`}>
            {errors.address?.state?.message}
          </p>
        </div>
        <div className="max-w-3xl">
          <TextField
            title={postcode()}
            asterisk
            {...register("address.pincode")}
            errorMessage={errors.address?.pincode?.message}
          />
        </div>

        <div className="max-w-3xl">
          <TextField
            title={city()}
            asterisk
            {...register("address.lga")}
            errorMessage={errors.address?.lga?.message}
          />
        </div>
      </div>
    </>
  );
};

export default Address;
