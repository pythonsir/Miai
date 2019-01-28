import Taro, { Component } from "@tarojs/taro";
import Util from "../../util/util";
import api from "../../config/api";
import { observer, inject } from "@tarojs/mobx";
import Navbar from "../../components/navbar/navbar";
import Banner from "../../components/banner/banner";
import './marriage.less'

@inject("formStore")
@observer
class Marriage extends Component{

    state = {
        height: 0,
        statusBarHeight: 0,
        data: [
            {
                name: '未婚',
                value: 1
            },
            {
                name: '离异',
                value: 2
            },
            {
                name: '丧偶',
                value: 3
            }
        ],

    };

    componentWillMount() {

       

        Util.getNavInfo().then(res => {
            this.setState({
                height: res.height,
                statusBarHeight: res.statusBarHeight
            });
        });

    }

    setMarriage(h){

        const { formStore } = this.props

        formStore.setMarriage(h)

        setTimeout(() => {
            Taro.navigateTo({
                url:'/pages/income/income'
            })
        }, 300);

    }


    render(){

        const { formStore: { marriage } } = this.props

    
        return <View
            className="container"
            style={{
                paddingTop: this.state.height + "px"
            }}>
            <Navbar
                height={this.state.height}
                statusBarHeight={this.state.statusBarHeight}
                size="28"
                color="#ffffff"
                icon="chevron-left"
                title="完善资料" />
            <Banner title="您的婚姻状况？" style="width:100%" />
            <View  className="content">
                {
                    this.state.data.map(n => {
                        return <View className={marriage == n.value ? "item choose" : "item"} onClick={this.setMarriage.bind(this, n.value)} key={n.value}>{n.name}</View>
                    })
                }

            </View>
        </View>
    }
}

export default Marriage