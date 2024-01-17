import { useState } from "react";

import splitMulti from "../utils/splitMulti";

export type ErrorType = {

    titleError: string;

    descError: string;

}

const useError = (errorMsg: string): 

    [ErrorType, React.Dispatch<React.SetStateAction<ErrorType>>] => {

    const [error, setError] = useState<ErrorType>({} as ErrorType);

    // error.titleError === undefined

    // Object.keys(error).length;

    if (errorMsg !== "" && Object.keys(error).length === 0) {

        const splitedError = splitMulti(errorMsg, [":", ","]);

        let titleError = "", descError = "";

        for (const text of splitedError) {

            if (text.includes("Todo Title")) titleError = text;

            else if (text.includes("Todo Description")) descError = text;
            
        }

        setError({ titleError, descError });

    }

    return [error, setError];

}

export default useError;
