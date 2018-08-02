import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
import {initCart} from '../../store/actions';
import {ObjectToArray, OrderSaveData, WeixinSdkData, payMoney, removeStore} from '../../util/data';
import ConfirmAddress from './confirmAddress';
import ConfirmList from './confirmList';
import Login from '../comm/login';
import '../../assets/css/confirm.css';

class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyCart: null,          // 购物车列表
            userInfo: null,         // 会员详情
            allMoney: 0,            // 订单总金额
            defaultAddress: null,   // 默认地址
        }
    };

    componentDidMount() {
        const {dispatch, userInfo} = this.props;
        dispatch(initCart());
        if (userInfo) {
            let url = window.location.href;
            url = url.split("#");
            WeixinSdkData(
                "weixin",
                "weixinInfo",
                url[0],
                userInfo.wx_openid,
                this.returnWeixin.bind(this)
            );
        }
    };

    componentWillReceiveProps(nextProps) {
        let userInfo = nextProps.userInfo;  // 会员详情
        let address = null;                 // 默认地址
        let allPrice = 0;                   // 订单总价
        if (userInfo) {
            address = userInfo.address[0];
            let url = window.location.href;
            url = url.split("#");
            WeixinSdkData(
                "weixin",
                "weixinSdk",
                url[0],
                userInfo.wx_openid,
                this.returnWeixin.bind(this)
            );
        }
        if (nextProps.buyCart) {
            let arr = ObjectToArray(nextProps.buyCart);   // 将对象转换为数组
            arr.map((item, index) => {
                allPrice += item.num * item.price;
            });   // 计算订单总价
        }
        this.setState({
            buyCart: nextProps.buyCart,
            userInfo: userInfo,
            defaultAddress: address,
            allMoney: allPrice
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        const {defaultAddress, userInfo, buyCart, allMoney} = this.state;
        if (!userInfo) {
            Toast.fail("请登陆会员", 2);
        } else if (!defaultAddress) {
            Toast.fail("请填写收货地址", 2);
        } else if (!buyCart) {
            Toast.fail("请选择商品", 2);
        }
        let arr_id = '';                            // 商品ID
        let arr_num = '';                           // 购买数量
        let len = ObjectToArray(buyCart).length;    // 产品数量
        ObjectToArray(buyCart).forEach((item, index) => {
            arr_id += item.id;
            arr_num += item.num;
            if (index < len - 1) {
                arr_id += ",";
                arr_num += ",";
            }
        });
        OrderSaveData(                          // 保存订单
            "order",                            // 控制器
            "oderSave",                         // 控制器类
            defaultAddress.membername,          // 收货人
            defaultAddress.tel,                 // 联系电话
            defaultAddress.address,             // 收货地址
            arr_id,                             // 商品ID
            arr_num,                            // 商品数量
            allMoney,                           // 订单金额
            userInfo.wx_openid,                 // 微信OPENID
            this.returnData.bind(this)          // 回调函数
        );
    };

    // 保存订单回调函数
    returnData(data) {
        let success = data.success;
        let msg = data.msg;
        if (parseInt(success) === 1) {
            const {userInfo} = this.state;
            let oNo = data.orderNo;
            payMoney("weixin", "weixinPay", oNo, userInfo.wx_openid, this.returnPay.bind(this));
        } else {
            Toast.fail(msg, 2);
        }
    };

    // 微信支付回调函数
    returnPay(data) {
        let success = data.success;
        let msg = data.msg;
        let that = this;
        if (parseInt(success) === 1) {
            let wxpay = data.list;
            wxpay = wxpay.split('|');
            window.wx.ready(function () {
                window.wx.chooseWXPay({
                    timestamp: wxpay[1],  // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: wxpay[2],   // 支付签名随机串，不长于 32 位
                    package: wxpay[3],    // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: wxpay[4],   // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: wxpay[5],    // 支付签名
                    success: function (res) {
                        // 支付成功后的回调函数
                        Toast.success('支付成功', 1, that.cleanCart(that));
                    }
                });
            });// wx.ready end
        }else{
            Toast.success(msg, 2);
        }
    }

    // 微信SDK回调函数
    returnWeixin(data) {
        if (data) {
            window.wx.config({
                debug: false,
                appId: data.appId,
                timestamp: parseInt(data.timestamp),
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    'checkJsApi',
                    'chooseWXPay'
                ]
            });
        }
    };

    // 支付成功跳转
    cleanCart(that) {
        removeStore('buyCart');  // 清空购物车
        that.props.history.push("/centet");
    }

    render() {
        const {defaultAddress, buyCart, allMoney} = this.state;
        return (
            <div className="confirm">
                <ConfirmAddress defaultAddress={defaultAddress}/>
                <ConfirmList buyCart={buyCart} allMoney={allMoney}/>
                <div className="confirmPay">
                    <div onClick={this.handleSubmit.bind(this)}>提交订单</div>
                    <div>合计：<span>￥ {allMoney}</span></div>
                </div>
                <Login/>
            </div>
        )
    };
};

function select(state) {
    return {
        userInfo: state.userInfo,
        buyCart: state.initCart
    };
}

export default connect(select)(withRouter(Confirm));