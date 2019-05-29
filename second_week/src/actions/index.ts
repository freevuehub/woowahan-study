import { createAction } from 'typesafe-actions';

export const addNotification = createAction('@notification/add', reolve => {
  return (type: string, msg: string) => reolve({ type, msg });
});

export const showNotification = createAction(
  '@notification/showed',
  resolve => {
    return (id: number) => resolve({ id });
  }
);

export const startMonitoring = createAction(
  '@command/monitoring/start',
  resolve => {
    return () => resolve();
  }
);

export const showOrderTimelineChart = createAction(
  '@command/timeline/chart/show',
  resolve => {
    return () => resolve();
  }
);

export const hideOrderTimelineChart = createAction(
  '@command/timeline/chart/hide',
  resolve => {
    return () => resolve();
  }
);

export const stopMonitoring = createAction(
  '@command/monitoring/stop',
  resolve => {
    return () => resolve();
  }
);

export const fetchSuccess = createAction('@fetch/success', resolve => {
  return () => resolve();
});

export const fetchFailure = createAction('@fetch/failure', resolve => {
  return () => resolve();
});
