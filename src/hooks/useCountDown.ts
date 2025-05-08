import { useState, useRef, useEffect, useCallback } from 'react';
import { dayjsEn } from '@/libs/dayjs';

type CountDown = {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
};
type UseCountDownArgs = {
    duration: number;
};

const useCountDown = ({
    duration = 0 //duration of countdown in milliseconds
}: UseCountDownArgs) => {
    const getCountDown = (d: number): CountDown => {
        const result = dayjsEn.duration(d);
        return {
            year: result.years(),
            month: result.months(),
            day: result.days(),
            hour: result.hours(),
            minute: result.minutes(),
            second: result.seconds()
        };
    };
    const stopCountDown = useCallback(() => {
        clearInterval(countDownId.current);
    }, []);
    const currentDuration = useRef(duration);
    const countDownId = useRef<NodeJS.Timeout>(null!);
    const [countDown, setCountDown] = useState<CountDown>(() => {
        return getCountDown(duration);
    });
    const proceedCountDown = useCallback(() => {
        stopCountDown(); //each time we clear old timer
        countDownId.current = setInterval(() => {
            const newDuration = currentDuration.current - 1000;
            if (newDuration < 0)
                stopCountDown(); //if we reach end we clear timer
            else {
                currentDuration.current = newDuration;
                setCountDown(getCountDown(newDuration));
            }
        }, 1000);
    }, [stopCountDown]);
    useEffect(() => {
        proceedCountDown();
        return () => {
            stopCountDown(); //make sure to clear timer inside return value of useEffect
        };
    }, [proceedCountDown, stopCountDown]);

    return {
        newDuration: currentDuration.current, //latest countdown duration in number
        countDown, //{year,month,day,hour,minute,second}
        proceedCountDown, //method to proceed count down
        stopCountDown //method to stop countdown,
    };
};

export default useCountDown;

//? Example:
// const { countDown, newDuration, proceedCountDown, stopCountDown } = useCountDown({
//     duration: 10_000//10seconds
// });
// <button onClick={() => proceedCountDown()}>enable</button>
// <button onClick={() => stopCountDown()}>disabled</button>
// <h1>{JSON.stringify(countDown)}</h1>
