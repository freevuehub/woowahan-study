import {
  all,
  fork,
  take,
  select,
  delay,
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
import moment from 'moment';
import { getType } from "typesafe-actions";
import * as Actions from '../actions';
import * as Api from '../apis/order';
import { StoreState } from "../types";

function* fetchOrderTimeline() {
  const {
    result: { successTimeline, failureTimeline }
  } = yield call(Api.fetchOrderTimeline, moment().format('YYYYMMDD'));

  // yield put(Actions)
}
