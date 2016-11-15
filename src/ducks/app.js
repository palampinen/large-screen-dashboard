import Immutable from 'immutable';



import _ from 'lodash';
import api from '../services/api';

const SELECT_ITEM = 'SELECT_ITEM';
const selectItem = item => ({ type: SELECT_ITEM, payload: item });
const closeItem = item => ({ type: SELECT_ITEM, payload: null });

const SET_ITEMS = 'SET_ITEMS';
const GET_FEED_REQUEST = 'GET_FEED_REQUEST';
const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
const GET_FEED_FAILURE = 'GET_FEED_FAILURE';
const HIDE_LOAD_MORE = 'HIDE_LOAD_MORE';
const fetchItems = () => {
  return (dispatch) => {
    dispatch({ type: GET_FEED_REQUEST });

    api.fetchModels('feed')
      .then(items => {
        dispatch({
          type: SET_ITEMS,
          payload: items
        });
        if (_.isEmpty(items)) {
          dispatch({ type: HIDE_LOAD_MORE });
        }

        dispatch({ type: GET_FEED_SUCCESS });
      })
      .catch(error => dispatch({ type: GET_FEED_FAILURE, error: true, payload: error }));
  };
};


const APPEND_ITEMS = 'APPEND_ITEMS';
const REFRESH_FEED_REQUEST = 'REFRESH_FEED_REQUEST';
const REFRESH_FEED_SUCCESS = 'REFRESH_FEED_SUCCESS';
const loadMoreItems = (lastID) => {
  return (dispatch) => {

    dispatch({ type: REFRESH_FEED_REQUEST });
    api.fetchMoreFeed(lastID)
      .then(items => {
        dispatch({
          type: APPEND_ITEMS,
          payload: items
        });
        dispatch({ type: REFRESH_FEED_SUCCESS });
        dispatch({ type: GET_FEED_SUCCESS });
      })
      .catch(error => dispatch({ type: REFRESH_FEED_SUCCESS }));
  };
};

export {
  fetchItems,
  selectItem,
  closeItem,
  loadMoreItems,
};

// Reducer
const initialState = Immutable.fromJS({
  items: [],
  chosenItem: null,
  showLoadMore: true,
  lastItemId: '',
  loading: false
});

// Get only images
const filterImages = items => items.filter(item => item.type === 'IMAGE');


export default function app(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS: {
      const { payload } = action;
      return state.merge({
        items: Immutable.fromJS(filterImages(payload)),
        lastItemId: payload[payload.length - 1].id
      });
    }
    case SELECT_ITEM:
      return state.set('chosenItem', Immutable.fromJS(action.payload));

    case APPEND_ITEMS: {
      const { payload } = action;
      return (payload && payload.length)
        ? state.merge({
          items: Immutable.fromJS(state.get('items')
          .concat(Immutable.fromJS(filterImages(payload)))),
          lastItemId: payload[payload.length - 1].id
        })
        : state;
    }
    case HIDE_LOAD_MORE:
      return state.set('showLoadMore', false);

    case GET_FEED_REQUEST:
    case REFRESH_FEED_REQUEST:
      return state.set('loading', true);

    case GET_FEED_SUCCESS:
    case REFRESH_FEED_SUCCESS:
      return state.set('loading', false)

    default:
      return state;
  }
}
