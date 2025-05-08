import { useState, useEffect, type MutableRefObject } from 'react';

const useHover = (ref: MutableRefObject<HTMLElement>) => {
    const [isHover, setIsHover] = useState(false);
    const onEnterHover = () => setIsHover(true);
    const onExitHover = () => setIsHover(false);
    useEffect(() => {
        const elm = ref.current;
        if (elm) {
            elm.addEventListener('mouseenter', onEnterHover);
            elm.addEventListener('mouseleave', onExitHover);
            return () => {
                elm.removeEventListener('mouseenter', onEnterHover);
                elm.removeEventListener('mouseleave', onExitHover);
            };
        }
    }, [ref]);

    return { isHover, setIsHover };
};

export default useHover;

//? Example:
// const ref = useRef<HTMLDivElement>(null!);
// const isHover = useHover(ref);
// <div ref={ref} className={`aspect-square w-40 ${!isHover ? 'bg-primary' : 'bg-secondary'}`}></div>
