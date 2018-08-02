import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Toast} from 'antd-mobile';
import {NewAddressData} from '../../util/data';


class confirmNewAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: this.props.isAdd,       // 隐藏层是否可见
            recMan: '',                     // 收货人
            recPhone: '',                   // 联系电话
            recAddress: '',                 // 收货地址
            userInfo: null,                 // 会员详情
            isRepeat: false,                // 禁止重复提交
        };
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            isShow: nextProps.isAdd,
            userInfo: nextProps.userInfo,
        });
    };

    onClose = key => () => {
        this.setState({
            [key]: false
        });
    };

    handleRecMan(event) {
        event.preventDefault();
        this.setState({
            recMan: event.target.value
        });
    };

    handleRecPhone(event) {
        event.preventDefault();
        this.setState({
            recPhone: event.target.value
        });
    };

    handleAddress(event) {
        event.preventDefault();
        this.setState({
            recAddress: event.target.value
        });
    };

    // 保存订单
    handleSubmit(event) {
        event.preventDefault();
        const {recMan, recPhone, recAddress, userInfo, isRepeat} = this.state;
        if (!userInfo) {
            Toast.fail('请先登陆会员', 2);
            return false;
        } else if ( !recMan ) {
            Toast.fail('请填写收货人', 2);
            return false;
        } else if (!recPhone) {
            Toast.fail('请填写联系嗲话', 2);
            return false;
        } else if (!recAddress) {
            Toast.fail('请填写收货地址', 2);
            return false;
        }else if ( isRepeat ){
            return false;
        }
        this.setState({ isRepeat: true });
        NewAddressData(                 // 保存新收货地址
            "center",                   // 控制器
            "newAddress",               // 控制器类
            recMan,                     // 收货人
            recPhone,                   // 联系电话
            recAddress,                 // 收货地址
            userInfo.wx_openid,         // 会员微信OPENID
            this.returnData.bind(this)  // 回调函数
            );
    };

    // 回调函数
    returnData(data) {
        const {recMan, recPhone, recAddress} = this.state;
        const {returnNewAddress} = this.props;
        let success = data.success;     // 状态
        let msg = data.msg;             // 提示文字
        if( parseInt(success) === 1 ){
            let mid = data.mid;
            returnNewAddress(mid, recMan, recPhone, recAddress);  // 回调函数
        }
        Toast.success(msg, 2);  // 弹出提示文字
    }

    render() {
        const {isShow, recMan, recPhone, recAddress} = this.state;
        const{onClose} = this.props;
        return (
            <Modal popup visible={isShow} onClose={onClose('isAdd')} animationType="slide-up">
                <h4 className="popupTitle">新增收货地址</h4>
                <div className="popupForm">
                    <label>收货人</label>
                    <input type="text" name="recMan" placeholder="名字" value={recMan} onChange={this.handleRecMan.bind(this)} />
                </div>
                <div className="popupForm no-top-border">
                    <label>联系电话</label>
                    <input type="text" name="recPhone" placeholder="手机或固定电话" value={recPhone} onChange={this.handleRecPhone.bind(this)} />
                </div>
                <div className="popupForm no-top-border">
                    <label>详细地址</label>
                    <input type="text" name="recAddress" placeholder="如街道，楼层，门牌号等" value={recAddress} onChange={this.handleAddress.bind(this)} />
                </div>
                <div className="popupBottom" onClick={this.handleSubmit.bind(this)}>保存</div>
            </Modal>
        )
    };
};


function select(state) {
    return {
        userInfo: state.userInfo,
    };
}

export default connect(select)(confirmNewAddress);

