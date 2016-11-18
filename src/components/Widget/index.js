import React, { Component } from 'react';
import * as widgets from '../Widgets/widgets';

import './widget.css';

class Widget extends Component {
  constructor(props) {
    super(props);
  }

  renderWidget(type) {
    // rss -> Rss
    const upperCasedType = type ? type.charAt(0).toUpperCase() + type.slice(1) : null;
    const WidgetComponent = widgets[upperCasedType];

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