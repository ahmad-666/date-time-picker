export type Breakpoint = {
    mobile: number;
    tablet: number;
    laptop: number;
    desktop: number;
    desktopXL: number;
    desktop2XL: number;
    desktop3XL: number;
};

const breakpoint: Breakpoint = {
    mobile: 500,
    tablet: 800,
    laptop: 1100,
    desktop: 1400,
    desktopXL: 1700,
    desktop2XL: 2000,
    desktop3XL: 2600
};

export default breakpoint;
