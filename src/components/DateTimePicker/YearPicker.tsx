'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import dayjs from '@/libs/dayjs';
import Button from '@/components/Button';
import DEFAULT_COLORS from './colors';
import type { Year, YearPickerProps } from './types';

export default function YearPicker({
    value,
    onChange,
    offset = 50,
    min,
    max,
    color = DEFAULT_COLORS.primary,
    className = ''
}: YearPickerProps) {
    const activeYear = useRef<HTMLLIElement>(null!);
    const [years, setYears] = useState<Year[]>([]);
    const currentYear = dayjs().year();
    const generateYears = useCallback(() => {
        const newYears: Year[] = [];
        for (let i = -offset; i <= offset; i++) {
            //generate years
            const y = currentYear + i;
            newYears.push({
                value: y,
                isSelected: y === value,
                isDisabled: !!((min && y < min) || (max && y > max))
            });
        }
        setYears(newYears);
    }, [value, currentYear, offset, min, max]);
    useEffect(() => {
        //generate list of year
        generateYears();
    }, [generateYears]);
    useEffect(() => {
        //scroll into active year
        setTimeout(() => {
            activeYear.current?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    }, []);

    return (
        <div className={`overflow-auto ${className}`}>
            <p className='text-center text-title-md text-slate-700'>Select Year</p>
            <ul className='mt-3 grid grid-cols-3 gap-0 mobile:grid-cols-4 tablet:grid-cols-5 laptop:grid-cols-6 desktop:grid-cols-7'>
                {years.map((year) => (
                    <li
                        key={year.value}
                        ref={(node: null | HTMLLIElement) => {
                            if (node && year.isSelected) activeYear.current = node;
                        }}
                    >
                        <Button
                            variant={year.isSelected ? 'filled' : 'text'}
                            size='sm'
                            color={color}
                            disabled={year.isDisabled}
                            onClick={() => onChange?.(year.value)}
                            className='w-full'
                        >
                            {year.value}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

//? Usage:
// const [year, setYear] = useState(2020);
// <YearPicker value={year} onChange={(v) => setYear(v)} offset={100} min={2000} max={2035} color='secondary' />
