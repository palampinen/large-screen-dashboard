import React, { Component } from 'react';
import * as widgets from '../Widgets/widgets';

import './widget.css';

class Widget extends Component {
  constructor(props) {
    super(props);
  }

  renderWidget(type) {

    const WidgetComponent = widgets[type];

    if (WidgetComponent) {
      return <WidgetComponent {...this.props} />
    }
    return <p>No widget {type} found.</p>;

  }

  render() {
    const { type, size } = this.props;
    return (
      <div className={`widget ${size ? `widget--size-${size}` : ''}`}>
        {this.renderWidget(type)}
      </div>
    );
  }
};

export default Widget;