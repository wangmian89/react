import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {homeData, smallMenuData, ObjectToArray} from '../../util/data';

class About extends Component {
    constructor() {
        super();
        this.state = {
            data: null,     // 数据列表
            menu: null,     // 菜单列表
        };
    };

    componentDidMount() {
        homeData("home", "article", 9, 1, 100, this.returnData.bind(this));
        smallMenuData("home", "smallMenu", 1, 4, this.returnMenu.bind(this));
    };

    // 文章回调函数
    returnData(data) {
       if( Number(data.length) > 0 ){   // 如果数据不为空
           this.setState({              // 更新state状态
               data: data               // 更新数据
           });
       }
    };

    // 菜单回调函数
    returnMenu(data) {
       if( Number(data.length) > 0 ){   // 如果数据不为空
           this.setState({              // 更新state状态
               menu: data               // 更新数据
           });
       }
    };

    render() {
        const { data, menu } = this.state;
        let info = null, menuStr = null;
        if( data ) {
            let arr = ObjectToArray(data);  // 将对象转换为数组
            info = arr.map((item, index) => (
                <div className="homeAboutInfo" key={index}>
                    <NavLink to={{ pathname: '/conent/'+item.id, state:{id: item.id, name: "conent"} }}>
                        <img src={item.pic2} alt={item.title} />
                        <p>{item.shortdesc}...</p>
                    </NavLink>
                </div>
            ));
        }
        if( menu ) {
            let arr = ObjectToArray(menu);  // 将对象转换为数组
            menuStr = arr.map((item, index) => (
                <div key={index}>
                    <NavLink to={{ pathname: '/list/'+item.id, state:{id: item.id, name: "conent"} }}>
                        <img src={item.cat_ico2} alt={item.cat_name} />
                        <p>{item.cat_name}</p>
                    </NavLink>
                </div>
            ));
        }
        return(
            <div className="homeAbout">
                <div className="homeAboutTitle">
                    <p>GONGSIJIANJIE</p>
                    <p>公司简介</p>
                </div>
                {info}
                <div className="homeAboutMenu">{menuStr}</div>
            </div>
        )
    };
}

export default About;
