import React, {Component} from 'react';
import {withRouter, NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
import {OrderViweData, ObjectToArray} from '../../util/data';
import Head from './head';
import Footer from '../comm/footer';
import Login from '../comm/login';
import '../../assets/css/viwe.css';


class Center extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oNo: this.props.match.params.oNo,         // 订单编号
            userInfo: this.props.userInfo,            // 会员详情
            data: null,                               // 数据详情
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            userInfo: nextProps.userInfo,             // 会员详情
            oNo: nextProps.oNo,                       // 订单编号
        });
        OrderViweData(
            'center',
            'orderViwe',
            nextProps.match.params.oNo,
            nextProps.userInfo.wx_openid,
            this.returnData.bind(this)
        );
    };

    componentDidMount() {
        const {userInfo, oNo} = this.state;
        if (userInfo && oNo) {
            OrderViweData('center', 'orderViwe', oNo, userInfo.wx_openid, this.returnData.bind(this));
        }
    }

    returnData(data) {
        let success = data.success;     // 查询状态
        let msg = data.msg;             // 提示文字
        if (parseInt(success) === 1) {
            this.setState({
                data: data.viwe,        // 返回数据
            });
        } else {
            Toast.fail(msg, 2);         // 弹出提示文字
        }
    }

    render() {
        const {data} = this.state;
        let list = null, product = null;
        if (data) {
            product = ObjectToArray(data.goods).map((item, index) => (
                <div key={index}>
                    <NavLink to={{pathname: '/pcon/' + item.pid, state: {id: item.pid, name: "pcon"}}}>
                        <div><img src={item.pic} alt={item.name}/></div>
                        <div>
                            <p>{item.name}</p>
                            <p>价格：￥ {item.price}，数量：x {item.num}</p>
                        </div>
                    </NavLink>
                </div>
            ));
            list = (
                <div>
                    <div className="viweProduct">{product}</div>
                    <div className="viweHead">
                        <p>订单编号：{data.orderNo}</p>
                        <p>下单时间：{data.ordertime}</p>
                    </div>
                    <div className="viwePay">
                        <p>支付方式：微信支付</p>
                        {data.tradestatus === "TRADE_SUCCESS" ? <p>支付时间：{data.notify_time}</p> : ''}
                    </div>
                    <div className="vierInfo">
                        <p>收货人：{data.receiver}（{data.rephone}）</p>
                        <p>收货地址：{data.address}</p>
                    </div>
                    <div className="viweMoney">
                        <p>实付款：<span>￥ {data.amount}</span></p>
                    </div>
                </div>
            );
        }
        return (
            <div className="center">
                <Head/>
                {list}
                <Footer/>
                <Login/>
            </div>
        )
    };
}


function select(state) {
    return {
        userInfo: state.userInfo,
    };
}

export default connect(select)(withRouter(Center));
