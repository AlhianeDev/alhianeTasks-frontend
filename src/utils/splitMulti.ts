
export const splitMulti = (str: string, tokens: string[]) => {

    const tempToken = tokens[0];

    for (let i = 1; i < tokens.length; i++) {

       str = str.split(tokens[i]).join(tempToken);
        
    }

    const splitedStr = str.split(tempToken);

    return splitedStr;

}

export default splitMulti;
