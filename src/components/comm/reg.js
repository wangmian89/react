import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {Toast} from 'antd-mobile';
import {OrderListData, reg} from '../../util/data';
import '../../assets/css/reg.css';

class Reg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openid: null,        // 微信OPENID
            nickname: null,      // 微信昵称
            headimgurl: null,    // 微信头像
            province: null,      // 微信所在省份
            city: null,          // 微信所在城市
            sex: 0,             // 性别
        }
    }

    componentWillReceiveProps(nextProps) {
        if( nextProps.wxInfo ) {
            this.setState({
                openid: nextProps.wxInfo.openid,               // 微信OPENID
                nickname: nextProps.wxInfo.nickname,           // 微信昵称
                headimgurl: nextProps.wxInfo.headimgurl,       // 微信头像
                sex: nextProps.wxInfo.sex,                     // 性别
            });
        }
    };

    componentDidMount() {
        const {wxInfo} = this.props;
        if( wxInfo ) {
            this.setState({
                openid: wxInfo.openid,               // 微信OPENID
                nickname: wxInfo.nickname,           // 微信昵称
                headimgurl: wxInfo.headimgurl,       // 微信头像
                sex: wxInfo.sex,                     // 性别
            });
        }

    }

    handleSubmit() {
        const {openid, nickname, headimgurl, sex} = this.state;
        if( !openid || !nickname || !headimgurl ){
            Toast.fail("参数错误aaaaa", 2);
            return false;
        }
        reg('login', 'regmember', openid, nickname, headimgurl, sex, this.returnData.bind(this));
    }

    returnData(data) {
        let success = data.success;     // 查询状态
        let msg = data.msg;             // 提示消息
        if( Number(success) > 0 ) {
            this.props.history.push("/home");
        }else{
            Toast.fail(msg, 2);
        }
    }

    render() {
        return (
            <div className="reg">
                <div className="regHead">
                    <img src={this.state.headimgurl} alt="注册会员" />
                    <p>立即成为四野农业会员，随时订购最新产品</p>
                    <p>▪将以您的微信作为登陆账号</p>
                    <div onClick={this.handleSubmit.bind(this)}>注册会员</div>
                </div>
            </div>
        )
    };
}

function select(state) {
    return {
        wxInfo: state.userOpenid
    };
}

export default withRouter(connect(select)(Reg));