import type { Config } from 'tailwindcss';
import typography from './src/theme/text';
import palette from './src/theme/palette';
import spacing from './src/theme/spacing';
import radius from './src/theme/radius';
import shadow from './src/theme/shadows';
import zIndex from './src/theme/zIndex';
import breakpoint from './src/theme/breakpoints';
import { blurs } from './src/theme/filters';
import { animations, keyframes } from './src/theme/animations';
import safelist from './src/theme/safelist';

export default {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/features/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        fontSize: {
            'body-sm': [typography['body-sm'].fontSize, { ...typography['body-sm'] }], //'text-body-sm'
            'body-md': [typography['body-md'].fontSize, { ...typography['body-md'] }],
            'body-lg': [typography['body-lg'].fontSize, { ...typography['body-lg'] }],
            'label-sm': [typography['label-sm'].fontSize, { ...typography['label-sm'] }],
            'label-md': [typography['label-md'].fontSize, { ...typography['label-md'] }],
            'label-lg': [typography['label-lg'].fontSize, { ...typography['label-lg'] }],
            'title-sm': [typography['title-sm'].fontSize, { ...typography['title-sm'] }],
            'title-md': [typography['title-md'].fontSize, { ...typography['title-md'] }],
            'title-lg': [typography['title-lg'].fontSize, { ...typography['title-lg'] }],
            'headline-lg': [typography['headline-lg'].fontSize, { ...typography['headline-lg'] }],
            'display-md': [typography['display-md'].fontSize, { ...typography['display-md'] }],
            'display-lg': [typography['display-lg'].fontSize, { ...typography['display-lg'] }]
        },
        borderRadius: { ...radius }, //'rounded-none','rounded','rounded-lg'
        boxShadow: { ...shadow, DEFAULT: shadow.md },
        zIndex: { ...zIndex }, //'z-10' , '-z-10'
        screens: {
            mobile: { min: `${breakpoint.mobile}px` },
            tablet: { min: `${breakpoint.tablet}px` },
            laptop: { min: `${breakpoint.laptop}px` },
            desktop: { min: `${breakpoint.desktop}px` },
            desktopXL: { min: `${breakpoint.desktopXL}px` },
            desktop2XL: { min: `${breakpoint.desktop2XL}px` },
            desktop3XL: { min: `${breakpoint.desktop3XL}px` }
        },
        extend: {
            spacing: { ...spacing }, //for padding,margin,width,height,...
            colors: {
                primary: palette.primary, //'text-primary' , 'bg-primary-darken-5' , 'border-primary-lighten-5'
                secondary: palette.secondary,
                tertiary: palette.tertiary,
                success: palette.success,
                info: palette.info,
                warning: palette.warning,
                error: palette.error,
                'pastel-green': palette.pastelGreen,
                'pastel-blue': palette.pastelBlue,
                'pastel-cyan': palette.pastelCyan,
                'pastel-purple': palette.pastelPurple,
                'pastel-gold': palette.pastelGold,
                'pastel-red': palette.pastelRed,
                neutral: palette.neutral,
                surface: palette.surface
            },
            blur: { ...blurs },
            backdropBlur: { ...blurs },
            animation: { ...animations },
            keyframes: { ...(keyframes as any) }
        }
    },
    plugins: [
        require('@pyncz/tailwind-mask-image') //add support to css-mask utility classes , for docs check https://www.npmjs.com/package/@pyncz/tailwind-mask-image
        //we can use css mask to clip shapes,apply complex color filters,create graduate css filters,backdrop filters like blur gradient
        //className="absolute w-full h-full left-0 top-0 mask-linear mask-dir-to-r mask-size-cover mask-repeat mask-position-center mask-from-0 mask-to-100 mask-point-from-[25%] mask-point-to-[75%] backdrop-blur-sm"
    ],
    safelist
} satisfies Config;
