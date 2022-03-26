import React, { useEffect, useState, useRef } from 'react';
import useAxios from './hooks';
import axios from 'axios';
import { getCountdown } from '../utils.js';

const Countdown = () => {
  const timerRef = useRef(null);
  const cutOffDate = '2022-03-26T09:22:00';
  const initialCountdown = getCountdown({ cutOffDate });
  const [timer, setTimer] = useState(initialCountdown);
  const [response, setResponse] = useState(null);

  // TODO: change to axios.get(url, { cancelToken: source.token }) ?
  const fetchData = (url) => {
    return new Promise((resolve, reject) => {
      return axios.get(url)
        .then(res => resolve(JSON.stringify(res.data))) 
        .catch(error => reject(error));
     });
  }
  
  useEffect(() => {
    if (timer.totalMilliseconds > 0) {
      timerRef.current = setTimeout(() => {
        const countDown = getCountdown({ cutOffDate });
        setTimer(countDown);
      }, 1000);
    } else {
      fetchData('https://reqres.in/api/unknown/1')
      .then(res =>  setResponse(res))
      .catch(error => setResponse(error))
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [JSON.stringify(timer)]);

  return (
    <section>
      {timer.totalMilliseconds > 0 ? 
        <p>{JSON.stringify(timer, null, 2)}</p> : 
        <p>{response}</p>
      }
    </section>
  );
}

export default Countdown;