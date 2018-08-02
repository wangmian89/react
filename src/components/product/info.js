import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { changeAddCar } from '../../store/actions';
import {Modal, Toast} from 'antd-mobile';
import '../../assets/css/product.css';

class Info extends Component {
    constructor() {
        super();
        this.state = {
            isShow: false,              // 是否显示隐藏层
            showTxt: '加入购物车',        // 隐藏层按钮提示文字
            num: 1,                     // 购买数量
        };
    };

    // 显示隐藏层
    showModal = (key, n) => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
            showTxt: n,
        });
    };

    // 关闭隐藏层
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    };

    // 点击增加购买数量 begin
    addnum = (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        const {num} = this.state;
        this.setState({
            num: num + 1
        });
    }

    // 点击减少购买数量 begin
    reduce = (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        const {num} = this.state;
        if (num <= 1) {
            return false;
        }
        this.setState({
            num: num - 1
        });
    };

    // 加入购物车 begin
    addcar = (e) => {
        const {dispatch, msg} = this.props;
        dispatch(changeAddCar(msg.id, this.state.num, msg.title, msg.price, msg.pic2));
        if (this.state.showTxt === '下一步') {
            this.props.history.push("/car");
        } else {
            Toast.success('购物车加入成功!', 2);
            this.setState({
                isShow: false,      // 关闭隐藏层
            });
            return false;
        }
    };

    handleChange(event) {
        this.setState({
            num: event.target.value
        });
    };

    render() {
        const {msg} = this.props;
        let divModal = null;
        if (msg) {
            divModal = (
                <Modal popup visible={this.state.isShow} onClose={this.onClose('isShow')} animationType="slide-up">
                    <div className="basket-title">
                        <div><img src={msg.pic2} alt={msg.title}/></div>
                        <div>
                            <p>{msg.title}</p>
                            <p>￥ {msg.price}</p>
                        </div>
                    </div>
                    <div className="basket-num">
                        <span>购买数量：</span>
                        <span>
                            <button id="minus" className="minus disabled" type="button"
                                    onClick={this.reduce.bind(this)}></button>
                            <input type="text" ref="number" className="txt" pattern="[0-9]*" value={this.state.num}
                                   onChange={this.handleChange.bind(this)}/>
                            <button id="plus" className="plus" type="button" onClick={this.addnum.bind(this)}></button>
                        </span>
                    </div>
                    <div className="basket-buy" onClick={this.addcar}>{this.state.showTxt}</div>
                </Modal>
            );
        }
        return (
            <div className="info">
                <div className="goodsHeader">
                    <h2>{msg.title}</h2>
                    <div><span>会员价：￥<i>{msg.price}</i></span></div>
                </div>
                <div className="goodsInfo">
                    <div>
                        <div></div>
                        <div>
                            泸州四野农业有限公司
                            <img src={require('../../assets/img/icon_guan.png')} alt=""/>
                        </div>
                    </div>
                    <div>
                        <span>官方店认证</span>
                        <span>担保交易</span>
                    </div>
                </div>
                <div className="goodsContent" dangerouslySetInnerHTML={{__html: msg.content}}></div>
                <div className="goodsBottom">
                    <div>
                        <NavLink to="/car">
                            <i></i>
                            <span>购物车</span>
                        </NavLink>
                    </div>
                    <div onClick={this.showModal('isShow', '加入购物车').bind(this)}>加入购物车</div>
                    <div onClick={this.showModal('isShow', '下一步').bind(this)}>立即购买</div>
                </div>
                {divModal}
            </div>
        )
    };
}

function select(state) {
  return {
    userInfo: state.userInfo,
    buyCart: state.addcar
  };
}

export default connect(select)(withRouter(Info));