'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import dayjs from '@/libs/dayjs';
import envs from '@/utils/envs';

import DatePicker from '@/components/DateTimePicker';
import type { Calendar } from '@/components/DateTimePicker/types';

export default function Page() {
    if (envs.appType !== 'test') throw new Error('test page is only available on DEV mode !!!');
    const format = 'YYYY-MM-DD';
    const [dates, setDates] = useState<string[]>([]);
    const [calendar, setCalendar] = useState<Calendar>('gregory');
    const [minMax, setMinMax] = useState({
        min: '2024/05/05',
        max: '2026/05/25'
    });

    return (
        <div className='mx-auto mt-20 w-4/5'>
            <h1>{JSON.stringify(dates)}</h1>
            <DatePicker
                type='date'
                mode='single'
                value={dates}
                onChange={(newVal) => setDates(newVal)}
                calendar={calendar}
                onCalendarChange={(newCalendar) => {
                    setCalendar(newCalendar);
                    setMinMax((old) => ({
                        min: dayjs(old.min, { jalali: calendar === 'jalali' })
                            .calendar(newCalendar)
                            .format(format),
                        max: dayjs(old.max, { jalali: calendar === 'jalali' })
                            .calendar(newCalendar)
                            .format(format)
                    }));
                }}
                format={format}
                min={minMax.min}
                max={minMax.max}
                cols={1}
                size={50}
            />
        </div>
    );
}
