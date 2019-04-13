import axios from "axios";
import { parse, stringify } from "query-string";
import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  companiesLoaded,
  LOAD_COMPANIES,
  CHANGE_FILTERS_COMPANIES,
  loadCompanies
} from "../actions/companies.actions";

export function* watchLoadCompaniesSaga() {
  yield takeLatest(LOAD_COMPANIES, function*({ payload }) {
    let query = parse(payload);
    if (query.type === undefined) query.type = 'standart';
    query = stringify(query);
    
    const response = yield call(axios.get, `/api/companies?${payload}`);
    yield put(companiesLoaded(response.data));
  });
}

export function* watchChangeFiltersCompaniesSaga() {
  yield takeEvery(CHANGE_FILTERS_COMPANIES, function*({ payload }) {
    const { name, value, path } = payload;

    let query = parse(payload.query);
    query[`${name}`] = value;
    yield put(push(`${path}?${stringify(query)}`));
    yield put(loadCompanies(stringify(query)));
  });
}
