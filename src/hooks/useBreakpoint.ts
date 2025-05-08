import { useState, useEffect, useCallback } from 'react';
import breakpoints from '@/theme/breakpoints';
import useMediaQuery from '@/hooks/useMediaQuery';

type Breakpoints = {
    xsOnly: boolean;
    smOnly: boolean;
    mdOnly: boolean;
    lgOnly: boolean;
    xlOnly: boolean;
    xsAndDown: boolean;
    smAndDown: boolean;
    mdAndDown: boolean;
    lgAndDown: boolean;
    xlAndDown: boolean;
    xsAndUp: boolean;
    smAndUp: boolean;
    mdAndUp: boolean;
    lgAndUp: boolean;
    xlAndUp: boolean;
};

const useBreakpoint = () => {
    const xsOnly = useMediaQuery(`(width<${breakpoints.mobile}px)`);
    const smOnly = useMediaQuery(`(${breakpoints.mobile}px<width<${breakpoints.tablet}px)`);
    const mdOnly = useMediaQuery(`(${breakpoints.tablet}px<width<${breakpoints.laptop}px)`);
    const lgOnly = useMediaQuery(`(${breakpoints.laptop}px<width<${breakpoints.desktop}px)`);
    const xlOnly = useMediaQuery(`(${breakpoints.desktop}px<width)`);
    const findBreakpoints = useCallback((): Breakpoints => {
        return {
            xsOnly,
            smOnly,
            mdOnly,
            lgOnly,
            xlOnly,
            xsAndDown: xsOnly,
            smAndDown: xsOnly || smOnly,
            mdAndDown: xsOnly || smOnly || mdOnly,
            lgAndDown: xsOnly || smOnly || mdOnly || lgOnly,
            xlAndDown: xsOnly || smOnly || mdOnly || lgOnly || xlOnly,
            xsAndUp: xsOnly || smOnly || mdOnly || lgOnly || xlOnly,
            smAndUp: smOnly || mdOnly || lgOnly || xlOnly,
            mdAndUp: mdOnly || lgOnly || xlOnly,
            lgAndUp: lgOnly || xlOnly,
            xlAndUp: xlOnly
        };
    }, [xsOnly, smOnly, mdOnly, lgOnly, xlOnly]);
    const [breakpoint, setBreakpoint] = useState<Breakpoints>(() => {
        return findBreakpoints();
    });
    useEffect(() => {
        setBreakpoint(findBreakpoints());
    }, [findBreakpoints]);
    return breakpoint;
};

export default useBreakpoint;

//? Example
// const { xsAndDown: isMobile } = useBreakpoint();
//* xsAndDown --> mobile and down
//* smAndDown --> tablet and down
//* mdAndDown --> laptop and down
//* lgAndDown --> desktop and down
