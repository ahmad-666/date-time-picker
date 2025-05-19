'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import dayjs from '@/libs/dayjs';
import envs from '@/utils/envs';

import DateTimePicker from '@/components/DateTimePicker';
import type { Calendar } from '@/components/DateTimePicker/types';

export default function Page() {
    if (envs.appType !== 'test') throw new Error('test page is only available on DEV mode !!!');
    const format = 'HH:mm';
    const [dates, setDates] = useState<string[]>([]);
    const [calendar, setCalendar] = useState<Calendar>('gregory');
    const [minMax, setMinMax] = useState({
        min: '10:15',
        max: '15:45'
    });

    return (
        <div className='mx-auto mt-20 w-4/5'>
            <h1>{JSON.stringify(dates)}</h1>
            <DateTimePicker
                type='time'
                mode='range'
                value={dates}
                onChange={(newVal) => {
                    setDates(newVal);
                }}
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
                cols={2}
                size={50}
            />
        </div>
    );
}
