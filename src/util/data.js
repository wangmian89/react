import axios from 'axios';
import axiosconfig from './axiosconfig';


/**
 * 格式化日期时间
 *
 * @param {Number} num 需要转化的数字.
 * @returns {Number|String} 返回格式化之后的数字或字符串.
 */
export function dateFormat(data) {
    var str = String(data);
    str = str.replace(/ GMT.+$/, '');// Or str = str.substring(0, 24)
    var d = new Date(str);
    var a = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];
    for (var i = 0, len = a.length; i < len; i++) {
        if (a[i] < 10) {
            a[i] = '0' + a[i];
        }
    }
    str = a[0] + '-' + a[1] + '-' + a[2] + ' ' + a[3] + ':' + a[4] + ':' + a[5];
    return str;
}

/**
 * 获取URL参数
 *
 * @param {variable} String 需要获取的参数名.
 * @function {callback}     回调函数
 * @returns {Number|String} 返回格式化之后的数字或字符串.
 */
export function getQueryVariable(variable, callBack) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == variable) {
            callBack(pair[1]);
            return false;
        }
    }
    return false;
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


/**
 * 对象转换为数组
 *
 * @param {msg} String 需要转化的对象.
 * @returns {String} 返回格式化之后的数组.
 */
export function ObjectToArray(msg) {
    let arr = Object.keys(msg).map(key => msg[key]);
    return arr;
}


/**
 * 读取首页banner广告
 *
 * @param {control} String  控制器
 * @param {action} String   控制器类
 * @param {adpos} Int       广告位置
 * @function {callback}     回调函数
 */
export function homeBanner(control, action, adpos, callback) {
    axios.post('/index.php', {
        control: control,
        action: action,
        adpos: adpos
    }, axiosconfig).then(function (response) {
        let data = response.data;
        callback(data);
    }).catch(function (error) {
        console.log(error);
    });
}

/**
 * 读取首页文章数据
 *
 * @param {control} String  控制器
 * @param {action} String   控制器类
 * @param {cid} Int         栏目ID
 * @param {num} Int         调用条数
 * @param {size} Int        简介显示字数
 * @function {callback}     回调函数
 */
export function homeData(control, action, cid, num, size, callback) {
    axios.post('/index.php', {
        control: control,
        action: action,
        cid: cid,
        num: num,
        size: size
    }, axiosconfig).then(function (response) {
        let data = response.data;
        callback(data);
    }).catch(function (error) {
        console.log(error);
    });
}

/**
 * 读取文章详情
 *
 * @param {control} String  控制器
 * @param {action} String   控制器类
 * @param {id} Int          文章ID
 * @function {callback}     回调函数
 */
export function conentData(control, action, id, callback) {
    axios.post('/index.php', {
        control: control,
        action: action,
        id: id
    }, axiosconfig).then(function (response) {
        let data = response.data;
        callback(data);
    }).catch(function (error) {
        console.log(error);
    });
}

/**
 * 读取文章列表
 *
 * @param {control} String  控制器
 * @param {action} String   控制器类
 * @param {id} Int          栏目ID
 * @param {lasttime} Int    最后一条记录时间
 * @function {callback}     回调函数
 */
export function listData(control, action, id, lastTime, callback) {
    axios.post('/index.php', {
        control: control,
        action: action,
        id: id,
        lastTime: lastTime
    }, axiosconfig).then(function (response) {
        let data = response.data;
        callback(data);
    }).catch(function (error) {
        console.log(error);
    });
}

/**
 * 读取子栏目列表
 *
 * @param {control} String  控制器
 * @param {action} String   控制器类
 * @param {id} Int          顶级栏目ID
 * @param {num} Int         显示条数
 * @function {callback}     回调函数
 */
export function smallMenuData(control, action, id, num, callback) {
    axios.post('/index.php', {
        control: control,
        action: action,
        id: id,
        num: num
    }, axiosconfig).then(function (response) {
        let data = response.data;
        callback(data);
    }).catch(function (error) {
        console.log(error);
    });
}

/**
 * 保存新增收货地址
 *
 * @param {control} String          控制器
 * @param {action} String           控制器类
 * @param {recMan} String           收货人
 * @param {recPhone} String         联系电话
 * @param {recAddress} String       收货地址
 * @param {openid} String           会员微信OPENID
 * @function {callback}             回调函数
 */
export function NewAddressData(control, action, recMan, recPhone, recAddress, openid, callback) {
    axios.post('/index.php', {
        control: control,
        action: action,
        recMan: recMan,
        recPhone: recPhone,
        recAddress: recAddress,
        openid: openid
    }, axiosconfig).then(function (response) {
        let data = response.data;
        callback(data);
    }).catch(function (error) {
        console.log(error);
    });
}

