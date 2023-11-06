import { UseLocalStorageP1Type } from "type/auth";
import { useEffect, useState } from "react";

type ReturnType<T> = [T, React.Dispatch<T | null>];

const useLocalStorage = <T = any>(
  keyName: UseLocalStorageP1Type,
  defaultValue: T | null = null
): ReturnType<T> => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: any) => {
    try {
      localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
