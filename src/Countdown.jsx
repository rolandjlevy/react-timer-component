import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
// import moment from ' moment-timezone';

const formatPlural = (str, n) => n > 1 ? `${str}s` : str;

const formatCountdown = (t) => {
  const hours = t.hours > 0 ? `${t.hours} ${formatPlural('hour', t.hours)}` : '';
  return `If ordered within ${hours} ${t.mins} minutes`;
}

const countdownDate = ({cutOffDate}) => {
  const difference = moment(cutOffDate).diff(moment(), 'millseconds');
  const duration = moment.duration(difference);
  return {
    hours: duration.hours(),
    mins: duration.minutes(),
    secs: duration.seconds(),
    total: difference
  };
}

const Countdown = () => {
  const timerRef = useRef(null);
  const cutOffDate = "2022-03-27T11:06:48";
  const initialCountdown = countdownDate({ cutOffDate });
  const [timer, setTimer] = useState(initialCountdown);
  const [response, setResponse] = useState(null);

  /* Questions: 
   1. only display hours and minutes?
   2. add one minute to avoid 0 minutes remaining?
  */

  // endpoint for next picking cut off point
  // const url = 'https://jsonplaceholder.typicode.com/albums/1';
  const url = 'https://express-api-for-react-timer.rolandjlevy.repl.co/cutoff';
  
  useEffect(() => {
    if (timer.total > 0) {
      timerRef.current = setTimeout(() => {
        const countDown = countdownDate({ cutOffDate });
        setTimer(countDown);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [JSON.stringify(timer)]);
  
  useEffect(async () => {
    const source = axios.CancelToken.source();
    if (timer.total < 1) {
      try {
        const options = { cancelToken: source.token };
        const { data } = await axios.get(url, options);
        console.log(data);
        setResponse(data);
      } catch (error) {
        if (axios.isCancel(error)) return;
        setResponse(error);
      }
    }
    return () => source.cancel();
  }, [JSON.stringify(timer)]);

  return (
    <main className="container">
      {timer.total > 0 ? 
        (<section>
          <p>FREE Delivery, Next day</p>
          <p>{timer ? formatCountdown(timer) : null}</p>
          <p>{timer ? JSON.stringify(timer) : null}</p>
        </section>) : 
        (<section>
          <h3>API request for next cut off point</h3>
          <p>{response ? JSON.stringify(response) : null}</p>
        </section>)}
    </main>
  );
}

export default Countdown;