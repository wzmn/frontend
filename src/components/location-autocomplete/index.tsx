import { Combobox, Transition } from "@headlessui/react";
import { useMapContext } from "providers/google-map-provider";
import React, { FocusEvent, Fragment } from "react";
import { IoIosArrowDown } from "react-icons/io";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import * as styles from "./styles.module.scss";

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

  return (
    <>
      <div className=" z-50 w-full">
        <Combobox value={value} onChange={handleSelect}>
          <div className="relative mt-1">
            <div className={styles.boxInputCont}>
              <Combobox.Input
                placeholder="Location"
                onFocus={onFocus}
                onBlur={onBlur}
                className={styles.boxInput}
                displayValue={() => value}
                onChange={handleInput}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <IoIosArrowDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              //   afterLeave={() => setValue("")}
            >
              <Combobox.Options className={styles.boxOptions}>
                {data?.length === 0 && value !== "" ? (
                  <div className={styles.option}>Nothing found.</div>
                ) : (
                  data?.map((loc: GeoResponseType) => (
                    <Combobox.Option
                      key={loc.place_id}
                      className={({ active }) =>
                        `${styles.option} ${active && styles.active}
                        }`
                      }
                      value={loc}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {loc.description}
                          </span>
                          {/* {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null} */}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </>
  );
};

export default LocationAutocomplete;
