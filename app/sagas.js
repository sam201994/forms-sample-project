/* @flow */

import { fork, all } from 'redux-saga/effects';

import formSaga from 'containers/Form/saga';

function* rootSaga() {
  yield all([fork(formSaga)]);
}

export default rootSaga;
