import React, { Component } from 'react';
import {conentData} from '../../util/data';
import Footer from '../comm/footer';
import '../../assets/css/content.css';


class Conent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,           // 文章ID
            data: null,                               // 文章数据详情
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

    render() {
        const { data } = this.state;
        let info = null;
        if( data && data !== '0' ) {
            info = (
                <div>
                    <div className="conentTitle">{data.title}</div>
                    <div className="conentTime">发布时间：{data.addtime}</div>
                    <div className="conentInfo" dangerouslySetInnerHTML={{__html: data.content}}></div>
                </div>
            );
        }
        return(
            <div className="conent">
                {info}
                <Footer />
            </div>
        )
    };
};

export default Conent;