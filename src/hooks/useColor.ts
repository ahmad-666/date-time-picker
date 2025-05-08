import { useState, useEffect, useCallback } from 'react';
import ownColors, { type Palette, type Color } from '@/theme/palette';
import twColors from 'tailwindcss/colors';
import { type DefaultColors } from 'tailwindcss/types/generated/colors';

const useColor = (inputColor: string) => {
    const findColor = useCallback(() => {
        const colorSplit = inputColor.split('-');
        const colorName = colorSplit[0];
        const colorVariant = [...colorSplit.slice(1)].join('-') || 'DEFAULT';
        const ownColor: null | string = ownColors[colorName as keyof Palette]?.[colorVariant as keyof Color] || null;
        const twColor: null | string =
            (twColors as any)[colorName as keyof DefaultColors]?.[colorVariant as string] || null;
        return ownColor || twColor || inputColor || 'transparent';
    }, [inputColor]);
    const [color, setColor] = useState(() => {
        return findColor();
    });
    useEffect(() => {
        setColor(findColor());
    }, [findColor]);

    return color;
};

export default useColor;

//? Example:
// useColor('primary') //own color --> ownColors.primary.DEFAULT
// useColor('secondary-lighten-3') //own color --> ownColors.secondary.['lighten-3']
// useColor('tertiary-darken-5') //own color --> ownColors.tertiary['darken-5']
// useColor('pastelRed-darken-5') //own color --> ownColors.pastelRed['darken-5']
// useColor('indigo-500') //tailwind color --> twColors.indigo[500]
// useColor('#ff00ff') //custom color --> #ff00ff
// useColor('inherit' | 'initial' | 'unset' | ...)
