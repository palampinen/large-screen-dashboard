import React, { Component } from 'react';

import Widget from '../Widget';
import './dashboard.css';

class dashboard extends Component {

  render() {

  	const { widgets, selectItem } = this.props;
    return (
      <div className="dashboard">
        {widgets.map((item, index) => (
          <Widget key={index} config={item} type={item.type} selectItem={selectItem} />
        ))}
      </div>
    );
  }
};

export default dashboard;