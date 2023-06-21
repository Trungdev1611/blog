import axios from "axios";
import queryString from "query-string";
const baseURL = "http://localhost:3002"
const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});
instance.defaults.withCredentials = true;
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    console.log(`tokenn`, token)
    config.headers.authorization = token; //cấu hình token cho all request
    return config;
  },
  function (error) {
    // Do something with request error
    console.log("request Error", error);
    return Promise.reject(error);
  }
);


// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
  
    if (
      error.response?.status === 401 &&
      error.response?.statusText === "Unauthorized" 
    ) {
      /**
       * cơ bản ở đây là check lỗi gọi lại token mới qua 1 endpoin refreshtoken nhưng mà loằng ngoằng mấy cái cors, cookie quá thôi thì sau
      //mà gặp trường hợp này chắc thảo luận rồi tính tiếp thôi

      //tam luu refreshtoken trong localstorage da

      // alert(123);


      //********nên so sánh cái thời gian hết hạn accesstoken hay chưa để gọi api refreshtoken mới hơn chứ làm như hiện tại để gọi request rồi nếu hết hạn lỗi 401 thì không thực thi được lại cái hàm đã gọi trước đó*/
      //ta nên check acceesstoken hết hạn chưa, hết hạn rồi thì chờ refreshtoken lây token mới rồi mới gọi thực thi hàm, như thế sẽ không bị mất request chứ k nên làm như bên dưới. Bên dưới để tham khảo thôi
      const responseRefreshToken = await instance.get(`/auth/refreshtoken`, {withCredentials: true});
      console.log(`responseRefreshToken`, responseRefreshToken)
      const accessTokenNew = responseRefreshToken?.data.accessTokenNew
      localStorage.setItem(`token`, accessTokenNew)
      const previousRequest = error.config;
      //gọi lại
      instance(previousRequest)
        .then((response) => {
          Promise.resolve(response);
        })
        .catch((err) => {
          Promise.reject(err);
        })
     
   
      // const refreshToken = localStorage.getItem(`refreshtoken`);
      // if (refreshToken) {
    
      //   const responseRefreshToken = await getTokenNewFromRefreshtoken(
      //     refreshToken
      //   );
      //   console.log(`reponseAccessEnpoint`, responseRefreshToken);
      //   //lấy thông tin request trước đó
      //   if (!responseRefreshToken.data?.accessTokenNew) {
      //     throw error;
      //   }
      //   const accessTokenNew = responseRefreshToken?.data.accessTokenNew
      //   localStorage.setItem(`token`, accessTokenNew)
      //   const previousRequest = error.config;
      //   //gọi lại
      //   instance(previousRequest)
      //     .then((response) => {
      //       Promise.resolve(response);
      //     })
      //     .catch((err) => {
      //       Promise.reject(err);
      //     })
        
      // } else {

      //   throw error;
      // }
    }
    alert(error.response?.data?.message || `Có lỗi xảy ra!`      )
    console.log("response error", error);
    return Promise.reject(error);
  }
);

function queryStringData(url: string, params: any) {
  return queryString.stringifyUrl({ url: url, query: params });
}

export const typeFormData = {
  headers: { "Content-Type": "multipart/form-data" },
};

//nếu truyền formData thì ta pass thêm 1 tham số thứ 3 vào method là typeFormData thôi, nó sẽ tự ghi đè application/json

//VD: post: (url: string, payload?: unknown) => instance.post(url, payload, typeFormData),
export const Apiclient = {
  get: (url: string, payload?: object) =>
    instance.get(queryStringData(url, payload)),
  post: (url: string, payload?: unknown) => instance.post(url, payload),
  patch: (url: string, payload?: unknown) => instance.patch(url, payload),
  put: (url: string, payload?: unknown) => instance.put(url, payload),
  delete: (url: string) => instance.delete(url),
  postFormData: (url: string, payload?: unknown) => instance.post(url, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  })
};



