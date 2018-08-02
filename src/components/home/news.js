import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {homeData, ObjectToArray} from '../../util/data';

class News extends Component {
    constructor() {
        super();
        this.state = {
            data: null,     // 数据列表
        };
    };

    componentDidMount() {
        homeData("home", "article", 2, 5, 0, this.returnData.bind(this));
    };

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
        if( data ) {
            let arr = ObjectToArray(data);  // 将对象转换为数组
            list = arr.map((item, index) => (
                <div key={index}>
                    <NavLink to={{ pathname: '/conent/'+item.id, state:{id: item.id, name: "conent"} }}>
                        {item.title}
                    </NavLink>
                </div>
            ));
        }
        return(
            <div className="homeNews">
                <div className="homeNewsTitle">
                    <p>XINWENZHONGXIN</p>
                    <p>新闻中心</p>
                </div>
                <div className="homeNewsList">{list}</div>
            </div>
        )
    };
};

export default News
