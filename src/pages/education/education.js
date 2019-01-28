import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import Util from "../../util/util"
import api from "../../config/api"
import { observer, inject } from "@tarojs/mobx";
import Navbar from "../../components/navbar/navbar"
import Banner from "../../components/banner/banner"
import './education.less'

@inject("formStore")
@observer
class education extends Component {

    state = {
        height: 0,
        statusBarHeight: 0,
        data:[
            {
            name:'高中及以下',
            value:1
            }, 
            {
                name: '中专',
                value: 2
            },
            {
                name: '大专',
                value: 4
            },
            {
                name: '大学本科',
                value: 5
            },
            {
                name: '硕士',
                value: 6
            },
            {
                name: '博士',
                value: 7
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

    setEducation(e){

        const { formStore} = this.props

        formStore.setEducation(e)



        setTimeout(() => {
            Taro.navigateTo({
                url:'/pages/marriage/marriage'
            })
        }, 300);

    }


    render(){


        const { formStore: { education} } = this.props

        return (
            <View className="container" style={{ paddingTop: this.state.height + "px" }}>
                <Navbar height={this.state.height} statusBarHeight={this.state.statusBarHeight} size="28" color="#ffffff" icon="chevron-left" title="完善资料" />
                <Banner title="您的学历是?" style="width:100%" />
                <View className="content">
                    {
                        this.state.data.map( n => {
                            return <View className={education == n.value ? "item choose" : "item"} onClick={this.setEducation.bind(this,n.value)} key={n.value}>{n.name}</View>
                        })
                    }
                </View>

            </View>
        )
    }

}