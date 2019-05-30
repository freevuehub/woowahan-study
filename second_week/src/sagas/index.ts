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

  yield put(Actions.updateOrderTimeline(successTimeline, failureTimeline));
}

function* monitorWorkflow() {
  while (yield take(getType(Actions.startMonitoring))) {
    let polling = true;

    while (polling) {
      try {
        const [succResp, failResp] = yield all([
          call(Api.fetchNumberOfSuccessFullOrder),
          call(Api.fetchNumberOfFailureOrder)
        ]);

        const { showTimeline }: StoreState = yield select();

        if (showTimeline) {
          yield fork(fetchOrderTimeline);
        }


      } catch (e) {
        if (e instanceof Api.ApiError) {
          yield put(Actions.addNotification('Error', e.errorMessage));
        } else {
          console.error(e);
        }
      }
    }
  }
}
