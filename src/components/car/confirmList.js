import React, {Component} from 'react';
import {ObjectToArray} from '../../util/data';
import '../../assets/css/confirm.css';

class ConfirmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyCart: this.props.buyCart,        // 购物车列表
            allMoney: this.props.allMoney,      // 商品总价
        };
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            buyCart: nextProps.buyCart,         // 购物车列表
            allMoney: nextProps.allMoney,       // 商品总价
        });
    };

    render() {
        const {buyCart, allMoney} = this.state;
        let list = null;
        if( buyCart ) {
            list = ObjectToArray(buyCart).map((item, index) => (
                <div className="confirmListPr" key={index}>
                    <img src={item.imgs} alt={item.name}/>
                    <div>
                        <p>{item.name}</p>
                        <p>价格：￥ {item.price}</p>
                        <p>数量：{item.num}</p>
                    </div>
                </div>
            ));
        }
        return (
            <div className="confirmList">
                <div className="confirmListTit">商品列表</div>
                {list}
                <div className="confirmListPrice">
                    合计
                    <span>￥ {allMoney}</span>
                </div>
            </div>
        )
    };
};


export default ConfirmList;