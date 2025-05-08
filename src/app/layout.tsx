import { type ReactNode } from 'react';
import { inter } from '@/theme/fonts';
import '@/../public/styles/globals.scss';

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang='en'>
            <body className={`${inter.className} ${inter.variable}`}>
                {children}
                <div id='portal'></div>
            </body>
        </html>
    );
}
