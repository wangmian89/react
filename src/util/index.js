/**
 * 格式化数字
 *
 * @param {Number} num 需要转化的数字.
 * @returns {Number|String} 返回格式化之后的数字或字符串.
 */
export function numberFormat(num) {
  num = parseInt(num, 10);
  if (num <= 99999) {
    return num;
  }
  num = Math.round(parseInt(num / 10000, 10));
  return `${num}万`;
}

/**
 *格式化歌词
 *@param {string} data 歌唱字符串
 *@return {array} 歌词数组
 *
 */
export function parseLrc(data) {
  const pattern = /\[\d{2}:\d{2}.\d{2,}\]/g;
  if (!pattern.test(data)) {
    return [];
  }
  let lines = data.split('\n');

  const result = [];
  while (!pattern.test(lines[0])) {
    lines = lines.slice(1);
  }
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '' || typeof (lines[i]) === 'undefined') {
      delete lines[i];
    }
  }
  lines.forEach((item) => {
    const time = item.match(pattern);
    const value = item.replace(pattern, '');
    time.forEach((v) => {
      let t = v.slice(1, -1);
      t = t.split(':');
      result.push([(parseInt(t[0], 10) * 60) + parseFloat(t[1]), value]);
    });
  });
  result.sort((a, b) => {
    return a[0] - b[0];
  });
  return result;
}

/**
 * 获取url参数
 *@param {string} name 参数名
 *@return {array} 参数值
 *
 */
export function getUrlParam(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); // 构造一个含有目标参数的正则表达式对象
  const r = window.location.search.substr(1).match(reg); // 匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; // 返回参数值
}

/**
 *函数去抖
 *@param {function} fn 需要执行的函数
 *@param {number} delay 延迟时间
 *@return {function} 调用函数
 *
 */
export function debounce(fn, delay) {
  let last;
  return (...args) => {
    const ctx = this;
    clearTimeout(last);
    last = setTimeout(() => {
      fn.apply(ctx, args);
    }, delay);
  };
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};