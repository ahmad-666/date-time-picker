export type FontSize = {
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing: string;
};
export type Typography = {
    'body-sm': FontSize;
    'body-md': FontSize;
    'body-lg': FontSize;
    'label-sm': FontSize;
    'label-md': FontSize;
    'label-lg': FontSize;
    'title-sm': FontSize;
    'title-md': FontSize;
    'title-lg': FontSize;
    'headline-lg': FontSize;
    'display-md': FontSize;
    'display-lg': FontSize;
};

const typography: Typography = {
    'body-sm': {
        fontSize: '0.875rem',
        fontWeight: '300',
        lineHeight: '1.5rem',
        letterSpacing: '0rem'
    },
    'body-md': {
        fontSize: '1rem',
        fontWeight: '300',
        lineHeight: '1.75rem',
        letterSpacing: '0rem'
    },
    'body-lg': {
        fontSize: '1.25rem',
        fontWeight: '300',
        lineHeight: '2rem',
        letterSpacing: '0rem'
    },
    'label-sm': {
        fontSize: '0.75rem',
        fontWeight: '500',
        lineHeight: '1rem',
        letterSpacing: '0rem'
    },
    'label-md': {
        fontSize: '0.875rem',
        fontWeight: '600',
        lineHeight: '1rem',
        letterSpacing: '0rem'
    },
    'label-lg': {
        fontSize: '1rem',
        fontWeight: '600',
        lineHeight: '1.25rem',
        letterSpacing: '0rem'
    },
    'title-sm': {
        fontSize: '1rem',
        fontWeight: '500',
        lineHeight: '1.25rem',
        letterSpacing: '0rem'
    },
    'title-md': {
        fontSize: '1.25rem',
        fontWeight: '400',
        lineHeight: '1.75rem',
        letterSpacing: '0rem'
    },
    'title-lg': {
        fontSize: '1.75rem',
        fontWeight: '500',
        lineHeight: '2.5rem',
        letterSpacing: '0rem'
    },
    'headline-lg': {
        fontSize: '2rem',
        fontWeight: '400',
        lineHeight: '2.5rem',
        letterSpacing: '-0.125rem'
    },
    'display-md': {
        fontSize: '3rem',
        fontWeight: '400',
        lineHeight: '3.5rem',
        letterSpacing: '-0.125rem'
    },
    'display-lg': {
        fontSize: '4.75rem',
        fontWeight: '400',
        lineHeight: '5.75rem',
        letterSpacing: '-0.25rem'
    }
};

export default typography;
