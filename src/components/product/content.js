import React, { Component } from 'react';
import { conentData } from '../../util/data';
import Slider from './slider';
import Info from './info';

class ProductInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,             // 产品ID
            data: {},                                   // 数据详情
        };
    };

    componentDidMount() {
        conentData("art", "conent", this.state.id, this.returnData.bind(this));
    };

    componentWillReceiveProps(nextProps) {
        const {id} = this.state;
        if (!id) {
            this.setState({
                id: nextProps.match.params.id   // 文章ID
            });
            conentData("art", "conent", nextProps.match.params.id, this.returnData.bind(this));
        }
    };

    // 回调函数
    returnData(data) {
       if( data !== '0' ){   // 如果数据不为空
           this.setState({   // 更新state状态
               data: data    // 更新数据
           });
       }
    };

    render(){
        const { data } = this.state;
        return(
            <div className="productInfo">
                <Slider msg={data.pic2} />
                <Info msg={data} />
            </div>
        )
    };
};

export default ProductInfo;
