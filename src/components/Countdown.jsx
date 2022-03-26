import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';

const countdownDate = ({cutOffDate}) => {
  const difference = moment(cutOffDate).diff(moment(), 'millseconds');
  const duration = moment.duration(difference);
  return {
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
    total: difference
  };
}

const Countdown = () => {
  const timerRef = useRef(null);
  const cutOffDate = '2022-03-26T17:01:00';
  const initialCountdown = countdownDate({ cutOffDate });
  const [timer, setTimer] = useState(initialCountdown);
  
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

  const [response, setResponse] = useState({});
  const url = 'https://reqres.in/api/unknown/1';
  
  useEffect(async () => {
    if (timer.total < 1) {
      const source = axios.CancelToken.source();
      try {
        const options = { cancelToken: source.token };
        const { data } = await axios.get(url, options);
        setResponse(data);
      } catch (error) {
        if (axios.isCancel(error)) return;
        setResponse(error);
      }
    }
    return () => source.cancel();
  }, [JSON.stringify(timer)]);

  return (
    <section>
      {timer.total > 0 ? 
        <p>{JSON.stringify(timer)}</p> : 
        <p>{JSON.stringify(response)}</p>}
    </section>
  );
}

export default Countdown;