import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { axiosHttp } from './axios-http'

export const GET = <T = never, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig<T>): Promise<R> =>
  axiosHttp.get(url, config)

export const POST = <T = never, R = AxiosResponse<T>>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig<T>
): Promise<R> => axiosHttp.post(url, data, config)

export const PATCH = <T = never, R = AxiosResponse<T>>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig<T>
): Promise<R> => axiosHttp.patch(url, data, config)

export const DELETE = <T = never, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig<T>): Promise<R> =>
  axiosHttp.delete(url, config)
