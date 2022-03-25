import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import Resource from './Resource';
import { getCountdown } from '../utils.js';

const Countdown = () => {
  const timerRef = useRef(null);
  const cutOffDate = '2022-03-25T23:38:00';
  const initialCountdown = getCountdown({ cutOffDate });
  const [timer, setTimer] = useState(initialCountdown);
  console.log('1. Countdown started');

  useEffect(() => {
    if (timer.totalMilliseconds > 0) {
      timerRef.current = setTimeout(() => {
        const countDown = getCountdown({ cutOffDate });
        setTimer(countDown);
      }, 1000);
    } else {
      console.log('2. Countdown ended');
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [JSON.stringify(timer)]);

  return (
    <section>
      {timer.totalMilliseconds > 0 ? 
        <p>{JSON.stringify(timer, null, 2)}</p> : 
        <p><Resource /></p>
      }
    </section>
  );
}

export default Countdown;