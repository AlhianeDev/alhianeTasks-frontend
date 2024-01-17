import { useState } from "react";

type BindType = {

    value: string;

    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

export const useInput = (initalValue = ""):

    [string, BindType, (resetValue?: string) => void] => {

    const [value, setValue] = useState(initalValue);

    const reset = (resetValue = "") => {

        setValue(resetValue);

    }

    const bind = {

        value,

        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {

            setValue(event.target.value);

        }

    }

    return [value, bind, reset];

}
