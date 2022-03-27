import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchData = (source) => {
   return axios.get(url, { cancelToken: source.token })
    .then(res => {
      console.log('res.data:', res.data)
      return JSON.stringify(res.data);
    }) 
    .catch((error) => {
      if (axios.isCancel(error)) return;
    });
}

const useAxios = (url) => {
	// const [response, setResponse] = useState(null);
  let response;

	useEffect(() => {
    const source = axios.CancelToken.source();
    if (!response) {
      axios.get(url, { cancelToken: source.token })
      .then(res => {
        console.log('res.data:', res.data)
        return JSON.stringify(res.data);
      }) 
      .catch((error) => {
        if (axios.isCancel(error)) return;
      });
    }
    return () => source.cancel();
  }, [response]);

  return response;
};

export default useAxios;
