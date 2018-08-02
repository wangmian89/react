
// 定义axios 提交实例begin
let config = {
  transformRequest: [function (data) {
    // Do whatever you want to transform the data
    let ret = '';
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
    }
    return ret;
  }],
  baseURL: 'http://www.lzsyny.cn/api/',
  //baseURL: 'http://lzsyny.jw.com/api/',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
};

export default config;
