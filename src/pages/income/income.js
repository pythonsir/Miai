import Taro, { Component } from "@tarojs/taro";
import Util from "../../util/util";
import api from "../../config/api";
import { observer, inject } from "@tarojs/mobx";
import Navbar from "../../components/navbar/navbar";
import Banner from "../../components/banner/banner";
import './income.less'


@inject("formStore")
@observer
class Income extends Component{

    state = {
        height: 0,
        statusBarHeight: 0,
        data: [
            {
                name: '3000以下',
                value: 1
            },
            {
                name: '3001-5000元',
                value: 2
            },
            {
                name: '50001-8000元',
                value: 3
            },
            {
                name: '8001-12000元',
                value: 4
            },
            {
                name: '12001-20000元',
                value: 5
            },
            {
                name: '20001-50000元',
                value: 6
            },
            {
                name: '50000元以上',
                value: 7
            }
        ],

    }

    componentWillMount() {



        Util.getNavInfo().then(res => {
            this.setState({
                height: res.height,
                statusBarHeight: res.statusBarHeight
            });
        });

    }

    setIncome(h) {

        const { formStore } = this.props

        formStore.setIncome(h)

        setTimeout(() => {
            Taro.navigateTo({
                url:'/pages/account/create_account'
            })
        }, 300);

    }

    render() {

        const { formStore: { income } } = this.props


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
            <Banner title="您的月收入？" style="width:100%" />
            <View className="content">
                {
                    this.state.data.map(n => {
                        return <View className={income == n.value ? "item choose" : "item"} onClick={this.setIncome.bind(this, n.value)} key={n.value}>{n.name}</View>
                    })
                }

            </View>
        </View>
    }

}

export default Income