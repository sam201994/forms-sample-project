/**
 * Form Sagas
 */

import { put, takeLatest, all, call } from 'redux-saga/effects';
import request from 'utils/request';
import FormActions from './actions';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('formData');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return err;
  }
};

export function* handleLoadFormData(action) {
  const { location } = action.payload;
  const requestURL = `https://restcountries.eu/rest/v2/all`;

  if (location.pathname === '/') {
    try {
      const countries = yield call(request, requestURL);
      const c = countries.map(country => ({
        label: country.name,
        value: country.alpha3Code,
      }));
      yield put(FormActions.loadCountries(c));
      const formData = loadState('formData');
      yield put(FormActions.loadFormData(formData));
    } catch (err) {
      throw err;
    }
  }
}

function* formSaga() {
  yield all([yield takeLatest('@@router/LOCATION_CHANGE', handleLoadFormData)]);
}

export default formSaga;
