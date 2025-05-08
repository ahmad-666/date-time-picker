import { useState, useCallback } from 'react';
import Cookie from 'js-cookie';

type CookieAttributes = {
    domain?: string;
    path?: string;
    expires?: number | Date;
    secure?: boolean;
    sameSite?: 'none' | 'strict' | 'lax';
};
type UseCookieArgs = {
    name: string;
    defaultValue?: string;
    options?: CookieAttributes;
};
const DEFAULT_OPTIONS: CookieAttributes = {
    path: '/',
    expires: 365
};

const useCookie = ({ name, defaultValue = '', options = DEFAULT_OPTIONS }: UseCookieArgs) => {
    const [value, setValue] = useState<string>(() => {
        const currVal = Cookie.get(name);
        if (currVal) return currVal;
        else {
            Cookie.set(name, defaultValue, options);
            return defaultValue;
        }
    });
    const updateCookie = useCallback(
        ({ value, options = DEFAULT_OPTIONS }: { value: string; options?: CookieAttributes }) => {
            Cookie.set(name, value, options);
            setValue(value);
        },
        [name]
    );
    const deleteCookie = useCallback(() => {
        Cookie.remove(name, options);
        setValue('');
    }, [name, options]);
    return { value, updateCookie, deleteCookie };
};

export default useCookie;

//? USAGE:
//* cookie is alway string , for objects,arrays,... we can use JSON.stringify()
/*
    Comp1.tsx: //we want to set cookie
        const {value,updateCookie} = useCookie({name:'order_id',defaultValue: "",options:{path:'/',expires:365}})
        updateCookie({value:'new-value'})
    Comp2.tsx: //we want to get,delete cookie
        const {value,deleteCookie} = useCookie({name:'order_id'})
        const onClick = () => {deleteCookie()}
        <h1>{value}</h1>
*/
