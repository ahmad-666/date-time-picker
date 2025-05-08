import { type ReactNode } from 'react';

type LandingLayoutProps = { children: ReactNode; className?: string };

export default function LandingLayout({ children, className = '' }: LandingLayoutProps) {
    return (
        <div className={`${className}`}>
            <main className='mt-0 min-h-screen'>{children}</main>
        </div>
    );
}
