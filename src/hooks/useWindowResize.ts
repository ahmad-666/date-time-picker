import { useCallback, useEffect } from 'react';

type useWindowResizeArgs = {
    runOnMount?: boolean;
    cb: () => void;
};

const useWindowResize = ({ runOnMount = true, cb }: useWindowResizeArgs) => {
    useEffect(() => {
        runOnMount && cb();
        window.addEventListener('resize', cb);
        return () => {
            window.removeEventListener('resize', cb);
        };
    }, [runOnMount, cb]);
};

export default useWindowResize;

//* Example:
// const func = useCallback(()=>{},[])
// useWindowResize({
//     runOnMount: true,
//     cb: func
// });
