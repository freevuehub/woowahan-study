import axios, { AxiosResponse, AxiosError } from "axios";
import endpoint from './endpoint.config';

interface IApiSuccessMessage {
  status: string;
}

interface IApiError {
  status: string;
  statusCode: number;
  errorMessage: string;
}

export class ApiError implements IApiError{
  status: string = '';
  statusCode: number = 0;
  errorMessage: string = '';

  constructor(err: AxiosError) {
    this.status = err.response.data.status;
    this.statusCode = err.response.status;
    this.errorMessage = err.response.data.errorMessage;
  }
}

interface INumberOfSuccessFullOrderResponse extends IApiSuccessMessage{
  result: {
    success: number;
  };
}

interface INumberOdFailureOrderResponse extends IApiSuccessMessage {
  result: {
    failure: number;
  };
}

interface IOrderTimelineResponse extends IApiSuccessMessage {
  result: {
    successTimeline: [];
    failureTimeline: [];
  };
}

export function fetchNumberOfSuccessFullOrder(): Promise<INumberOfSuccessFullOrderResponse> {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint.order.request.success({ error: true }))
      .then((resp: AxiosResponse) => resolve(resp.data))
      .catch((err: AxiosError) => reject(new ApiError((err))));
  });
}

export function fetchNumberOfFailureOrder() : Promise<INumberOdFailureOrderResponse> {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint.order.request.failure())
      .then((resp: AxiosResponse) => resolve(resp.data))
      .catch((err: AxiosError) => reject(new ApiError(err)));
  });
}

export function fetchOrderTimeline(date: string): Promise<IOrderTimelineResponse> {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint.order.request.timeline(date))
      .then((resp: AxiosResponse) => resolve(resp.data))
      .catch((err: AxiosError) => reject(new ApiError(err)));
  });
}
