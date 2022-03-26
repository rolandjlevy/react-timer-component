import moment from 'moment';

export const getCountdown = ({cutOffDate}) => {
  const difference = moment(cutOffDate).diff(moment(), 'millseconds');
  const duration = moment.duration(difference);
  return {
    months: duration.months(),
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
    totalMilliseconds: difference
  };
}

// OLD
const fetchData = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await axios.get(url);
      resolve(JSON.stringify(data));
    } catch (error) {
      if (axios.isCancel(error)) return;
      reject(error);
    }
  });
}
