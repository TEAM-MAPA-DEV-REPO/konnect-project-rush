import React, { Component } from 'react';
// import moment from 'moment';
import moment from 'moment-timezone';
import momentOrigin from 'moment';
export default class Countdown extends Component {
    constructor(props) {
        super(props);
        this.count = this.count.bind(this);
        this.state = {day:0, hours: 0, minutes: 0, seconds: 0 };
        this.timer = null;
        this.deadline = null;
        
        this.eventStartTimeUTCTimeStamp = null;
    }

    
    count() {
        // let now = new Date().getTime();
        let now = (momentOrigin().utc().unix() + (9 * 60 * 60)) * 1000;
        // console.log(new Date().getUTC)
        let t = this.deadline - now;
        // console.log(now, '|', this.deadline, '\n', t);
        // let day = Math.floor((t / (1000 * 60 * 60 * 24)));
        let hours = Math.floor((t / ( 1000 * 60 * 60)));
        // console.log((1000 * 60 * 60 * 24),(t % (1000 * 60 * 60 * 24)),(t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        let minutes = Math.floor((t % ( 1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((t % ( 1000 * 60 )) / 1000);
        // console.log(hours,' ', minutes,' ', seconds);
        this.setState({ hours, minutes, seconds});

        if( t < 0 ) {
            clearInterval(this.timer);
            this.setState({ hour: 0, minutes: 0, seconds: 0});
        }
    }

    componentDidMount() {
        // 이벤트 종료시간의 UTC 시간 타임스탬프(2022/04/24 12:00:00)
        // this.eventEndTimeUTCTimeStamp = 1650801600000;
        this.eventStartTimeUTCTimeStamp = moment.tz("2022/04/29 00:00:00", "UTC").unix() * 1000;

        // this.deadline = new Date('2022/04/24 12:00:00').getTime();
        this.deadline = this.eventStartTimeUTCTimeStamp;
        // console.log(this.deadline);
        this.timer = setInterval(this.count,1000);

    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
        clearInterval(this.deadline);
    }

  render() {
    const { hours, minutes, seconds} = this.state;
    return (
        <div className='timerBox'>
            <span className='timer'>
                {/* {day < 10 ? `0${day}` : day}: */}
                {hours < 0 ? "00" : (hours < 10 ? `0${hours}` :  hours)}:
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
            </span>
        </div>
        );
  }
}

  