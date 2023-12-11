import ComboBox from "components/combo-box";
import { useMapContext } from "providers/google-map-provider";
import React, { FocusEvent } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

type GeoResponseType = google.maps.places.AutocompletePrediction;

type LocationAutocompleteProps = {
  onFocus?: (e: FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement, Element>) => void;
};

const LocationAutocomplete = ({
  onFocus,
  onBlur,
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
    console.log(dt);
    setValue(dt.description, false);
    const result: google.maps.GeocoderResult[] = await getGeocode({
      address: dt.description,
    });
    const cords = getLatLng(result[0]);
    console.log(cords);
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
