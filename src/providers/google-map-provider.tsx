import { useJsApiLoader, useLoadScript } from "@react-google-maps/api";
import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type CoordinatesType = {
  lat: number;
  lng: number;
};

type MapProviderType = {
  isLoaded: boolean;
  cordinates: CoordinatesType;
  setCordinates: Dispatch<SetStateAction<CoordinatesType>>;
};

const MapProvider = createContext({} as MapProviderType);

export const useMapContext = () => useContext(MapProvider);
const GoogleMapProvider = ({ children }: { children: JSX.Element }) => {
  const [cordinates, setCordinates] = useState<CoordinatesType>({
    lat: -33.865143,
    lng: 151.2099,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBO-6AKRGl3NxAyPB3g4ns9mb_qHdirGq0",
    libraries: ["places"],
  });

  return (
    <MapProvider.Provider value={{ isLoaded, cordinates, setCordinates }}>
      {children}
    </MapProvider.Provider>
  );
};

export default GoogleMapProvider;
