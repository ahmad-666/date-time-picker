import { useState, useRef, useEffect } from 'react';

type UseDebounceArgs<T> = {
    value: T;
    timeout: number;
};
const useDebounce = <T>({ value, timeout = 1000 }: UseDebounceArgs<T>) => {
    const timer = useRef<NodeJS.Timeout>(null!);
    const [debounceValue, setDebounceValue] = useState<T>(value);
    const clearTimer = () => {
        clearTimeout(timer.current);
    };
    useEffect(() => {
        clearTimer();
        timer.current = setTimeout(() => {
            setDebounceValue(value);
        }, timeout);
        return () => {
            clearTimer();
        };
    }, [value, timeout]);
    return debounceValue;
};

export default useDebounce;

//* Example:
// const [search,setSearch] = useState('')
// const [page,setPage] = useState(1)
// const [pageSize, setPageSize] = useState(10)
// #1: debounce simple search value
// const debounceSearch = useDebounce({
//     value: search,
//     timeout: 500
// });
// #2: debounce object value such as multiple filters
// const debounceFilters = useDebounce({
//     value: {search,page,pageSize},
//     timeout: 1000
// });
