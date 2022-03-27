import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';

const formatPlural = (str, n) => n > 1 ? `${str}s` : str;

const formatCountdown = (t) => {
  const hours = t.hours > 0 ? `${t.hours} ${formatPlural('hour', t.hours)}` : '';
  return `If ordered within ${hours} ${t.mins} minutes`;
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
        const initialCountdown = countdownDate({ cutOffDate: data.time });
        setTimer(initialCountdown);
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
          <p>{timer.total > 0 ? formatCountdown(timer) : null}</p>
          <p>{timer.total > 0 ? JSON.stringify(timer) : null}</p>
        </section>)}
    </main>
  );
}

export default Countdown;