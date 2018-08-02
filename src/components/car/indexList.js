import React, {Component} from 'react';

class cartList extends Component {
    render() {
        const {buyCart, addnum, reducenum, delCart} = this.props;
        return (
            <div className="cartList">
                <div><img src={buyCart.imgs} alt={buyCart.name}/></div>
                <div>
                    <p>{buyCart.name}</p>
                    <p>价格：￥ {buyCart.price}</p>
                    <p>
                        数量：
                        <span className="buyCarNum">
                            <button id="minus" className="minus" type="button"onClick={reducenum(buyCart.id)}></button>
                            <input type="text" name="number" className="txt" pattern="[0-9]*" value={buyCart.num} readOnly/>
                            <button id="plus" className="plus" type="button" onClick={addnum(buyCart.id)}></button>
                        </span>
                        <span>
                            <img src={require('../../assets/img/del.jpg')} alt="" width="16" onClick={delCart(buyCart.id)}/>
                        </span>
                    </p>
                </div>
            </div>
        )
    };
};


export default cartList;