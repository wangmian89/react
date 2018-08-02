import React, {Component} from 'react';
import '../../assets/css/prompt.css';

class Prompt extends Component {
    render() {
        return (
            <div className="prompt">
                <div className="followbg">
                    <div className="follow_main">
                        <h3 className="follow_title">你需要关注后才能注册</h3>
                        <div className="wxid"><img src={require('../../assets/img/qrcode.jpg')} alt=""/></div>
                        <p className="follow_text">长按图片【识别二维码】关注公众号</p>
                        <p className="follow_text_title">无法识别二维码</p>
                        <p className="follow_text_step">1.打开微信，点击‘公众号’</p>
                        <p className="follow_text_step">2.搜索微信号：lz3388589</p>
                        <p className="follow_text_step">3.点击‘关注’，完成</p>
                    </div>
                </div>
            </div>
        )
    }
};

export default Prompt;