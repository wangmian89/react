import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../assets/css/centerhead.css';

class CenterHead extends Component {
  render() {
    const { userInfo } = this.props;
    return(
      <div className="centerhead">
        <div className="centerhead-tool">我的</div>
        <div className="centerhead-head">
          <div className="centerhead-head-arrow">
            <div className="centerhead-head-media">
              <img src={userInfo ? userInfo.wx_headimgurl : require('../../assets/img/t1.jpg')} width="55" height="55" alt="" />
            </div>
            <div className="centerhead-head-props">{userInfo ? userInfo.wx_nickname : "立即登录"}</div>
          </div>
        </div>
      </div>
    );
  };
};

function select(state) {
  return {
    userInfo: state.userInfo
  };
}

export default connect(select)(CenterHead);
