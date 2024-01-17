import { useEffect, useState } from "react";

const useLocalStorage = <T> (key: string, initialValue: T): [T, (value: T) => void] => {

    const [value, setValue] = useState<T>(() => {

        if (localStorage.getItem(key)) {

            return JSON.parse(localStorage.getItem(key) || "{}");

        } else return initialValue;

    });

    useEffect(() => {

        localStorage.setItem(key, JSON.stringify(value));

    }, [key, value]);

    return [value, setValue];

}

export default useLocalStorage;
