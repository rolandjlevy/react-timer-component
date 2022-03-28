import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';

const formatString = (n, str) => {
  const pluralStr = n > 1 ? `${str}s` : str;
  return n > 0 ? `${n} ${pluralStr}` : '';
}

const formatCountdown = (timer) => {
  const { hours, mins, secs } = timer;
  const h = formatString(hours, 'hour');
  const m = formatString(mins, 'minute');
  const s = formatString(secs, 'second');
  return `If ordered within ${h} ${m} ${s}`;
}

const countdownDate = ({ cutOffDate }) => {
  const difference = moment(cutOffDate).diff(moment(), 'millseconds');
  const duration = moment.duration(difference);
  return {
    hours: duration.hours(),
    mins: duration.minutes(),
    secs: duration.seconds(),
    total: difference,
    cutOffDate
  };
}

const url = 'https://express-api-for-react-timer.rolandjlevy.repl.co/cutoff';

const Countdown = () => {
  const init = useRef(null);
  const timerRef = useRef(null);
  const [timer, setTimer] = useState({});
  
  useEffect(() => {
    if (timer && timer.total > 0) {
      timerRef.current = setTimeout(() => {
        const countDown = countdownDate({ cutOffDate: timer.cutOffDate });
        console.log('countDown finished > timer.total', timer.total)
        setTimer(countDown);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [JSON.stringify(timer)]);
  
  useEffect(async () => {
    const source = axios.CancelToken.source();
    if (!init.current || timer.total < 1) {
      try {
        const options = { cancelToken: source.token };
        const { data } = await axios.get(url, options);
        const countdown = countdownDate({ cutOffDate: data.time });
        setTimer(countdown);
        console.log('countDown api call > timer.total', timer.total)
        init.current = true;
      } catch (error) {
        if (axios.isCancel(error)) return;
      }
    }
    return () => source.cancel();
  }, [JSON.stringify(timer)]);

  return (
    <main className="container">
      {init.current &&
        (<section>
          <p>FREE Delivery, Next day</p>
          <p>{timer.total > 0 ? formatCountdown(timer) : 'Loading...'}</p>
          <p>{timer.total > 0 ? JSON.stringify(timer) : '{}'}</p>
        </section>)}
    </main>
  );
}

export default Countdown;