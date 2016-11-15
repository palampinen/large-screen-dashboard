
import React, { Component } from 'react';
import moment from 'moment';
import './clock.css';

const UPDATE_INTERVAL = 1000;
class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0
    }

    this.setDegrees = this.setDegrees.bind(this);
    this.setTime = this.setTime.bind(this);
  }

  autoRefresher: null

  componentDidMount() {
    this.autoRefresher = setInterval(this.setTime, UPDATE_INTERVAL);
    this.setTime();
  }

  componentWillUnmount() {
    clearInterval(this.autoRefresher);
  }

  setDegrees(target, degrees) {
    this.setState({[target]: degrees});
  }

  setTime() {
    const time = moment();

    this.setDegrees('seconds', 6 * time.seconds());
    this.setDegrees('minutes', 6 * time.hours());
    this.setDegrees('hours', 30 * (time.hours() % 12) + time.minutes() / 2);
  }

  render() {
  	const { hours, minutes, seconds } = this.state;

    return (
      <div className="clock">
        <svg className="analog" viewBox="0 0 100 100">
          <circle className="background" cx="50" cy="50" r="45"/>
          <rect className="hour" ry="0" rx="0" height="25" width="0.5" y="25" x="49.5" transform={`rotate(${hours} 50 50)`} />
          <rect className="min" ry="0" rx="0" height="35" width="0.5" y="15" x="49.5" transform={`rotate(${minutes} 50 50)`} />
          <line className="sec"  x1="50" y1="50.5" x2="50" y2="6" transform={`rotate(${seconds} 50 50)`} />
          <circle className="middot" cx="50" cy="50" r="2.5" />
        </svg>
      </div>
    );
  }
};

export default Clock;

