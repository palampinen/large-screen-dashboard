import React, { Component } from 'react';

import './widget.css';
import { WIDGET_TYPES } from '../../services/widgets';
import Weather from '../Widgets/Weather';
import Datum from '../Widgets/Datum';
import Rss from '../Widgets/Rss';
import Clock from '../Widgets/Clock';
import HtmlWidget from '../Widgets/Html';


class Widget extends Component {
  constructor(props) {
    super(props);
  }

  renderWidget(type) {
    switch(type) {
      case WIDGET_TYPES.weather:
        return <Weather {...this.props} />;
      case WIDGET_TYPES.datum:
        return <Datum {...this.props} />;
      case WIDGET_TYPES.rss:
        return <Rss {...this.props} />;
      case WIDGET_TYPES.clock:
        return <Clock {...this.props} />;
      case WIDGET_TYPES.html:
        return <HtmlWidget {...this.props} />;
      default:
        return <p>No widget {type} found.</p>
    }
  }

  render() {
    const { type } = this.props;
    return (
      <div className="widget">
        {this.renderWidget(type)}
      </div>
    );
  }
};

export default Widget;