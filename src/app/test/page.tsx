'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import envs from '@/utils/envs';

export default function Page() {
    if (envs.appType !== 'test') throw new Error('test page is only available on DEV mode !!!');

    return <div className='mx-auto mt-20 w-4/5'></div>;
}
