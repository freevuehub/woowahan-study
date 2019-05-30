export interface INotification {
  id: number;
  type: string;
  msg: string;
  show: boolean;
  timestamp: number;
}

export interface ITimelineItem {
  item: string;
  count: number;
}

export interface StoreState {
  monitoring: boolean;
  showTimeline: boolean;
  duration: number;
  notification: INotification[];
  success: number;
  failure: number;
  successTimeline: ITimelineItem[];
  failureTimeline: ITimelineItem[];
}