/**
 * 保存订单
 *
 * @param {control} String          控制器
 * @param {action} String           控制器类
 * @param {recMan} String           收货人
 * @param {recPhone} String         联系电话
 * @param {recAddress} String       收货地址
 * @param {ids} String              商品ID
 * @param {nums} String             商品数量
 * @param {openid} String           会员微信OPENID
 * @param {money} parseFloat        订单金额
 * @function {callback}             回调函数
 */
export function OrderSaveData(control, action, recMan, recPhone, recAddress, ids, nums, money, openid, callback) {
    axios.post('/index.php', {
        control: control,
        action: action,
        recMan: recMan,
        recPhone: recPhone,
        recAddress: recAddress,
        ids: ids,
        nums: nums,
        money: money,
        openid: openid
    }, axiosconfig).then(function (response) {
        let data = response.data;
        callback(data);
    }).catch(function (error) {
        console.log(error);
    });
}

/**
 * 订单列表
 *
 * @param {control} String          控制器
 * @param {action} String           控制器类
 * @param {orderTime} int           最后一条订单时间
 * @param {openid} String           会员微信OPENID
 * @function {callback}             回调函数
 */
export function OrderListData(control, action, openid, orderTime, callback) {
    axios.post('/index.php', {
        control: control,
        action: action,
        openid: openid,
        orderTime: orderTime
    }, axiosconfig).then(function (response) {
        let data = response.data;
        callback(data);
    }).catch(function (error) {
        console.log(error);
    });
}

/**
 * 订单详情
 *
 * @param {control} String          控制器
 * @param {action} String           控制器类
 * @param {oNo} String              订单编号
 * @param {openid} String           会员微信OPENID
 * @function {callback}             回调函数
 */
export function OrderViweData(control, action, oNo, openid, callback) {
    axios.post('/index.php', {
        control: control,
        action: action,
        oNo: oNo,
        openid: openid
    }, axiosconfig).then(function (response) {
        let data = response.data;
        callback(data);
    }).catch(function (error) {
        console.log(error);
    });
}

/**
 * 读取微信信息
 *
 * @param {control} String          控制器
 * @param {action} String           控制器类
 * @param {code} String             微信CODE
 * @function {callback}             回调函数
 */
export function WeixinInfoData(control, action, code, callback) {
    axios.post('/index.php', {
        control: control,
        action: action,
        code: code
    }, axiosconfig).then(function (response) {
        let data = response.data;
        callback(data);
    }).catch(function (error) {
        console.log(error);
    });
}

/**
 * 读取微信SKD
 *
 * @param {control} String          控制器
 * @param {action} String           控制器类
 * @param {url} String              URL地址
 * @param {openid} String           会员微信OPENID
 * @function {callback}             回调函数
 */
export function WeixinSdkData(control, action, url, openid, callback) {
    axios.post('/index.php', {
        control: control,
        action: action,
        url: url,
        openid: openid
    }, axiosconfig).then(function (response) {
        let data = response.data.list;
        callback(data);
    }).catch(function (error) {
        console.log(error);
    });
}

/**
 * 调用微信支付
 *
 * @param {control} String          控制器
 * @param {action} String           控制器类
 * @param {oNo} String              订单编号
 * @param {openid} String           会员微信OPENID
 * @function {callback}             回调函数
 */
export function payMoney(control, action, oNo, openid, callback) {
    axios.post('/index.php', {
        control: control,
        action: action,
        oNo: oNo,
        openid: openid
    }, axiosconfig).then(function (response) {
        let data = response.data;
        callback(data);
    }).catch(function (error) {
        console.log(error);
    });
}


/**
 * 会员登陆
 *
 * @param {control} String          控制器
 * @param {action} String           控制器类
 * @param {openid} String           会员微信OPENID
 * @function {callback}             回调函数
 */
export function login(control, action, openid, callback) {
    axios.post('/index.php', {
        control: control,
        action: action,
        openid: openid
    }, axiosconfig).then(function (response) {
        let data = response.data;
        callback(data);
    }).catch(function (error) {
        console.log(error);
    });
}

/**
 * 会员注册
 *
 * @param {control} String          控制器
 * @param {action} String           控制器类
 * @param {openid} String           微信OPENID
 * @param {nickname} String         微信昵称
 * @param {headimgurl} String       微信头像
 * @param {sex} int                 性别
 * @function {callback}             回调函数
 */
export function reg(control, action, openid, nickname, headimgurl, sex, callback) {
    axios.post('/index.php', {
        control: control,
        action: action,
        openid: openid,
        nickname: nickname,
        headimgurl: headimgurl,
        sex: sex
    }, axiosconfig).then(function (response) {
        let data = response.data;
        callback(data);
    }).catch(function (error) {
        console.log(error);
    });
}