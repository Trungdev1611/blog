import axios from 'axios'
import queryString from "query-string";
const instance = axios.create({
    baseURL: 'http://localhost:3002',
    timeout: 10000,
  });

  // Add a request interceptor
  instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['Content-Type'] = "application/json"
    const token = localStorage.getItem("token");
    config.headers.authorization = token; //cấu hình token cho all request
    return config;
  }, function (error) {
    // Do something with request error
    console.log('request Error', error)
    return Promise.reject(error);
  });


  // Add a response interceptor
  instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('response error', error)
    return Promise.reject(error);
  });

  function queryStringData(url: string, params: any) {
    return queryString.stringifyUrl({ url: url, query: params });
  }

export const typeFormData = { headers: { 'Content-Type': 'multipart/form-data' } }

//nếu truyền formData thì ta pass thêm 1 tham số thứ 3 vào method là typeFormData thôi, nó sẽ tự ghi đè application/json
    
    //VD: post: (url: string, payload?: unknown) => instance.post(url, payload, typeFormData),
export const Apiclient = {
    get: (url: string, payload?: object) =>
      instance.get(queryStringData(url, payload)),
    post: (url: string, payload?: unknown) => instance.post(url, payload),
    patch: (url: string, payload?: unknown) => instance.patch(url, payload),
    put: (url: string, payload?: unknown) => instance.put(url, payload),
    delete: (url: string) => instance.delete(url),
  };