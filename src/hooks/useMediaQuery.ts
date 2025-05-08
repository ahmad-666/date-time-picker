import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
    const [isMatch, setIsMatch] = useState(false);
    const onChange = (e: MediaQueryListEvent) => {
        setIsMatch(e.matches);
    };
    useEffect(() => {
        const media = window.matchMedia(query);
        setIsMatch(media.matches);
        media.addEventListener('change', onChange);
        return () => {
            media.removeEventListener('change', onChange);
        };
    }, [query]);
    return isMatch;
};

export default useMediaQuery;

//? Example
// const isDesktop = useMediaQuery('(min-width: 700px)');
// const isMobile = useMediaQuery('(width < 700px)');
