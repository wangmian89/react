import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {homeData, ObjectToArray} from '../../util/data';

class Product extends Component {
    constructor() {
        super();
        this.state = {
            data: null,         // 产品列表数据
        };
    };

    componentDidMount() {
        homeData("home", "article", 6, 6, 0, this.returnData.bind(this));
    }

    // 回调函数
    returnData(data) {
       if( Number(data.length) > 0 ){   // 如果数据不为空
           this.setState({              // 更新state状态
               data: data               // 更新数据
           });
       }
    };

    render() {
        const { data } = this.state;
        let list = null;
        if( data ){
            let arr = ObjectToArray(data);  // 将对象转换为数组
            list = arr.map((item, index) => (
                <div key={index}>
                    <NavLink to={{ pathname: '/pcon/'+item.id, state:{id: item.id, name: "pcon"} }}>
                        <img src={item.pic2} alt={item.title} />
                        <p>{item.title}</p>
                    </NavLink>
                </div>
            ));
        }
        return(
            <div className="homeProduct">
                <div className="homeProductTitle">
                    <p>LVSEGUOSHU</p>
                    <p>绿色果蔬</p>
                </div>
                <div className="homeProductList">{list}</div>
            </div>
        )
    };
}

export default Product;
