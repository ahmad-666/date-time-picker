import { useState, useEffect, useCallback, type MutableRefObject } from 'react';
import useResize from './useResize';

type Sizing = {
    offset: {
        width: number;
        height: number;
        top: number;
        left: number;
    };
    bounding: {
        width: number;
        height: number;
        top: number;
        left: number;
        bottom: number;
        right: number;
    };
};
type UseDOMSizingArgs = {
    ref: MutableRefObject<HTMLElement>;
    round?: boolean;
};

const useDOMSizing = ({ ref, round = true }: UseDOMSizingArgs) => {
    const [sizing, setSizing] = useState<Sizing>({
        offset: { width: 0, height: 0, top: 0, left: 0 },
        bounding: { width: 0, height: 0, top: 0, left: 0, bottom: 0, right: 0 }
    });
    const resizeSizing = useResize(ref);
    const getSizing = useCallback(() => {
        const elm = ref.current;
        if (elm) {
            const boundingRect = elm.getBoundingClientRect();
            setSizing((old) => ({
                ...old,
                offset: {
                    width: round ? Math.round(elm.offsetWidth) : elm.offsetWidth,
                    height: round ? Math.round(elm.offsetHeight) : elm.offsetHeight,
                    left: round ? Math.round(elm.offsetLeft) : elm.offsetLeft,
                    top: round ? Math.round(elm.offsetTop) : elm.offsetTop
                },
                bounding: {
                    width: round ? Math.round(boundingRect.width) : boundingRect.width,
                    height: round ? Math.round(boundingRect.height) : boundingRect.height,
                    left: round ? Math.round(boundingRect.left) : boundingRect.left,
                    right: round ? Math.round(boundingRect.right) : boundingRect.right,
                    top: round ? Math.round(boundingRect.top) : boundingRect.top,
                    bottom: round ? Math.round(boundingRect.bottom) : boundingRect.bottom
                }
            }));
        }
    }, [ref, round]);
    useEffect(() => {
        //update sizing state anytime window/element resizes
        getSizing();
        window.addEventListener('resize', getSizing);
        return () => {
            window.removeEventListener('resize', getSizing);
        };
    }, [resizeSizing, getSizing]);

    return sizing;
};

export default useDOMSizing;

//? useDomSizing return values from offsetLeft,offsetTop,offsetWidth,offsetHeight,getBoundingClientRect and update these values on window/element resize
//? useResize will return element sizing using resizeObserver api and update its value anytime size of target element size changes
//? return values of useDomSizing,useResize are totally different things and we should use that one that we need.
//* Example:
// const ref = useRef<HTMLDivElement(null!)
// const item1Sizing = useDOMSizing({ round: true, ref });
// <div ref={ref} />
