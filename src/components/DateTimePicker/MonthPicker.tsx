import { useState, useRef, useEffect, useCallback } from 'react';
import dayjs from '@/libs/dayjs';
import Button from '@/components/Button';
import type { Month, MonthPickerProps } from './types';

export default function MonthPicker({
    value,
    onChange,
    min = 1,
    max = 12,
    color = 'primary',
    className = ''
}: MonthPickerProps) {
    const activeMonth = useRef<HTMLLIElement>(null!);
    const [months, setMonths] = useState<Month[]>([]);
    const generateMonths = useCallback(() => {
        const newMonths: Month[] = [];
        for (let i = 1; i <= 12; i++) {
            //generate months
            const m = dayjs().month(i - 1);
            newMonths.push({
                value: i,
                name: m.format('MMMM'),
                isSelected: i === value,
                isDisabled: !!((min && i < min) || (max && i > max))
            });
        }
        setMonths(newMonths);
    }, [value, min, max]);
    useEffect(() => {
        //generate list of months
        generateMonths();
    }, [generateMonths]);
    useEffect(() => {
        //scroll into active month
        setTimeout(() => {
            activeMonth.current?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    }, []);

    return (
        <div className={`overflow-auto ${className}`}>
            <p className='text-center text-title-md text-neutral'>Select Month</p>
            <ul className='mt-3 grid grid-cols-2 gap-0 mobile:grid-cols-3 tablet:grid-cols-4 laptop:grid-cols-6'>
                {months.map((month) => (
                    <li
                        key={month.value}
                        ref={(node: null | HTMLLIElement) => {
                            if (node && month.isSelected) activeMonth.current = node;
                        }}
                    >
                        <Button
                            variant={month.isSelected ? 'filled' : 'text'}
                            size='sm'
                            color={color}
                            disabled={month.isDisabled}
                            onClick={() => onChange?.(month.value)}
                            className='w-full'
                        >
                            {month.name}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

//? Usage:
// const [month, setMonth] = useState(9);
// <MonthPicker value={month} onChange={(v) => setMonth(v)} min={3} max={10} color='secondary' />;
