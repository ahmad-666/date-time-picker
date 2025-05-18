'use client';

import { useState, useMemo, Fragment } from 'react';
import { type Dayjs } from 'dayjs';
import dayjs from '@/libs/dayjs';
import Button from '@/components/Button';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import DEFAULT_COLORS from './colors';
import type { DateTimePickerProps } from './types';

export default function DateTimePicker({
    type = 'date',
    calendar = 'gregory',
    onCalendarChange,
    mode = 'single',
    format = 'YYYY-MM-DD',
    value = [], //something like ['2020-10-05','2022-05-10'] ... for all mode we use string[] to handle all scenarios easily
    onChange,
    min,
    max,
    cols = 1,
    size = 50,
    showCalendarBtn = true,
    showTodayBtn = true,
    showClearBtn = true,
    dayRender,
    colors = DEFAULT_COLORS,
    classNames = {
        day: '', //basic css className of each day
        selected: '', //css className of selected dates in days
        inRange: '', //css className of in-range dates in days(e.g dates between first/last selected dates)
        hover: '', //css className for hover days
        today: '', //css className of today date in days
        disabled: '' //css className of disabled dates in days
    },
    className = ''
}: DateTimePickerProps) {
    const [startDate, setStartDate] = useState<Dayjs>(dayjs().calendar(calendar));
    const hasDatePicker = type === 'date' || type === 'datetime';
    const hasTimePicker = type === 'time' || type === 'datetime';
    const isJalali = calendar === 'jalali';
    const locale = calendar === 'gregory' ? 'en' : 'fa';
    // const dir = calendar === 'gregory' ? 'ltr' : 'rtl';
    const formats = useMemo(() => {
        let dateFormat = '';
        let timeFormat = '';
        const formatParts = format.split(/(\W)/); //separate format prop by delimiters,separators,white-space,...
        const yearFormats = ['YY', 'YYYY'];
        const monthFormats = ['M', 'MM', 'MMM', 'MMMM'];
        const dayFormats = ['D', 'DD'];
        const hourFormats = ['h', 'hh', 'H', 'HH'];
        const minuteFormats = ['m', 'mm'];
        const secondFormats = ['s', 'ss'];
        const dateFormats = [...yearFormats, ...monthFormats, ...dayFormats];
        const timeFormats = [...hourFormats, ...minuteFormats, ...secondFormats];
        formatParts.forEach((part) => {
            if (dateFormats.includes(part)) dateFormat += part;
            else if (timeFormats.includes(part)) timeFormat += part;
            else {
                //delimiter,separators,white-space,...
                if (dateFormat.length) dateFormat += part;
                if (timeFormat.length) timeFormat += part;
            }
        });
        return {
            year: yearFormats.find((f) => formatParts.includes(f)),
            month: monthFormats.find((f) => formatParts.includes(f)),
            day: dayFormats.find((f) => formatParts.includes(f)),
            hour: hourFormats.find((f) => formatParts.includes(f)),
            minute: minuteFormats.find((f) => formatParts.includes(f)),
            second: secondFormats.find((f) => formatParts.includes(f)),
            //trim all delimiters,separators,white-space,... from start,end
            datePicker: dateFormat.replace(/^\W*/g, '').replace(/\W*$/g, ''),
            timePicker: timeFormat.replace(/^\W*/g, '').replace(/\W*$/g, '')
        };
    }, [format]);
    const dayjsConfig = useMemo(() => {
        // for specify 2nd arg of dayjs
        // for empty value we use {jalali:isJalali} --> dayjs(undefined,{jalali:true})
        // for time we use time formats like HH:mm --> dayjs('10:45','HH:mm')
        // for date we use {jalali:isJalali} --> dayjs('2020-10-05',{jalali:true})
        // for datetime we use {jalali:isJalali} --> dayjs('2020-10-05 10:45',{jalali:true})
        return hasDatePicker ? { jalali: isJalali } : formats.timePicker;
    }, [hasDatePicker, isJalali, formats.timePicker]);
    const values = useMemo(() => {
        return {
            start: value[0],
            end: value[mode === 'single' ? 0 : 1],
            datePicker: value.map((val) => dayjs(val, dayjsConfig).calendar(calendar).format(formats.datePicker)),
            timePicker: value.map((val) => dayjs(val, dayjsConfig).format(formats.timePicker))
        };
    }, [value, mode, calendar, formats, dayjsConfig]);
    const minMax = useMemo(() => {
        const reachMin = dayjs(values.start, dayjsConfig).isSame(dayjs(min));
        const reachMax = dayjs(values.end, dayjsConfig).isSame(dayjs(max));
        return {
            reachMin,
            reachMax,
            datePickerMin: min ? dayjs(min, dayjsConfig).calendar(calendar).format(formats.datePicker) : undefined,
            datePickerMax: max ? dayjs(max, dayjsConfig).calendar(calendar).format(formats.datePicker) : undefined,
            timePickerMin:
                min && (type === 'time' || reachMin) ? dayjs(min, dayjsConfig).format(formats.timePicker) : undefined,
            timePickerMax:
                max && (type === 'time' || reachMax) ? dayjs(max, dayjsConfig).format(formats.timePicker) : undefined
        };
    }, [values, formats, type, calendar, dayjsConfig, min, max]);
    // console.log(values, formats, minMax);
    const onCalendarChangeHandler = () => {
        const newCalendar = calendar === 'gregory' ? 'jalali' : 'gregory';
        const newValue = value.map((val) => dayjs(val, dayjsConfig).calendar(newCalendar).format(format));
        onCalendarChange?.(newCalendar);
        onChange?.(newValue);
    };
    const onClearHandler = () => {
        onChange?.([]);
    };
    const onTodayHandler = () => {
        setStartDate(dayjs().calendar(calendar).locale(locale));
    };
    const checkMinMax = (value: string[]) => {
        //this is for check value prop against min,max and normalize value prop if its outside of min,max thresholds
        const normalizeValue = [...value];
        normalizeValue.forEach((val, i) => {
            const passedMin = dayjs(val, dayjsConfig).isBefore(dayjs(min));
            const passedMax = dayjs(val, dayjsConfig).isAfter(dayjs(max));
            if (min && passedMin) normalizeValue[i] = min;
            else if (max && passedMax) normalizeValue[i] = max;
        });
        return normalizeValue;
    };
    const onDatePickerChangeHandler = (val: string[]) => {
        const newVal = val
            .map((v, i) => {
                const year = dayjs(v).get('year');
                const month = dayjs(v).get('month');
                const day = dayjs(v).get('date');
                return dayjs(value[i], !value[i] ? { jalali: isJalali } : dayjsConfig)
                    .calendar(calendar)
                    .set('year', +year)
                    .set('month', +month)
                    .set('date', +day)
                    .format(format);
            })
            .filter((v) => v);
        onChange?.(checkMinMax(newVal));
    };
    const onTimePickerChangeHandler = (val: string, i: number) => {
        //for type==='time' we directly update time but for type==='date'||type==='datetime' we only update time if we already have a value like date,datetime
        const shouldUpdateTime = type === 'time' || !!(hasDatePicker && value[i]);
        if (shouldUpdateTime) {
            const valueCopy = [...value];
            const oldValue = valueCopy[i];
            const hour = dayjs(val, formats.timePicker).get('hour');
            const minute = dayjs(val, formats.timePicker).get('minute');
            const newValue = dayjs(oldValue, !oldValue ? { jalali: isJalali } : dayjsConfig)
                .calendar(calendar)
                .set('hour', hour)
                .set('minute', minute)
                .format(format);
            valueCopy[i] = newValue;
            onChange?.(checkMinMax(valueCopy));
        }
    };

    return (
        <div className={`${className}`}>
            {showCalendarBtn && hasDatePicker && (
                <div className='mb-5 flex items-center gap-2'>
                    <Button
                        variant='filled'
                        size='sm'
                        color={colors.primary}
                        onClick={onCalendarChangeHandler}
                        className='mb-2 capitalize'
                    >
                        {isJalali ? 'show gregory calendar' : 'show jalali calendar'}
                    </Button>
                </div>
            )}
            <div>
                {hasDatePicker && (
                    <DatePicker
                        calendar={calendar}
                        mode={mode}
                        value={values.datePicker}
                        onChange={onDatePickerChangeHandler}
                        startDate={startDate}
                        onStartDateChange={setStartDate}
                        min={minMax.datePickerMin}
                        max={minMax.datePickerMax}
                        cols={cols}
                        size={size}
                        format={formats.datePicker}
                        dayRender={dayRender}
                        colors={colors}
                        classNames={classNames}
                        className={`${hasTimePicker ? 'mb-2' : ''}`}
                    />
                )}
                {hasTimePicker && (
                    // timepicker should be disabled if also have date and don't select date yet
                    <div className='flex items-center gap-8'>
                        <TimePicker
                            variants={['hour', 'minute']}
                            value={values.timePicker[0]}
                            onChange={(newVal) => onTimePickerChangeHandler(newVal, 0)}
                            label={mode === 'range' ? 'Start Time' : ''}
                            min={minMax.timePickerMin}
                            max={mode === 'single' ? minMax.timePickerMax : undefined}
                            format={formats.timePicker}
                            disabled={hasDatePicker && !value[0]}
                        />
                        {mode === 'range' && (
                            <TimePicker
                                variants={['hour', 'minute']}
                                value={values.timePicker[1]}
                                onChange={(newVal) => onTimePickerChangeHandler(newVal, 1)}
                                label='End Time'
                                min={undefined}
                                max={minMax.timePickerMax}
                                format={formats.timePicker}
                                disabled={hasDatePicker && !value[1]}
                            />
                        )}
                    </div>
                )}
            </div>
            <div className='mt-5 flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between'>
                <div className='flex items-center gap-2 text-body-md text-slate-700'>
                    {value.map((val, i) => (
                        <Fragment key={i}>
                            <div className='rounded-sm border border-slate-300 px-4 py-1'>
                                <p>{val}</p>
                            </div>
                            {i < value.length - 1 && <span>-</span>}
                        </Fragment>
                    ))}
                </div>
                <div className='flex items-center gap-2'>
                    {showClearBtn && hasDatePicker && (
                        <Button variant='outlined' size='sm' color={colors.error} onClick={onClearHandler}>
                            Clear
                        </Button>
                    )}
                    {showTodayBtn && hasDatePicker && (
                        <Button variant='filled' size='sm' color={colors.today} onClick={onTodayHandler}>
                            Today
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
