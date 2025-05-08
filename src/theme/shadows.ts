export type Shadow = {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    'full-xs': string;
    'full-sm': string;
    'full-md': string;
    'full-lg': string;
    'full-xl': string;
    'spread-xs': string;
    'spread-sm': string;
    'spread-md': string;
    'spread-lg': string;
    'spread-xl': string;
    'spread-full-xs': string;
    'spread-full-sm': string;
    'spread-full-md': string;
    'spread-full-lg': string;
    'spread-full-xl': string;
};

const shadow: Shadow = {
    none: 'none',
    // shadows from bottom of element
    xs: '0 1px 3px 0 rgba(24,24,24,.08)',
    sm: '0 2px 4px 0 rgba(24,24,24,.08)',
    md: '0 4px 6px 0 rgba(24,24,24,.08)',
    lg: '0 5px 8px 3px rgba(24,24,24,.08)',
    xl: '0 6px 10px 6px rgba(24,24,24,.08)',
    // full shadows
    'full-xs': '0 0 3px 0 rgba(24,24,24,.08)',
    'full-sm': '0 0 4px 0 rgba(24,24,24,.08)',
    'full-md': '0 0 6px 1px rgba(24,24,24,.08)',
    'full-lg': '0 0 8px 3px rgba(24,24,24,.08)',
    'full-xl': '0 0 10px 6px rgba(24,24,24,.08)',
    // spread(big blur) shadows from bottom ... less spread means less blur so more visible shadow
    'spread-xs': '0 1px 10px 0 rgba(24,24,24,.08)',
    'spread-sm': '0 2px 11px 0 rgba(24,24,24,.08)',
    'spread-md': '0 3px 22px 0 rgba(24,24,24,.08)',
    'spread-lg': '0 4px 33px 0 rgba(24,24,24,.08)',
    'spread-xl': '0 4px 44px 0 rgba(24,24,24,.08)',
    // spread(big blur) full shadows ... less spread means less blur so more visible shadow
    'spread-full-xs': '0 0 10px 0 rgba(24,24,24,.08)',
    'spread-full-sm': '0 0 11px 0 rgba(24,24,24,.08)',
    'spread-full-md': '0 0 22px 0 rgba(24,24,24,.08)',
    'spread-full-lg': '0 0 33px 0 rgba(24,24,24,.08)',
    'spread-full-xl': '0 0 44px 0 rgba(24,24,24,.08)'
    // spread(big blur) shadows from bottom with primary color ... less spread means less blur so more visible shadow
};

export default shadow;
