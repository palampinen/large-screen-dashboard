
import React, { Component } from 'react';
import './datum.css';

class Datum extends Component {

  render() {
  	const date = new Date();

    return (
      <div className="datum">
				<div>{['SUN','MON','TUE','WED','THU','FRI','SAT'][date.getDay()]}</div>
				<div>{['JAN','FEB','MARCH','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][date.getMonth()]}</div>
				<div>{date.getDate()}</div>
      </div>
    );
  }
};

export default Datum;

