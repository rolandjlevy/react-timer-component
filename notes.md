# Notes

- https://stackoverflow.com/questions/42031436/momentjs-get-time-until-with-two-variables
- https://reqres.in/
- https://randomuser.me/api/?page=1

```html
  <p>Time left until cut-off: {formattedCutOffDate}</p>
```

```js
  const formattedCutOffDate = moment(cutOffDate).format('llll');

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      const countDown = getCountdown({ cutOffDate });
      setTimer(countDown);
    }, 1000);
    return () => clearInterval(timerRef.current);
  });

  useEffect(() => {
    if (timer && timer.totalMilliseconds < 1) {
      clearInterval(timerRef.current);
    }
  }, [timer]);
```