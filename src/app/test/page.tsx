'use client';

import envs from '@/utils/envs';
import dayjs from '@/libs/dayjs';
import Calendar from '@/components/DateTimePicker/Calendar';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import TimePicker from '@/components/DateTimePicker/TimePicker';

export default function Page() {
    if (envs.appType !== 'test') throw new Error('test page is only available on DEV mode !!!');
    const [dates, setDates] = useState<string[]>(['2025/04/10']);

    return (
        <div className='mx-auto mt-20 w-4/5'>
            <Calendar
                mode='single'
                value={dates}
                onChange={(v) => setDates(v)}
                calendar='gregory'
                format='YYYY-MM-DD'
                cols={1}
                size={50}
                min='2025/04/05'
                max="'2025/04/25'"
            />
        </div>
    );
}
