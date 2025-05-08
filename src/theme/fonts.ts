import { Inter } from 'next/font/google';

export const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    variable: '--font-inter', //only if we set this 'variable' key we can use inter.variable
    display: 'swap'
});
