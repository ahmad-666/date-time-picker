import { type ReactNode } from 'react';

export default function EmptyLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <div className={`${className}`}>
            <main className='min-h-screen'>{children}</main>
        </div>
    );
}
