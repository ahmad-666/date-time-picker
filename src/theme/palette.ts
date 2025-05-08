// import colors from 'tailwindcss/colors'
// colors.amber[400]

export type Color = {
    'lighten-5'?: string;
    'lighten-4'?: string;
    'lighten-3'?: string;
    'lighten-2'?: string;
    'lighten-1'?: string;
    DEFAULT: string;
    'darken-1'?: string;
    'darken-2'?: string;
    'darken-3'?: string;
    'darken-4'?: string;
    'darken-5'?: string;
};
export type Palette = {
    primary: Color;
    secondary: Color;
    tertiary: Color;
    success: Color;
    info: Color;
    warning: Color;
    error: Color;
    pastelGreen: Color;
    pastelBlue: Color;
    pastelCyan: Color;
    pastelPurple: Color;
    pastelGold: Color;
    pastelRed: Color;
    neutral: Color;
    surface: Color;
};

const primary: Color = {
    'lighten-5': '#EEEDFD',
    'lighten-4': '#C9C7FA',
    'lighten-3': '#AFACF7',
    'lighten-2': '#8A86F4',
    'lighten-1': '#746FF1',
    DEFAULT: '#514BEE',
    'darken-1': '#4A44D9',
    'darken-2': '#3A35A9',
    'darken-3': '#2D2983',
    'darken-4': '#222064',
    'darken-5': '#222064'
};
const secondary: Color = {
    'lighten-5': '#FEEEE9',
    'lighten-4': '#FCC9B9',
    'lighten-3': '#FAAF98',
    'lighten-2': '#F88A68',
    'lighten-1': '#F6744B',
    DEFAULT: '#F4511E',
    'darken-1': '#DE4A1B',
    'darken-2': '#AD3A15',
    'darken-3': '#862D11',
    'darken-4': '#66220D',
    'darken-5': '#66220D'
};
const tertiary: Color = {
    'lighten-5': '#EDF7EE',
    'lighten-4': '#C8E6C9',
    'lighten-3': '#ADDAAF',
    'lighten-2': '#87C98A',
    'lighten-1': '#70BF73',
    DEFAULT: '#4CAF50',
    'darken-1': '#459F49',
    'darken-2': '#367C39',
    'darken-3': '#2A602C',
    'darken-4': '#204A22',
    'darken-5': '#204A22'
};
const success: Color = {
    'lighten-5': '#ECF8EC',
    'lighten-4': '#C3EBC4',
    'lighten-3': '#A6E1A8',
    'lighten-2': '#7DD380',
    'lighten-1': '#64CA67',
    DEFAULT: '#3DBD41',
    'darken-1': '#38AC3B',
    'darken-2': '#2B862E',
    'darken-3': '#226824',
    'darken-4': '#1A4F1B',
    'darken-5': '#1A4F1B'
};
const info: Color = {
    'lighten-5': '#E9F5FE',
    'lighten-4': '#BADEFB',
    'lighten-3': '#99CFF9',
    'lighten-2': '#6AB9F7',
    'lighten-1': '#4DABF5',
    DEFAULT: '#2196F3',
    'darken-1': '#1E89DD',
    'darken-2': '#176BAD',
    'darken-3': '#125386',
    'darken-4': '#0E3F66',
    'darken-5': '#0E3F66'
};
const warning: Color = {
    'lighten-5': '#FFF9E6',
    'lighten-4': '#FFECB2',
    'lighten-3': '#FFE28D',
    'lighten-2': '#FFD559',
    'lighten-1': '#FFCD39',
    DEFAULT: '#FFC107',
    'darken-1': '#E8B006',
    'darken-2': '#B58905',
    'darken-3': '#8C6A04',
    'darken-4': '#6B5103',
    'darken-5': '#6B5103'
};
const error: Color = {
    'lighten-5': '#FDEAE9',
    'lighten-4': '#F7BDB9',
    'lighten-3': '#F49D98',
    'lighten-2': '#EE7168',
    'lighten-1': '#EB554B',
    DEFAULT: '#E62B1E',
    'darken-1': '#D1271B',
    'darken-2': '#A31F15',
    'darken-3': '#7F1811',
    'darken-4': '#61120D',
    'darken-5': '#61120D'
};
const pastelGreen: Color = {
    'lighten-5': '#ECF6D6',
    'lighten-4': '#D9EBB0',
    'lighten-3': '#C6E18A',
    'lighten-2': '#ACD354',
    'lighten-1': '#9CCB33',
    DEFAULT: '#83BE00',
    'darken-1': '#77AD00',
    'darken-2': '#5D8700',
    'darken-3': '#486900',
    'darken-4': '#375000',
    'darken-5': '#375000'
};
const pastelBlue: Color = {
    'lighten-5': '#EEF8FF',
    'lighten-4': '#BBE1FD',
    'lighten-3': '#B3DFFF',
    'lighten-2': '#90D0FF',
    'lighten-1': '#7AC7FF',
    DEFAULT: '#59B9FF',
    'darken-1': '#51A8E8',
    'darken-2': '#3F83B5',
    'darken-3': '#31668C',
    'darken-4': '#254E6B',
    'darken-5': '#254E6B'
};
const pastelCyan: Color = {
    'lighten-5': '#E6FCFB',
    'lighten-4': '#CFF1EF',
    'lighten-3': '#8AF1ED',
    'lighten-2': '#54EBE4',
    'lighten-1': '#33E7DF',
    DEFAULT: '#00E1D7',
    'darken-1': '#00CDC4',
    'darken-2': '#00A099',
    'darken-3': '#007C76',
    'darken-4': '#005F5A',
    'darken-5': '#005F5A'
};
const pastelPurple: Color = {
    'lighten-5': '#F4EEFF',
    'lighten-4': '#DCCCFF',
    'lighten-3': '#CBB3FF',
    'lighten-2': '#B390FF',
    'lighten-1': '#A47AFF',
    DEFAULT: '#8D59FF',
    'darken-1': '#8051E8',
    'darken-2': '#643FB5',
    'darken-3': '#4E318C',
    'darken-4': '#3B256B',
    'darken-5': '#3B256B'
};
const pastelGold: Color = {
    'lighten-5': '#F5F2E6',
    'lighten-4': '#FDEDBB',
    'lighten-3': '#D1C18D',
    'lighten-2': '#BDA55A',
    'lighten-1': '#B09339',
    DEFAULT: '#9C7808',
    'darken-1': '#8E6D07',
    'darken-2': '#6F5506',
    'darken-3': '#564204',
    'darken-4': '#423203',
    'darken-5': '#423203'
};
const pastelRed: Color = {
    'lighten-5': '#F7E7E6',
    'lighten-4': '#FFDDDB',
    'lighten-3': '#FFB4AF',
    'lighten-2': '#FF928A',
    'lighten-1': '#FF7D73',
    DEFAULT: '#FF5C50',
    'darken-1': '#E85449',
    'darken-2': '#B54139',
    'darken-3': '#8C332C',
    'darken-4': '#6B2722',
    'darken-5': '#6B2722'
};
const neutral: Color = {
    'lighten-5': '#E8E8E8',
    'lighten-4': '#B7B7B7',
    'lighten-3': '#959595',
    'lighten-2': '#646464',
    'lighten-1': '#464646',
    DEFAULT: '#181818',
    'darken-1': '#161616',
    'darken-2': '#111111',
    'darken-3': '#0D0D0D',
    'darken-4': '#0A0A0A',
    'darken-5': '#0A0A0A'
};
const surface: Color = {
    'lighten-3': '#FFFFFF',
    'lighten-2': '#F8F8F8',
    'lighten-1': '#F8F8FF',
    DEFAULT: '#B7B7B7',
    'darken-1': '#959595',
    'darken-2': '#646464',
    'darken-3': '#323232',
    'darken-4': '#252525',
    'darken-5': '#181818'
};

const palette: Palette = {
    primary,
    secondary,
    tertiary,
    success,
    info,
    warning,
    error,
    pastelGreen,
    pastelBlue,
    pastelCyan,
    pastelPurple,
    pastelGold,
    pastelRed,
    neutral,
    surface
};

export default palette;
