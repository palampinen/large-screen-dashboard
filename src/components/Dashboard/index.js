import React, { Component } from 'react';

import Widget from '../Widget';
import './dashboard.css';

class dashboard extends Component {

  render() {
  	const { widgets, selectItem } = this.props;
    return (
      <div id="dashboard" className="dashboard">
        {widgets.map((item, index) => (
          <Widget
            key={index}
            config={item.config || {}}
            size={item.size}
            type={item.type}
            selectItem={selectItem} />
        ))}
      </div>
    );
  }
};

export default dashboard;