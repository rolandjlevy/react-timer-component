import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Resource = () => {
  const url = 'https://reqres.in/api/unknown/1';
  const [resource, setResource] = useState(null);
  console.log('3. Resource mounted');

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (resource) return;
    (async () => {
      try {
        const response = await axios.get(url, { cancelToken: source.token });
        console.log('4. API resolved');
        console.log('response.data:', response.data.data);
        setResource(response.data.data);
      } catch (error) {
        if (axios.isCancel(error)) return;
      }
    })();
    return () => source.cancel();
  }, [resource]);
  
  return (
    <>
      {resource && 
        <p>Succes, ID: {JSON.stringify(resource)}</p>}
    </>
  );
}

export default Resource;