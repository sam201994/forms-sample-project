/*
 *
 * Form actions
 *
 */

export const ActionTypes = Object.freeze({
  LOAD_FORM_DATA: 'app/container/form/LOAD_FORM_DATA',
  SAVE_FORM_DATA: 'app/container/form/SAVE_FORM_DATA',
  ON_CHANGE_FORM_DATA: 'app/container/form/ON_CHANGE_FORM_DATA',
  LOAD_COUNTRIES: 'app/container/form/loadCountries',
});

function loadCountries(countries) {
  return {
    type: ActionTypes.LOAD_COUNTRIES,
    payload: {
      countries,
    },
  };
}

function loadFormData(data) {
  return {
    type: ActionTypes.LOAD_FORM_DATA,
    payload: {
      data,
    },
  };
}

function saveFormData() {
  return {
    type: ActionTypes.SAVE_FORM_DATA,
  };
}

function onChangeFormData(data) {
  return {
    type: ActionTypes.ON_CHANGE_FORM_DATA,
    payload: {
      data,
    },
  };
}

export default {
  ActionTypes,
  loadFormData,
  saveFormData,
  onChangeFormData,
  loadCountries,
};
