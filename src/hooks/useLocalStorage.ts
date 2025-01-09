import { useEffect, useState } from "react";

const useLocalStorage = (key: string, initValue: string = "") => {
  const [storedValue, setStoredValue] = useState(() => {
    return localStorage.getItem(key || initValue);
  });

  const setValue = (value: string) => {
    setStoredValue(value);
    localStorage.setItem(key, value);

    // 다른 탭/컴포넌트에도 변경사항 알림
    window.dispatchEvent(
      new StorageEvent("storage", { key, newValue: JSON.stringify(value) })
    );
  };

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(event.newValue ? JSON.parse(event.newValue) : initValue);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [key, initValue]);

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
