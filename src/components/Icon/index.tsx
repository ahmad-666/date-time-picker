'use client';

import { type ComponentProps } from 'react';
import { Icon as Iconify } from '@iconify/react';
import useColor from '@/hooks/useColor';

export type Size =
    | 'xs3'
    | 'xs2'
    | 'xs'
    | 'sm'
    | 'sm2'
    | 'md'
    | 'md2'
    | 'lg'
    | 'xl'
    | 'xl2'
    | 'xl3'
    | 'xl4'
    | 'xl5'
    | number;
type IconProps = ComponentProps<typeof Iconify> & {
    size?: Size;
    color?: string;
};

export default function Icon({ icon, size = 'md', color = 'primary', className = '', style = {}, ...rest }: IconProps) {
    const parsedColor = useColor(color);

    const calcSize = () => {
        let finalSize: number = 0;
        switch (size) {
            case 'xs3':
                finalSize = 6;
                break;
            case 'xs2':
                finalSize = 9;
                break;
            case 'xs':
                finalSize = 12;
                break;
            case 'sm':
                finalSize = 15;
                break;
            case 'sm2':
                finalSize = 17.5;
                break;
            case 'md':
                finalSize = 20;
            case 'md2':
                finalSize = 22.5;
                break;
            case 'lg':
                finalSize = 25;
                break;
            case 'xl':
                finalSize = 30;
                break;
            case 'xl2':
                finalSize = 35;
                break;
            case 'xl3':
                finalSize = 40;
                break;
            case 'xl4':
                finalSize = 50;
                break;
            case 'xl5':
                finalSize = 60;
                break;
            default:
                finalSize = size;
        }
        return finalSize;
    };

    return (
        <Iconify
            icon={icon}
            className={`inline-block ${className}`}
            style={{
                color: parsedColor,
                fontSize: `${calcSize()}px`,
                ...style
            }}
            {...rest}
        ></Iconify>
    );
}

//* if we see extra height when using Icon component --> use 'inline-flex' on parent component
