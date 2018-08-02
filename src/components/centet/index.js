import React, {Component} from 'react';
import {withRouter, NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import {Toast, PullToRefresh} from 'antd-mobile';
import {ObjectToArray, OrderListData} from '../../util/data';
import Head from './head';
import Footer from '../comm/footer';
import Login from '../comm/login';
import '../../assets/css/orders.css';


class Center extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.userInfo,     // 会员详情
            data: {},                          // 数据详情
            refreshing: false,
            isLoading: true,
            height: document.documentElement.clientHeight
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            userInfo: nextProps.userInfo,
        });
        OrderListData('center', 'orderList', nextProps.userInfo.wx_openid, 0, this.returnData.bind(this));
    };

    componentDidMount() {
        const {userInfo} = this.state;
        if (userInfo) {
            OrderListData('center', 'orderList', userInfo.wx_openid, 0, this.returnData.bind(this));
        }
    }

    returnData(dataArr) {
        const {data} = this.state;
        let oldArr = ObjectToArray(data);   // 原始数据
        let newArr = dataArr.list;          // 返回的最新数据
        let success = dataArr.success;      // 查询状态成功
        if ( Number(success) === 1 ){       // 如果查询成功
            for (let i = 0; i < newArr.length; i++) {
                oldArr.push(newArr[i]);     // 将返回的最新数据加入原始数据中
            }
            this.setState({                 // 更新state状态
                data: oldArr                // 返回数据
            });
        }else{                              // 查询状态失败
            let msg = dataArr.msg;          // 文字提示
            Toast.fail(msg, 2);             // 弹出提示层
        }
    }

    // 下拉加载更多数据
    onRefresh = () => {
        const {data, userInfo} = this.state;
        let len = data.length;
        let ordertime = data[len - 1].ordertime;
        this.setState({refreshing: true, isLoading: true});
        setTimeout(() => {
            OrderListData('center', 'orderList', userInfo.wx_openid, ordertime, this.returnData.bind(this));
        }, 600);
    };

    render() {
        const {data} = this.state;
        let list = null;
        if (data) {
            list = ObjectToArray(data).map((item, index) => (
                <div className="orderList" key={index}>
                    <NavLink to={{pathname: '/viwe/' + item.orderNo, state: {oNo: item.orderNo, name: "viwe"}}}>
                        <p>
                            <span>订单编号：{item.orderNo}</span>
                        </p>
                        <p>
                            <span>订单总价：￥ {item.amount}</span>
                            <span>付款状态：{item.tradestatus === 'TRADE_SUCCESS' ? <span className="green">已付款</span> :
                                <span className="red">未付款</span>}</span>
                        </p>
                        <p>
                            <span>收货人：{item.receiver}</span>
                            <span>联系电话：{item.rephone}</span>
                        </p>
                        <p>收货地址：{item.address}</p>
                    </NavLink>
                </div>
            ));
            list = (
                <PullToRefresh
                    style={{height: this.state.height, overflow: 'auto'}}
                    indicator={this.state.down ? {} : {deactivate: '上拉可以刷新'}}
                    direction={this.state.down ? 'down' : 'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                >
                    {list}
                </PullToRefresh>
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
