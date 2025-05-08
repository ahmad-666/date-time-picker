export type Radius = {
    none: string;
    xs2: string;
    xs: string;
    sm: string;
    DEFAULT: string;
    lg: string;
    xl: string;
    xl2: string;
    full: string;
    circle: string;
};

const radius: Radius = {
    none: '0rem',
    xs2: '0.5rem',
    xs: '0.75rem', //.55
    sm: '1rem', //.75
    DEFAULT: '1.25rem', //0.9
    lg: '2rem', //1.5
    xl: '2.25rem', //1.65
    xl2: '3.5rem',
    full: '9999px',
    circle: '50%'
};

export default radius;
