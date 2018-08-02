import React, {Component} from 'react';
import {connect} from 'react-redux';
import {initCart, changeAddCar, changeReduceCar, changeDelCar} from '../../store/actions';
import {ObjectToArray, getStore} from '../../util/data';
import {Toast} from 'antd-mobile';
import List from './indexList';
import '../../assets/css/car.css';


class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buyCart: null,          // 购物车列表
            allMoney: 0,            // 购物车总金额
        };
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(initCart());
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.buyCart) {
            let allPrice = 0;
            let arr = ObjectToArray(nextProps.buyCart);   // 将对象转换为数组
            arr.forEach((item, index) => {
                allPrice += item.num * item.price;
            });
            this.setState({
                buyCart: nextProps.buyCart,     // 购物车列表
                allMoney: allPrice,             // 购物车总金额
            });
        }
    };

    /* 增加购物车数量 begin */
    addnum = c => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        const {buyCart} = this.state;
        let allPrice = 0;
        let key = 'a' + c;
        let pro = buyCart[key];
        const {dispatch} = this.props;
        dispatch(changeAddCar(pro.id, 1, pro.name, pro.price, pro.imgs));
        let cart = getStore('buyCart');
        cart = JSON.parse(cart);
        let arr = ObjectToArray(cart);   // 将对象转换为数组
        arr.map((item, index) => (
            allPrice += item.num * item.price
        ));
        this.setState({
            buyCart: cart,
            allMoney: allPrice
        });
    };
    /* 增加购物车数量 end */

    /* 减少购物车数量 begin */
    reducenum = c => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        const {dispatch} = this.props;
        const {buyCart} = this.state;
        let allPrice = 0;
        let key = 'a' + c;
        let pro = buyCart[key];
        dispatch(changeReduceCar(pro.id, 1));
        let cart = getStore('buyCart');
        cart = JSON.parse(cart);
        let arr = ObjectToArray(cart);   // 将对象转换为数组
        arr.map((item, index) => (
            allPrice += item.num * item.price
        ));
        this.setState({
            buyCart: cart,
            allMoney: allPrice
        });
    };
    /* 减少购物车数量 end */

    /* 删除购物车当前元素 begin */
    delCart = c => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        const {dispatch} = this.props;
        const {buyCart} = this.state;
        let allprice = 0;
        let key = 'a' + c;
        let pro = buyCart[key];
        dispatch(changeDelCar(pro.id));
        let cart = getStore('buyCart');
        cart = JSON.parse(cart);
        let arr = ObjectToArray(cart);   // 将对象转换为数组
        arr.forEach((item, index) => {
            allprice += item.num * item.price;
        });
        this.setState({
            buyCart: cart,
            allMoney: allprice
        });
    };
    /* 删除购物车当前元素 end */

    /* 跳转结算页面 begin */
    jumPage = (e) => {
        const {buyCart, allMoney} = this.state;
        if( !buyCart || parseFloat(allMoney) <= 0 ) {
            Toast.fail("购物车为空", 2);
            return false;
        }
        this.props.history.push("/confirm");
    };
    /* 跳转结算页面 end */


    render() {
        const {buyCart, allMoney} = this.state;
        let list = null;
        if (buyCart) {
            list = ObjectToArray(buyCart).map((item, index) => (
                <List
                    buyCart={item}
                    key={index}
                    addnum={this.addnum.bind(this)}
                    reducenum={this.reducenum.bind(this)}
                    delCart={this.delCart.bind(this)}
                />
            ));
        }
        return (
            <div className="cart">
                <div className="cartTit">商品列表</div>
                {list}
                <div className="carMoney">总价：￥ {allMoney}</div>
                <div className="carBottom" onClick={this.jumPage.bind(this)}>结算</div>
            </div>
        )
    };
};

function select(state) {
    return {
        buyCart: state.initCart
    };
}

export default connect(select)(Cart);
