/*
 *
 * Form reducer
 *
 */

import { ActionTypes } from './actions';

/* eslint-disable default-case, no-param-reassign */

export const initialState = {
  data: {},
  countries: []
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('formData', serializedState);
  } catch (err) {
    throw err;
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOAD_COUNTRIES: {
      const { countries } = action.payload;
      return {
        ...state,
        countries,
      };
    }
    case ActionTypes.SAVE_FORM_DATA: {
      localStorage.clear();
      return {
        ...state,
        data: {},
      };
    }
    case ActionTypes.ON_CHANGE_FORM_DATA: {
      const { data } = action.payload;
      saveState(data);
      return {
        ...state,
        data,
      };
    }
    case ActionTypes.LOAD_FORM_DATA: {
      const { data } = action.payload;
      return {
        ...state,
        data,
      };
    }
    default:
      return state;
  }
}
