import { type Dayjs } from 'dayjs';
import { type ReactNode } from 'react';

export type Type = 'date' | 'time' | 'datetime';
export type Mode = 'single' | 'range';
export type Calendar = 'gregory' | 'jalali';
export type TimeVariant = 'hour' | 'minute' | 'second';
export type Year = {
    value: number;
    isSelected: boolean;
    isDisabled: boolean;
};
export type Month = {
    value: number;
    name: string;
    isSelected: boolean;
    isDisabled: boolean;
};
export type CalendarDay = {
    /** dayjs instance od date */
    d: Dayjs;
    /** date e.g 2020/10/05 */
    date: string;
    /** day of month e.g [1,31] */
    day: number;
    /** if current date is selected */
    isSelected: boolean;
    /** if current date is between selected dates or is between selected date and hover date */
    isInRange: boolean;
    /** if current date is today */
    isToday: boolean;
    /** if current date is disabled(lower than min or higher than max or ...) */
    isDisabled: boolean;
    /** if current date is for previous/next month */
    isOutside: boolean;
};
export type CalendarMonth = {
    /** dayjs instance of month start */
    d: Dayjs;
    /** name of month */
    name: string;
    /** year of month */
    year: string;
    /** consists of last days of previous month, current month days, first days of next month  */
    days: CalendarDay[];
};
export type Colors = {
    primary?: string;
    inRange?: string;
    hover?: string;
    today?: string;
    text?: string;
};
export type ClassNames = {
    day?: string;
    selected?: string;
    inRange?: string;
    hover?: string;
    today?: string;
    disabled?: string;
};
export type YearPickerProps = {
    /** current selected year e.g 2020 */
    value: number;
    /** 2-way data binding for value prop */
    onChange?: (newValue: number) => void;
    /** how many years before,after current year we should render */
    offset?: number;
    /** min accepted year e.g 2019 */
    min?: number;
    /** max accepted year e.g 2021 */
    max?: number;
    /** primary color for year picker */
    color?: string;
    /** css className of top container */
    className?: string;
};
export type MonthPickerProps = {
    /** current selected month ... between [1,12] means use 1 for first month of year and 12 for last month of year */
    value: number;
    /** 2-way data binding for value prop */
    onChange?: (newValue: number) => void;
    /** min accepted month e.g 1 */
    min?: number;
    /** max accepted month e.g 12 */
    max?: number;
    /** primary color for month picker */
    color?: string;
    /** css className of top container */
    className?: string;
};
export type CalendarProps = {
    /** can be 'single' | 'range' | 'multiple' */
    mode?: Mode;
    /** can be 'gregory' | 'jalali' */
    calendar?: Calendar;
    /** format of value e.g YYYY-MM-DD */
    format?: string;
    /** how many months we want to render */
    cols?: number;
    /** value of calendar , needs to be in proper format , we always use string[] e.g ['2020-10-10','2022-01-10'] */
    value: string[];
    /** for 2-way data binding of value prop */
    onChange?: (newValue: string[]) => void;
    /** min accepted date e.g '2020-01-01' ... needs to be in proper format */
    min?: string;
    /** max accepted date e.g '2022-12-30' ... needs to be in proper format */
    max?: string;
    /** size of each month day */
    size?: number;
    /** for render custom jsx for each day */
    dayRender?: (day: CalendarDay) => ReactNode;
    /** color palette of calendar */
    colors?: Colors;
    /** for add custom css classNames to different part of calendar  */
    classNames?: ClassNames;
    /** css className of container */
    className?: string;
};
export type TimeInputProps = {
    /** value of time input  */
    value: number;
    /** for 2-way data binding of value prop */
    onChange?: (newVal: number) => void;
    /** title bellow input e.g(hour,minute,second) */
    title: string;
    /** min accepted value e.g 5 */
    min?: number;
    /** min accepted value e.g 10 */
    max?: number;
    /** css className of container */
    className?: string;
};
export type TimePickerProps = {
    /** array of 'hour'|'minute'|'second' for identify which of them needs to be rendered */
    variants?: TimeVariant[];
    /** value of time picker e.g '12:05' , needs to be in proper format , use empty string if we don't have any initial value to set current time */
    value: string;
    /** for 2-way data binding of value prop */
    onChange?: (newVal: string) => void;
    /** format of value e.g HH:mm */
    format?: string;
    /** min accepted time e.g '01:10' ... needs to be in proper format */
    min?: string;
    /** max accepted time e.g '14:55' ... needs to be in proper format */
    max?: string;
    /** css className of container */
    className?: string;
};
