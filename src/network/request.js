import axios from 'axios'

export function request(config) {
    // 1、创建axios的实例
    const instance = axios.create({
        baseURL: "http://152.136.185.210:8000/api/z8",
        timeout: 5000
    })
    // 2、axios的拦截其
    // 2.1请求成功与失败
    instance.interceptors.request.use(config => {
        // 拦截之后进行相关操作
        // ...
        // 返回操作后的内容
        return config;
    }, err => {
        // console.log(err);
    });
    // 2.2响应成功与失败
    instance.interceptors.response.use(res => {
        // 返回响应
        return res.data
    }, err => {
        // console.log(err);
    });
    // 发送真正的网络请求并返回
    return instance(config)
}