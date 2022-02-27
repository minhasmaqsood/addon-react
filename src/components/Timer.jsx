import React, {useEffect} from 'react';
import { useTimer } from 'react-timer-hook';

const MyTimer = ({ expiryTimestamp })  => {
    useEffect(() =>  {
        if (expiryTimestamp){
            restart(expiryTimestamp)
        }
    }, [expiryTimestamp])
    const {
        seconds,
        minutes,
        restart
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

    return (
        <div>
               <span>{minutes}</span>:<span>{seconds}</span>
        </div>
    );
}
const Timer = ({TIME}) => {
    let hms = '00:' + TIME;
    let a = hms.split(':');
    let sec = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    console.log(sec)
    const time = new Date();
    time.setSeconds(time.getSeconds() + sec);
    return (
        <div>
            <MyTimer expiryTimestamp={time} />
        </div>
    );
}
export default Timer;
