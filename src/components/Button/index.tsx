'use client';

import { useRef, useEffect, forwardRef, type ComponentProps, type MutableRefObject, type ForwardedRef } from 'react';
import Link from 'next/link';
import CircularLoader from '@/components/CircularLoader';
import useColor from '@/hooks/useColor';
import styles from './style.module.scss';

type Elm = HTMLButtonElement | HTMLAnchorElement;
export type Variant = 'text' | 'outlined' | 'filled' | 'outlined-filled' | 'tonal';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Href = string | { pathname: string; query?: Record<string, string>; hash?: string };
export type LinkType = 'html' | 'next';
export type Target = '_self' | '_blank';
type HTMLButtonProps = Pick<ComponentProps<'button'>, 'type' | 'disabled' | 'children' | 'className' | 'style'>;
type ButtonProps = HTMLButtonProps & {
    link?: boolean;
    linkType?: LinkType;
    variant?: Variant;
    color?: string;
    loaderColor?: string;
    size?: Size;
    elevation?: Size;
    circular?: boolean;
    loading?: boolean;
    hover?: boolean;
    press?: boolean;
    href?: Href;
    target?: Target;
    ariaLabel?: string;
    rel?: string;
    onClick?: () => void;
    contentClassName?: string;
};

const Button = (
    {
        link = false, //if false we create <button> else we create <Link>,<a>
        linkType = 'next', //if 'next' we use nextjs <Link> else we use html <a> , we can't use {pathname,query,hash} syntax on <a> and it's only for <Link>
        type = 'button',
        variant = 'filled',
        color = 'primary',
        loaderColor = 'white',
        size = 'md',
        elevation, //for add box-shadow , pass nothing to not having any box-shadow
        circular = false, //for circular btn
        disabled = false,
        loading = false,
        hover = true, //for enabling color shift when we hover on btn
        press = true, //for enabling color shift when we press btn
        href, //same as next/link href --> href="/products/1" , href={{pathname:'/products/1',query:{key:'val'},hash:'#hash'}}
        target = '_self',
        ariaLabel, //for those links,buttons that don't have any text node
        //<button aria-label="search"> <Icon icon="mdi:search" /> </button>
        rel, //"noopener noreferrer nofollow"
        //noopener --> tells the browser to open a link in a new tab without providing context access to the webpage that opened the link(should use on any external link with target="_blank")
        //noreferrer --> browser will not send and info about our site(referrer) to target website(should use on any external link with target="_blank" except those links that are still own by us e.g if we are to open link to dashboard.cufinder.io from cufinder.io we should not set it because google analytics cannot track noreferrer links)
        //nofollow --> don't endorse target website so we don't pass any link juice(use for ads,paid,... links , not use for social links)
        // use 'rel='noopener' on all external links with target="_blank" e.g links to socials,paid,ads,dashboard.cufinder,blob.cufinder,...
        // use 'rel='noopener noreferrer' on external links with target="_blank" that don't do anything with our own site like socials,paid,ads,...(not set on dashboard.cufinder,blog.cufinder,...)
        // use rel='nofollow' for paid,ads links and that we don't want to endorse(not use on socials)
        //we have rel="prev" | "next" too which tells url of prev,next page for paginated sections but we use that inside pagination component or inside <head> as metadata
        children,
        onClick,
        contentClassName = '',
        className = '',
        style = {}
    }: ButtonProps,
    ref: ForwardedRef<Elm>
) => {
    const btnRef = useRef<Elm>(null!);
    const parsedColor = useColor(color);
    const Component = !link ? 'button' : linkType === 'next' ? Link : 'a';
    const onRef = (node: null | Elm) => {
        if (node) {
            btnRef.current = node;
            if (ref) (ref as MutableRefObject<Elm>).current = node;
        }
    };
    useEffect(() => {
        const elm = btnRef.current;
        if (elm) {
            elm.style.setProperty('--color', parsedColor);
        }
    }, [parsedColor]);

    return (
        <Component
            ref={onRef}
            type={type}
            disabled={disabled || loading}
            aria-label={ariaLabel}
            rel={rel}
            target={link ? target : undefined}
            href={link ? (href as any) : undefined}
            onClick={onClick}
            className={`inline-block border-none text-label-lg font-semibold outline-none ${disabled || loading ? 'pointer-events-none' : 'cursor-pointer'} ${styles[variant]} ${styles[size]} ${elevation === 'xs' ? styles['elevation-xs'] : elevation === 'sm' ? styles['elevation-sm'] : elevation === 'md' ? styles['elevation-md'] : elevation === 'lg' ? styles['elevation-lg'] : elevation === 'xl' ? styles['elevation-xl'] : ''} ${circular ? styles.circular : ''} ${loading ? styles.loading : ''} ${hover ? styles.hover : ''} ${press ? styles.press : ''} ${disabled ? styles.disabled : ''} ${styles.btn} ${className}`}
            style={{
                ...style
            }}
        >
            <span className={`flex items-center justify-center ${contentClassName}`}>
                {!loading ? (
                    children
                ) : (
                    <CircularLoader animate color={loaderColor} size={25} thickness={3} spaceOffset={5} />
                    // we use same loader size for all btn sizes
                )}
            </span>
        </Component>
    );
};

export default forwardRef(Button);
