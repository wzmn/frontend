import ComboBox from "components/combo-box";
import { useMapContext } from "providers/google-map-provider";
import React, { FocusEvent } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { FieldsT } from "./types";

type GeoResponseType = google.maps.places.AutocompletePrediction;

type LocationAutocompleteProps = {
  onFocus?: (e: FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement, Element>) => void;
  setFields?: (val: FieldsT) => void;
};

function fillInPrimaryAddress(
  address_components: google.maps.GeocoderResult["address_components"]
): FieldsT {
  const fileds = {
    building_number: "",
    level_number: "",
    unit_type: "",
    unit_number: "",
    lot_number: "",
    street_number: "",
    street_name: "",
    street_type: "",
    suffix: "",
    suburb: "",
    state: "",
    pincode: "",
    lga: "",
  };
  for (const component of address_components) {
    // @ts-ignore remove once typings fixed
    const componentType = component.types[0];

    switch (componentType) {
      //building name
      case "premise": {
        fileds.building_number = component.long_name;
        break;
      }
      //level_number
      case "subpremise": {
        fileds.level_number = component.long_name;
        break;
      }
      //street number
      case "street_number": {
        fileds.street_number = component.long_name;
        break;
      }
      //street name
      case "route": {
        fileds.street_name = component.long_name;
        break;
      }
      //suffix
      case "postal_code_suffix": {
        fileds.suffix = component.long_name;
        break;
      }
      //state
      case "administrative_area_level_1": {
        fileds.state = component.short_name;
        break;
      }
      //pincode
      case "postal_code": {
        fileds.pincode = component.long_name;
        break;
      }
      case "administrative_area_level_2": {
        fileds.lga = component.long_name;
        break;
      }
      //suburb
      case "locality": {
        fileds.suburb = component.long_name;
        break;
      }
    }
  }

  return fileds;
}

const LocationAutocomplete = ({
  onFocus,
  onBlur,
  setFields,
}: LocationAutocompleteProps) => {
  //you have to call this context for usePlacesAutocomplete to work
  const { setCordinates, cordinates } = useMapContext();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  let a: google.maps.places.AutocompletePrediction[];

  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  const handleSelect = async (val: any) => {
    const dt = val as GeoResponseType;
    setValue(dt.description, false);
    const result: google.maps.GeocoderResult[] = await getGeocode({
      address: dt.description,
    });
    const cords = getLatLng(result[0]);

    const fillAddress = fillInPrimaryAddress(result[0].address_components);
    console.log(result[0]);

    if (setFields) setFields(fillAddress);
    setCordinates(cords);
  };

  let locData = data.map((item) => ({ ...item, label: item.description }));

  return (
    <>
      <ComboBox
        data={locData}
        handleInput={handleInput}
        handleSelect={handleSelect}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </>
  );
};

export default LocationAutocomplete;
