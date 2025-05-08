type Type = 'text' | 'bg' | 'border';
type Variant =
    | 'lighten-5'
    | 'lighten-4'
    | 'lighten-3'
    | 'lighten-2'
    | 'lighten-1'
    | 'default'
    | 'darken-1'
    | 'darken-2'
    | 'darken-3'
    | 'darken-4'
    | 'darken-5';

const generateTailwindColors = ({
    color,
    types = ['text', 'bg'],
    variants = ['lighten-5', 'lighten-4', 'lighten-1', 'default', 'darken-1', 'darken-2', 'darken-4']
}: {
    color: string;
    types?: Type[];
    variants?: Variant[];
}) => {
    //generate colors like text-primary,bg-secondary-lighten-4,border-pastel-red-darken-1,...
    const colors: string[] = [];
    types.forEach((type) => {
        variants.forEach((variant) => {
            colors.push(`${type}-${color}${variant === 'default' ? '' : `-${variant}`}`);
        });
    });
    return colors;
};

const safelist: string[] = [
    ...generateTailwindColors({
        color: 'primary'
    }),
    ...generateTailwindColors({
        color: 'secondary'
    }),
    ...generateTailwindColors({
        color: 'tertiary'
    }),
    ...generateTailwindColors({
        color: 'info'
    }),
    ...generateTailwindColors({
        color: 'warning'
    }),
    ...generateTailwindColors({
        color: 'pastel-green'
    }),
    ...generateTailwindColors({
        color: 'pastel-purple'
    }),
    ...generateTailwindColors({
        color: 'pastel-red'
    }),
    ...generateTailwindColors({
        color: 'pastel-blue'
    }),
    ...generateTailwindColors({
        color: 'pastel-cyan'
    }),
    ...generateTailwindColors({
        color: 'pastel-gold'
    }),
    ...generateTailwindColors({
        color: 'neutral'
    })
];

export default safelist;

//? for manually add tw classes ... useful when we generate tw classes dynamically and tw cannot generate classes itself
