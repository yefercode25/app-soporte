export interface APIResponse<T> {
  message: string;
  data: T;
  statusCode: number;
  statusText: string;
}