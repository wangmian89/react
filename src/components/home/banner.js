import React, {Component} from 'react';
import {Carousel} from 'antd-mobile';
import {homeBanner, ObjectToArray} from '../../util/data';

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,         // 广告数据列表
            imgHeight: 0        // 广告图片高度
        }
    };

    componentDidMount() {
        homeBanner("home", "banner", 10000, this.returnData.bind(this));
    }

    // 广告数据回调函数
    returnData(data) {
        if ( Number(data.length) > 0 ) {    // 如果广告不为空
            this.setState({                 // 更新state状态
                data: data                  // 更新广告数据
            });
        }
    }

    render() {
        let bannerList = null;
        const { data } = this.state;
        if ( data ) {
            let arr = ObjectToArray(data);              //将对象转换为数组
            bannerList = arr.map((item, index) => (
                <a key={index} href={item.link}
                   style={{display: 'inline-block', width: '100%', height: this.state.imgHeight}}>
                    <img src={item.path} alt={item.title} style={{width: '100%', verticalAlign: 'top'}}
                         onLoad={() => {
                             window.dispatchEvent(new Event('resize'));
                             this.setState({imgHeight: 'auto'});
                         }}
                    />
                </a>
            ));
            bannerList = <Carousel autoplay={false} infinite selectedIndex={1}>{bannerList}</Carousel>
        }
        return (
            <div>{bannerList}</div>
        )
    };
};

export default Banner;