import axios from "axios";

const instance = axios.create({
  baseURL:'/',
  headers:{
    "Content-Type":"application/json;charset=utf-8"
  }
})

//请求拦截器
instance.interceptors.request.use(config =>{
  return config.data
},(error)=>{
  return Promise.reject(error)
})

//响应拦截器
instance.interceptors.response.use(response=>{
  return response
},error=>{
  let msg = "";
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        msg = "抱歉!服务器400";
        break;
      case 401:
        msg = "抱歉!服务器401";
        break;
      case 403:
        msg = "抱歉!服务器403";
        break;
      case 404:
        msg = `请求地址出错:${error.response.config.url}`;
        break;
      case 405:
        msg = "抱歉!服务器405";
        break;
      case 408:
        msg = "抱歉!服务器408";
        break;
      case 500:
        msg = "服务器内部错误，无法完成请求";
        break;
      case 501:
        msg = "服务器不支持请求的功能，无法完成请求";
        break;
      case 502:
        msg =
          "抱歉!服务器502";
        break;
      case 503:
        msg =
          "抱歉!服务器503";
        break;
      case 504:
        msg = "抱歉!服务器504";
        break;
      case 505:
        msg = "抱歉!服务器505";
        break;
      default:
        msg = `请求出错:${error.message}`;
    }
    msg = error.response.data.message || msg;
  } else {
    msg = "服务器连接失败";
  }
  return Promise.reject(error)
})

export default instance