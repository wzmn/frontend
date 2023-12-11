import {
  GoogleMap,
  Marker,
  // useJsApiLoader,
  // useLoadScript,
} from "@react-google-maps/api";
import React from "react";
import * as styles from "./styles.module.scss";
import { useMapContext } from "providers/google-map-provider";
import { LatLng } from "use-places-autocomplete";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Geolocation = () => {
  // const [zoom, setZoom] = useState<number>(0);

  //you have to call this context for map to work
  const { isLoaded, cordinates, setCordinates } = useMapContext();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setZoom(10);
  //   }, 2000);
  // }, []);

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
          }}
          mapContainerStyle={containerStyle}
          center={cordinates}
          zoom={10}
          // onLoad={onLoad}
          // onUnmount={onUnmount}
        >
          <>
            jhb
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
};

export default Geolocation;
