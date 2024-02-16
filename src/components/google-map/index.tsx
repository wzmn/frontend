import {
  GoogleMap,
  Marker,
  // useJsApiLoader,
  // useLoadScript,
} from "@react-google-maps/api";
import React, { useState } from "react";
import * as styles from "./styles.module.scss";
import { useMapContext } from "providers/google-map-provider";
import { LatLng } from "use-places-autocomplete";
import { request } from "services/http-request";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Geolocation = () => {
  // const [zoom, setZoom] = useState<number>(0);

  //you have to call this context for map to work
  const [formatedComponents, setFormatedComponents] =
    useState<google.maps.GeocoderResult["address_components"]>();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setZoom(10);
  //   }, 2000);
  // }, []);

  async function getFomatedAddress({ lat, lng }: LatLng) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBO-6AKRGl3NxAyPB3g4ns9mb_qHdirGq0&libraries=places`
      );
      setFormatedComponents(() => response.data.address_components);
    } catch (error) {}
  }

  function Map() {
    const { isLoaded, cordinates, setCordinates } = useMapContext();

    return (
      <div className={styles.map}>
        {isLoaded ? (
          <GoogleMap
            //   ref={mapRef}
            options={{
              panControl: false,
            }}
            onClick={(e) => {
              console.log(e.latLng?.lat());

              const cords: LatLng = {
                lat: e.latLng?.lat()!,
                lng: e.latLng?.lng()!,
              };

              setCordinates(cords);

              getFomatedAddress(cords);
            }}
            mapContainerStyle={containerStyle}
            center={cordinates}
            zoom={10}
            // onLoad={onLoad}
            // onUnmount={onUnmount}
          >
            <>
              <Marker
                //   onLoad={}
                position={cordinates}
              />
            </>
          </GoogleMap>
        ) : (
          <>Loading</>
        )}
      </div>
    );
  }

  return {
    formatedComponents,
    Map,
  };
};

export default Geolocation;
