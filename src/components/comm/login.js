import React, {Component} from 'react';
import {withCookies} from 'react-cookie';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {changeUserInfo} from '../../store/actions';
import {login} from '../../util/data';


class Login extends Component {

    componentWillReceiveProps(nextProps) {
       if( nextProps.wxInfo && !nextProps.userInfo ){
           login('login', 'loginmember', nextProps.wxInfo.openid, this.returnData.bind(this));
       }
    }

    componentDidMount() {
        const {userInfo, wxInfo, cookies} = this.props;
        let cook = cookies.get('openid');
        if (!userInfo && (wxInfo || cook)) {
            let openid = wxInfo ? wxInfo.openid : cook;
            if (openid) { // 正式使用需取消注释
                login('login', 'loginmember', openid, this.returnData.bind(this));
            } else {
                this.props.history.push("/prompt");
            }
        }
    }

    //回调函数
    returnData(data) {
        let success = data.success;
        if (Number(success) === 1) {
            const {dispatch, cookies} = this.props;
            let member = data.list;
            dispatch(changeUserInfo(member));
            if( !cookies.get('openid') ){ cookies.set('openid', member.wx_openid); }
        } else {
            this.props.history.push("/reg");
        }
    };

    render() {
        return (
            <div></div>
        )
    }
};

function select(state) {
    return {
        userInfo: state.userInfo,
        wxInfo: state.userOpenid
    };
}

export default withRouter(connect(select)(withCookies(Login)));