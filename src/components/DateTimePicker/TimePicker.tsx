import { useEffect, useCallback, type ChangeEvent, type KeyboardEvent, type FocusEvent } from 'react';
import { type Dayjs } from 'dayjs';
import dayjs from '@/libs/dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import type { TimeVariant, TimeInputProps, TimePickerProps } from './types';

dayjs.extend(customParseFormat);

const Input = ({ value, onChange, title, min = 0, max, className = '' }: TimeInputProps) => {
    const isMin = !!(typeof min === 'number' && value <= min);
    const isMax = !!(typeof max === 'number' && value >= max);
    const updateValue = useCallback(
        (newVal: number) => {
            let finalValue: number;
            if (typeof min === 'number' && newVal < min) finalValue = min;
            else if (typeof max === 'number' && newVal > max) finalValue = max;
            else finalValue = newVal;
            onChange?.(finalValue || 0);
        },
        [min, max, onChange]
    );
    const add = () => {
        //click on increment button
        updateValue(value + 1);
    };
    const subtract = () => {
        //click on decrement button
        updateValue(value - 1);
    };
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        //change value of input
        const newVal = +e.target.value;
        updateValue(newVal);
    };
    const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        //keydown event on input
        const { key } = e;
        if (key === 'ArrowUp') add();
        else if (key === 'ArrowDown') subtract();
    };
    const onInputFocus = (e: FocusEvent<HTMLInputElement>) => {
        //focus on input field
        e.target.select();
    };
    const onInputBlur = (e: FocusEvent<HTMLInputElement>) => {
        //blur on input field
        const newVal = +e.target.value;
        updateValue(newVal);
    };
    useEffect(() => {
        updateValue(value);
    }, [value, updateValue]);

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <Button
                variant='outlined'
                color='neutral-lighten-5'
                size='xs'
                disabled={isMax}
                onClick={add}
                className='!p-1.5'
            >
                <Icon icon='mdi:chevron-up' size='md' color='neutral' />
            </Button>
            <div className='mb-5 mt-4'>
                <input
                    type='text'
                    value={`${value}`.padStart(2, '0')}
                    onChange={onInputChange}
                    onKeyDown={onInputKeyDown}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                    className='w-16 appearance-none border-none text-center text-title-lg text-neutral outline-none'
                />
                <p className='mt-0 text-center text-title-sm font-semibold text-neutral-lighten-2'>{title}</p>
            </div>
            <Button
                variant='outlined'
                color='neutral-lighten-5'
                size='xs'
                disabled={isMin}
                onClick={subtract}
                className='!p-1.5'
            >
                <Icon icon='mdi:chevron-down' size='md' color='neutral' />
            </Button>
        </div>
    );
};

export default function TimePicker({
    variants = ['hour', 'minute'],
    value,
    onChange,
    format = 'HH:mm',
    min,
    max,
    className = ''
}: TimePickerProps) {
    const showHour = variants.includes('hour');
    const showMinute = variants.includes('minute');
    const showSecond = variants.includes('second');
    const valueD = value ? dayjs(value, format) : dayjs();
    const minD = dayjs(min, format);
    const maxD = dayjs(max, format);
    const minMax = {
        minHour: minD.hour() || 0,
        maxHour: maxD.hour() || 23,
        minMinute: valueD.isSame(minD) ? minD.minute() : 0, //only apply min-minute if we are on min time
        maxMinute: valueD.isSame(maxD) ? maxD.minute() : 59, //only apply max-minute if we are on max time
        minSecond: valueD.isSame(minD) ? minD.second() : 0, //only apply min-second if we are on min time
        maxSecond: valueD.isSame(maxD) ? maxD.second() : 59 //only apply max-second if we are on max time
    };
    const onTimeChange = (variant: TimeVariant, newVal: number) => {
        let newValueD: Dayjs;
        if (variant === 'hour') newValueD = valueD.hour(newVal);
        else if (variant === 'minute') newValueD = valueD.minute(newVal);
        else newValueD = valueD.second(newVal);
        if (newValueD.isBefore(minD)) {
            //if we go bellow min --> use min
            newValueD = minD;
        } else if (newValueD.isAfter(maxD)) {
            //if we go above max --> use max
            newValueD = maxD;
        }
        onChange?.(newValueD.format(format));
    };

    return (
        <div className={`flex flex-wrap gap-8 tablet:gap-16 ${className}`}>
            {showHour && (
                <Input
                    value={valueD.hour()}
                    onChange={(newVal) => onTimeChange('hour', newVal)}
                    title='Hour'
                    min={minMax.minHour}
                    max={minMax.maxHour}
                />
            )}
            {showMinute && (
                <Input
                    value={valueD.minute()}
                    onChange={(newVal) => onTimeChange('minute', newVal)}
                    title='Minute'
                    min={minMax.minMinute}
                    max={minMax.maxMinute}
                />
            )}
            {showSecond && (
                <Input
                    value={valueD.second()}
                    onChange={(newVal) => onTimeChange('second', newVal)}
                    title='Second'
                    min={minMax.minSecond}
                    max={minMax.maxSecond}
                />
            )}
        </div>
    );
}

//? Usage:
// const [time, setTime] = useState('');
// <TimePicker variants={['hour', 'minute']} value={time} onChange={(v) => setTime(v)} format='HH:mm' min='05:45' max='15:05' />
