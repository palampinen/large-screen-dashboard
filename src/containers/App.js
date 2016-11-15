import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable'
import './App.css';

import DetailItem from '../components/DetailItem';
import EditButton from '../components/EditButton';
import Dashboard from '../components/Dashboard';
import { selectItem, closeItem, fetchItems, loadMoreItems } from '../ducks/app';

import { WIDGET_TYPES } from '../services/widgets';


class App extends Component {

  componentDidMount() {
    // this.fetchData();
  }

  fetchData() {
    this.props.fetchItems();
  }

  render() {

    const { items, chosenItem, closeItem } = this.props;
    const widgets = [
      {
        type: WIDGET_TYPES.weather,
        size: 'sm'
      },
      {
        type: WIDGET_TYPES.rss,
        size: 'sm'
      },
      {
        type: WIDGET_TYPES.datum,
        size: 'sm'
      },
      {
        type: WIDGET_TYPES.datum,
        size: 'sm'
      },
      {
        type: WIDGET_TYPES.datum,
        size: 'sm'
      },
      {
        type: WIDGET_TYPES.datum,
        size: 'sm'
      },
      {
        type: WIDGET_TYPES.weather,
        size: 'sm'
      },
      {
        type: WIDGET_TYPES.weather,
        size: 'sm'
      },
    ];

    return (
      <div className="App">
        <EditButton item={chosenItem} />
        { chosenItem && <DetailItem item={chosenItem} closeItem={closeItem} /> }
        <Dashboard widgets={widgets} />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  items: store.get('items', fromJS([])),
  chosenItem: store.get('chosenItem'),
  showLoadMore: store.get('showLoadMore'),
  lastItemId: store.get('lastItemId'),
  loading: store.get('loading')
});

const mapDispatchToProps = ({
  fetchItems,
  selectItem,
  loadMoreItems,
  closeItem
});

export default connect(mapStateToProps, mapDispatchToProps)(App);