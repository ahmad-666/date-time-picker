import { type CSSProperties } from 'react';

export const animations: Record<string, string> = {
    'fade-in': 'fade-in .3s linear forwards',
    'fade-out': 'fade-out .3s linear forwards',
    'slide-top-to-bottom': 'slide-top-to-bottom .3s linear',
    'slide-bottom-to-top': 'slide-bottom-to-top .3s linear',
    'slide-left-to-right': 'slide-left-to-right .3s linear',
    'slide-right-to-left': 'slide-right-to-left .3s linear',
    'expand-x-in': 'expand-x-in .3s linear forwards',
    'expand-x-out': 'expand-x-out .3s linear forwards',
    'expand-y-in': 'expand-y-in .3s linear forwards',
    'expand-y-out': 'expand-y-out .3s linear forwards',
    'linear-progress': 'linear-progress 2s ease-in-out infinite',
    'integration-spin': 'integration-spin 80s linear infinite',
    'integration-spin-reverse': 'integration-spin-reverse 80s linear infinite',
    skeleton: 'skeleton 2s ease-in-out infinite'
};
export const keyframes: Record<string, Record<string, CSSProperties>> = {
    'fade-in': {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' }
    },
    'fade-out': {
        '0%': { opacity: '1' },
        '100%': { opacity: '0' }
    },
    'slide-top-to-bottom': {
        '0%': { transform: 'translate(0,-5rem)' },
        '100%': { transform: 'translate(0,0)' }
    },
    'slide-bottom-to-top': {
        '0%': { transform: 'translate(0,5rem)' },
        '100%': { transform: 'translate(0,0)' }
    },
    'slide-left-to-right': {
        '0%': { transform: 'translate(-5rem,0)' },
        '100%': { transform: 'translate(0,0)' }
    },
    'slide-right-to-left': {
        '0%': { transform: 'translate(5rem,0)' },
        '100%': { transform: 'translate(0,0)' }
    },
    'expand-x-in': {
        '0%': { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
        '100%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }
    },
    'expand-x-out': {
        '0%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' },
        '100%': { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }
    },
    'expand-y-in': {
        '0%': { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        '100%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }
    },
    'expand-y-out': {
        '0%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' },
        '100%': { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }
    },
    'linear-progress': {
        '0%': {
            transform: 'translateX(-10%) scaleX(0)'
        },
        '100%': {
            transform: 'translateX(100%) scaleX(2)'
        }
    },
    'integration-spin': {
        '0%': {
            transform: 'rotate(0deg)'
        },
        '100%': {
            transform: 'rotate(360deg)'
        }
    },
    'integration-spin-reverse': {
        '0%': {
            transform: 'rotate(360deg)'
        },
        '100%': {
            transform: 'rotate(0deg)'
        }
    },
    skeleton: {
        '0%': {
            transform: 'translateX(-150%)'
        },
        '100%': {
            transform: 'translateX(150%)'
        }
    }
};
