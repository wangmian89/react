import React, {Component} from 'react';
import { connect } from 'react-redux';
import {changeOpenid} from '../../store/actions';
import {getQueryVariable, WeixinInfoData} from '../../util/data';
import Banner from './banner';
import Product from './product';
import Fruit from './fruit';
import About from './about';
import News from './news';
import Footer from '../comm/footer';
import Login from '../comm/login';
import '../../assets/css/home.css';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: null    // 微信CODE
        };
    };

    componentWillMount() {
        getQueryVariable('code', this.returnData.bind(this));   // 获取CODE参数
    };

    componentDidMount() {
        const {code} = this.state;
        if( code ){
            WeixinInfoData( "weixin", "weixinInfo", code, this.returnOpenid.bind(this));
        }
    };

    // 用户OPENID回调函数
    returnOpenid(data) {
        const {dispatch} = this.props;
        dispatch(changeOpenid(data));
    };

    // 回调函数
    returnData(data){
        this.setState({
            code: data,     // 微信CODE
        });
    };

    render() {
        return (
            <div className="home">
                <div className="homeTool"><img src={require("../../assets/img/logo.png")} alt="泸州四野农业有限公司"/></div>
                <Banner/>
                <Product/>
                <Fruit/>
                <About/>
                <News/>
                <Footer/>
            </div>
        )
    };
};

function select(state) {
    return {
        userInfo: state.userInfo,
        wxInfo: state.userOpenid
    };
}

export default connect(select)(Index);
