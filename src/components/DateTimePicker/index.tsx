'use client';

import { useState, useEffect, useMemo, useCallback, Fragment } from 'react';
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
        //compare start,end dates to min,max(only compare dates without considering time)
        const reachMinDate = dayjs(values.start, dayjsConfig).isSame(dayjs(min, dayjsConfig), 'day');
        const reachMaxDate = dayjs(values.end, dayjsConfig).isSame(dayjs(max, dayjsConfig), 'day');
        const startEndSame = dayjs(values.start, dayjsConfig).isSame(dayjs(values.end, dayjsConfig), 'day');
        const datePickerMin =
            min && hasDatePicker ? dayjs(min, dayjsConfig).calendar(calendar).format(formats.datePicker) : undefined;
        const datePickerMax =
            max && hasDatePicker ? dayjs(max, dayjsConfig).calendar(calendar).format(formats.datePicker) : undefined;
        const timePickerStartMin =
            min && (type === 'time' || reachMinDate) ? dayjs(min, dayjsConfig).format(formats.timePicker) : undefined;
        const timePickerStartMax =
            max && (type === 'time' || (reachMaxDate && startEndSame))
                ? dayjs(max, dayjsConfig).format(formats.timePicker)
                : undefined;
        const timePickerEndMin =
            min && (type === 'time' || (reachMinDate && startEndSame))
                ? dayjs(min, dayjsConfig).format(formats.timePicker)
                : undefined;
        const timePickerEndMax =
            max && (type === 'time' || reachMaxDate) ? dayjs(max, dayjsConfig).format(formats.timePicker) : undefined;
        return {
            datePickerMin,
            datePickerMax,
            timePickerStartMin,
            timePickerStartMax,
            timePickerEndMin,
            timePickerEndMax
        };
    }, [values, formats, type, hasDatePicker, calendar, dayjsConfig, min, max]);
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
    const checkMinMax = useCallback(
        (value: string[]) => {
            //? 1st check value prop against min,max and update value prop if its outside of min,max thresholds
            //? 2nd for mode==='range' check start is lower than end and end is greater than start
            const valueCopy = [...value];
            let start = valueCopy[0];
            let end = valueCopy[mode === 'single' ? 0 : 1];
            let startBelowMin = false;
            let endPassedMax = false;
            let startPassedEnd = false;
            let endBelowStart = false;
            if (mode === 'single') {
                startBelowMin = min && start ? dayjs(start, dayjsConfig).isBefore(dayjs(min, dayjsConfig)) : false;
                endPassedMax = max && start ? dayjs(start, dayjsConfig).isAfter(dayjs(max, dayjsConfig)) : false;
                if (startBelowMin) start = min!;
                else if (endPassedMax) start = max!;
            } else {
                startBelowMin = min && start ? dayjs(start, dayjsConfig).isBefore(dayjs(min, dayjsConfig)) : false;
                endPassedMax = max && end ? dayjs(end, dayjsConfig).isAfter(dayjs(max, dayjsConfig)) : false;
                if (startBelowMin) start = min!;
                else if (endPassedMax) end = max!;
                startPassedEnd =
                    mode === 'range' && start && end
                        ? dayjs(start, dayjsConfig).isAfter(dayjs(end, dayjsConfig))
                        : false;
                endBelowStart =
                    mode === 'range' && start && end
                        ? dayjs(end, dayjsConfig).isBefore(dayjs(start, dayjsConfig))
                        : false;
                if (startPassedEnd) start = end!;
                else if (endBelowStart) end = start!;
            }
            //return final value
            return (mode === 'single' ? [start] : [start, end]).filter((v) => v);
        },
        [mode, dayjsConfig, min, max]
    );
    const onDatePickerChangeHandler = useCallback(
        (newValue: string[]) => {
            //newValue arg is only consist of dates without time so we use {jalali:isJalali} instead of dayjsConfig
            //value prop can consist date or time so we use dayjsConfig
            const newVal = newValue
                .map((v, i) => {
                    const year = dayjs(v, { jalali: isJalali }).calendar(calendar).get('year');
                    const month = dayjs(v, { jalali: isJalali }).calendar(calendar).get('month');
                    const day = dayjs(v, { jalali: isJalali }).calendar(calendar).get('date');
                    return dayjs(value[i], dayjsConfig)
                        .calendar(calendar)
                        .set('year', +year)
                        .set('month', +month)
                        .set('date', +day)
                        .format(format);
                })
                .filter((v) => v);
            onChange?.(checkMinMax(newVal));
        },
        [value, onChange, isJalali, dayjsConfig, calendar, format, checkMinMax]
    );
    const onTimePickerChangeHandler = useCallback(
        (newValue: string, i: number) => {
            //newValue is only consist of time without date so we use formats.timePicker instead of dayjsConfig
            //value prop can consist date or time so we use dayjsConfig
            //for type==='time' we directly update time but for type==='date'||type==='datetime' we only update time if we already have a value like date,datetime
            const shouldUpdateTime = type === 'time' || !!(hasDatePicker && value[i]);
            if (shouldUpdateTime) {
                const valueCopy = [...value];
                const oldValue = valueCopy[i];
                const hour = dayjs(newValue, formats.timePicker).get('hour');
                const minute = dayjs(newValue, formats.timePicker).get('minute');
                const finalValue = dayjs(oldValue, !oldValue ? { jalali: isJalali } : dayjsConfig)
                    .calendar(calendar)
                    .set('hour', hour)
                    .set('minute', minute)
                    .format(format);
                valueCopy[i] = finalValue;
                onChange?.(checkMinMax(valueCopy));
            }
        },
        [value, onChange, type, isJalali, dayjsConfig, calendar, hasDatePicker, format, formats.timePicker, checkMinMax]
    );
    useEffect(() => {
        // for type="time" we update value prop with current time if its empty
        if (type === 'time') {
            const initValue: string[] = [];
            if (!value[0]) initValue[0] = dayjs().format(formats.timePicker);
            if (mode === 'range' && !value[1]) initValue[1] = dayjs().format(formats.timePicker);
            onChange?.(checkMinMax(initValue));
        }
        //! we don't add value,onChange to prevent infinite loop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, formats.timePicker, checkMinMax]);

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
                    <div className='flex flex-wrap items-center gap-12'>
                        <TimePicker
                            variants={['hour', 'minute']}
                            value={values.timePicker[0]}
                            onChange={(newVal) => onTimePickerChangeHandler(newVal, 0)}
                            label={mode === 'range' ? 'Start Time' : ''}
                            min={minMax.timePickerStartMin}
                            max={minMax.timePickerStartMax}
                            format={formats.timePicker}
                            disabled={hasDatePicker && !value[0]}
                        />
                        {mode === 'range' && (
                            <TimePicker
                                variants={['hour', 'minute']}
                                value={values.timePicker[1]}
                                onChange={(newVal) => onTimePickerChangeHandler(newVal, 1)}
                                label='End Time'
                                min={minMax.timePickerEndMin}
                                max={minMax.timePickerEndMax}
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
