import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {PullToRefresh, Toast} from 'antd-mobile';
import {listData, ObjectToArray} from '../../util/data';
import Footer from '../comm/footer';
import '../../assets/css/list.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,                     // 栏目ID
            data: {},                                           // 文章数据
            refreshing: false,                                  // 加载更多数据是否显示刷新状态
            isLoading: true,                                    // 是否允许加载更多数据
            down: false,                                        // 上拉加载更多，下拉刷新数据
            height: document.documentElement.clientHeight       // 获取窗口高度
        };
    };

    componentDidMount() {
        listData("art", "listStr", this.state.id, 0, this.returnData.bind(this));
    };

    componentWillReceiveProps(nextProps) {
        const {id} = this.state;
        if (!id) {
            this.setState({
                id: nextProps.match.params.id   // 文章ID
            });
            listData("art", "listStr", nextProps.match.params.id, 0, this.returnData.bind(this));
        }
    };

    // 回调函数
    returnData(dataArr) {
        if (dataArr !== '0') {   // 如果数据不为空
            const {data} = this.state;
            let oldarr = ObjectToArray(data);   // 原始数据
            let newarr = dataArr;               // 返回的最新数据
            if ( newarr !== '0' ){       // 如果查询成功
                for (let i = 0; i < newarr.length; i++) {
                    oldarr.push(newarr[i]);     // 将返回的最新数据加入原始数据中
                }
                this.setState({                 // 更新state状态
                    data: oldarr                // 返回数据
                });
            }else{                              // 查询状态失败
                Toast.fail('没有文章了', 2);    // 弹出提示层
            }
        }
    };

    // 读取加载更多数据 begin
    onRefresh = () => {
        const {data, id} = this.state;
        let len = data.length;                      // 线路总条数
        let lasttime = data[len - 1].addtime;       // 最后一条文章添加时间
        this.setState({
            refreshing: true                        // 加载更多数据显示刷新状态
        });
        setTimeout(() => {
            listData(
                'art',                              // 控制器
                'listStr',                          // 类名
                id,                                 // 栏目ID
                lasttime,                           // 最后一条文章时间
                this.returnData.bind(this)          // 回调函数
            );
        }, 600);

    };

    render() {
        const {data} = this.state;
        let info = null;
        if (data) {
            let arr = ObjectToArray(data);  // 将对象转换为数组
            info = arr.map((item, index) => (
                <div className="listDiv" key={index}>
                    <NavLink to={{pathname: "/pcon/" + item.id, state: {id: item.id, name: "pcon"}}}>
                        <div><img src={item.pic2} alt={item.title}/></div>
                        <div>
                            <p>{item.title}</p>
                            <p>{item.shortdesc}...</p>
                        </div>
                    </NavLink>
                </div>
            ));
        }
        return (
            <div className="list">
                <PullToRefresh
                    style={{height: this.state.height, overflow: 'auto'}}
                    indicator={this.state.down ? {} : {deactivate: '上拉可以刷新'}}
                    direction={this.state.down ? 'down' : 'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh.bind(this)}
                >
                    {info}
                </PullToRefresh>
                <Footer/>
            </div>
        )
    };
};


export default List;
