import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/css/footer.css';

class Footer extends Component {
    render() {
        return(
            <div className="footer">
                <NavLink to="/home">
                    <img src={require("../../assets/img/gh1.png")} alt="首页"/>
                    <p>首页</p>
                </NavLink>
                <NavLink to="/centet">
                    <img src={require("../../assets/img/gh2.png")} alt="会员中心"/>
                    <p>会员中心</p>
                </NavLink>
                <NavLink to={{pathname: "/plist/" + 8, state: {id: 8, name: "plist"}}}>
                    <img src={require("../../assets/img/gh4.png")} alt="新闻中心"/>
                    <p>四野产品</p>
                </NavLink>
                <NavLink to={{pathname: "/list/" + 2, state: {id: 2, name: "list"}}}>
                    <img src={require("../../assets/img/gh3.png")} alt="新闻中心"/>
                    <p>新闻中心</p>
                </NavLink>
                <NavLink to={{pathname: "/contact/" + 14, state: {id: 14, name: "contact"}}}>
                    <img src={require("../../assets/img/gh5.png")} alt="联系我们"/>
                    <p>联系我们</p>
                </NavLink>
            </div>
        );
    };
};


export default Footer;