import { fromJS } from 'immutable';
import _ from 'lodash';

const SELECT_WIDGET = 'SELECT_WIDGET';
const selectWidget = widget => ({ type: SELECT_WIDGET, payload: widget });
const closeWidget = () => ({ type: SELECT_WIDGET, payload: null });

const SET_WIDGETS = 'SET_WIDGETS';
const GET_WIDGETS_REQUEST = 'GET_WIDGETS_REQUEST';
const GET_WIDGETS_SUCCESS = 'GET_WIDGETS_SUCCESS';
const GET_WIDGETS_FAILURE = 'GET_WIDGETS_FAILURE';

const fetchWidgets = () => {
  return (dispatch) => {
    dispatch({ type: GET_WIDGETS_REQUEST });

    api.fetchModels('feed')
      .then(items => {
        dispatch({
          type: SET_WIDGETS,
          payload: items
        });

        dispatch({ type: GET_WIDGETS_SUCCESS });
      })
      .catch(error => dispatch({ type: GET_WIDGETS_FAILURE, error: true, payload: error }));
  };
};


export {
  fetchWidgets,
  selectWidget,
  closeWidget,
};

// Reducer
const initialState = fromJS({
  items: [],
  chosenWidget: null,
  loading: false
});

export default function app(state = initialState, action) {
  switch (action.type) {
    case SET_WIDGETS: {
      const { payload } = action;
      return state.set('items', fromJS(filterImages(payload)))
    }

    case SELECT_WIDGET:
      return state.set('chosenWidget', fromJS(action.payload));

    case GET_WIDGETS_REQUEST:
      return state.set('loading', true);

    case GET_WIDGETS_SUCCESS:
    case GET_WIDGETS_FAILURE:
      return state.set('loading', false)

    default:
      return state;
  }
}
