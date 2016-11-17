import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable'
import _ from 'lodash'
import './App.css';

import DetailWidget from '../components/DetailItem';
import EditButton from '../components/EditButton';
import FullScreenButton from '../components/FullScreenButton';
import Dashboard from '../components/Dashboard';
import { selectWidget, closeWidget, fetchWidgets } from '../ducks/app';

import { WIDGET_TYPES } from '../constants/widgets';
import widgets from '../widget.config.js';

const WIDGET_COUNT = 8;

class App extends Component {

  componentDidMount() {
    this.fetchWidgets();
  }

  fetchWidgets() {
    console.log('get widgets');
  }

  render() {

    const { chosenWidgets, closeWidget } = this.props;
    const staticWidgets = widgets.concat([
      {
        type: WIDGET_TYPES.html,
        config: {
          size: 'lg',
          targetField: 'value', // in response
          url: 'https://private-d9236-largescreendashboard.apiary-mock.com/number'
        }
      },
      {
        type: WIDGET_TYPES.rss,
      },
      {
        type: WIDGET_TYPES.html,
        config: {
          targetField: 'html', // in response
          url: 'https://private-d9236-largescreendashboard.apiary-mock.com/table'
        }
      },
      {
        type: WIDGET_TYPES.html,
        config: {
          size: 'lg',
          targetField: 'value', // in response
          url: 'https://private-d9236-largescreendashboard.apiary-mock.com/number/alert'
        }
      },
      {
        type: WIDGET_TYPES.datum,
      },
      {
        type: WIDGET_TYPES.clock,
      },
      {
        type: WIDGET_TYPES.weather,
      },
      {
        type: WIDGET_TYPES.rss,
        config: {
          url: 'https://github.com/facebook/react-native/commits/master.atom'
        }
      },
    ]).slice(0, WIDGET_COUNT);


    return (
      <div className="App">
        { <FullScreenButton />}
        { chosenWidgets && <DetailWidget item={chosenWidgets} closeWidget={closeWidget} /> }
        <Dashboard widgets={staticWidgets} />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  widgets: store.get('widgets', fromJS([])),
  chosenWidgets: store.get('chosenWidgets'),
  loading: store.get('loading')
});

const mapDispatchToProps = ({
  fetchWidgets,
  selectWidget,
  closeWidget
});

export default connect(mapStateToProps, mapDispatchToProps)(App);