import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {ObjectToArray} from '../../util/data';
import {Modal} from 'antd-mobile';
import ConfirmNewAddress from './confirmNewAddress';

class confirmAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultAddress: this.props.defaultAddress,         // 默认收货地址
            userInfo: null,                                    // 会员详情
            isShow: false,                                     // 隐藏层是否可见
            isAdd: false,                                      // 是否添加新收货地址
            recMan: null,                                      // 收货人
            recPhone: null,                                    // 联系电话
            recAddress: null,                                  // 收货地址
        };
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            defaultAddress: nextProps.defaultAddress,           // 默认收货地址
            userInfo: nextProps.userInfo,                       // 会员详情
        });
    };

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true
        });
    };
    onClose = key => () => {
        this.setState({
            [key]: false
        });
    };

    choiceList = index => (e) => {
        this.setState({
            isShow: false,
            defaultAddress: {
                id: this.state.userInfo.address[index].id,
                address: this.state.userInfo.address[index].address,
                membername: this.state.userInfo.address[index].membername,
                tel: this.state.userInfo.address[index].tel
            }
        });
    };

    returnNewAddress(id, recMan, recPhone, recAddress) {    // 保存新收货地址回调函数
        this.setState({
            isAdd: false,
            isShow: false,
            defaultAddress: {
                id: id,
                membername: recMan,
                tel: recPhone,
                address: recAddress,
            }
        });
    };

    render() {
        const {defaultAddress, userInfo, isShow, isAdd} = this.state;
        let list = null, choiceList = null, ModalStr = null;
        if (defaultAddress) {
            list = (
                <div className="confirmAddressList" onClick={this.showModal('isShow').bind(this)}>
                    <ul>
                        <li>
                            <span>收货人：{defaultAddress.membername}</span>
                            <span>{defaultAddress.tel}</span>
                        </li>
                        <li>收货地址：{defaultAddress.address}</li>
                    </ul>
                </div>
            );
            choiceList = ObjectToArray(userInfo.address).map((item ,index) => (
                <div className="popupList" key={index} onClick={this.choiceList(index).bind(this)}>
                    <div>
                        <span className={item.id === this.state.defaultAddress.id ? 'icon_check' : 'icon_ko'}></span>
                        <p>{item.membername}，{item.tel}</p>
                        <p>{item.address}</p>
                    </div>
                </div>
            ));
            ModalStr = (
                <Modal popup visible={isShow} onClose={this.onClose('isShow')} animationType="slide-up">
                    <h4 className="popupTitle">选择收货地址</h4>
                    {choiceList}
                    <div className="addAddress" onClick={this.showModal('isAdd').bind(this)}>
                        <span className="iconAdd"></span>
                        <a href="javascript:;">新增地址</a>
                    </div>
                </Modal>
            );
        } else {
            list = (
                <div onClick={this.showModal('isAdd').bind(this)}>
                    <span></span>
                    新增收货地址
                </div>
            );
        }
        return (
            <div className="confirmAddress">
                {list}
                {ModalStr}
                <ConfirmNewAddress isAdd={isAdd} onClose={this.onClose.bind(this)} returnNewAddress={this.returnNewAddress.bind(this)} />
            </div>
        )
    };
};

function select(state) {
    return {
        userInfo: state.userInfo,
    };
}

export default connect(select)(withRouter(confirmAddress));