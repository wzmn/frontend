import ComboBox from "components/combo-box";
import { useMapContext } from "providers/google-map-provider";
import React from "react";
import { fillInPrimaryAddress } from "services/geo-address";
import { PrimaryAddressFieldsT } from "type/global";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

type GeoResponseType = google.maps.places.AutocompletePrediction;

type LocationAutocompleteProps = React.InputHTMLAttributes<HTMLInputElement> & {
  setFields?: (val: PrimaryAddressFieldsT) => void;
};

const LocationAutocomplete = ({
  setFields,
  ...props
}: LocationAutocompleteProps) => {
  //you have to call this context for usePlacesAutocomplete to work
  const { setCordinates, cordinates } = useMapContext();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: ["au"],
      },
    },
  });

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
    console.log(result[0].address_components);
    const fillAddress = fillInPrimaryAddress(result[0].address_components);

    if (setFields) setFields(fillAddress);
    setCordinates(cords);
  };

  let locData = data.map((item) => ({ ...item, label: item.description }));

  return (
    <ComboBox
      data={locData}
      onChange={handleInput}
      handleSelect={handleSelect}
      {...props}
      value={value}
    />
  );
};

export default LocationAutocomplete;
