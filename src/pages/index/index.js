import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtButton } from 'taro-ui'
import api from "../../config/api";
import './index.less'
import bg from '../../assets/images/bg.jpg'

@inject("counterStore")
@observer
class Index extends Component {
  config = {
    navigationBarTitleText: "脱单在太原"
  };

  componentWillMount() {}

  componentWillReact() {
    console.log("componentWillReact");
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  increment = () => {
    const { counterStore } = this.props;
    counterStore.increment();
  };

  decrement = () => {
    const { counterStore } = this.props;
    counterStore.decrement();
  };

  incrementAsync = () => {
    const { counterStore } = this.props;
    counterStore.incrementAsync();
  };

  tobegin = (e) => {

    const {userInfo} = e.detail;
 
    if (e.detail.errMsg == 'getUserInfo:ok'){

      if (!Taro.getStorageSync("userinfo")){

        Taro.request({
          url: api.saveWeixin,
          data: {
            session3rd: Taro.getStorageSync("session3rd"),
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl
          },
          header: {
            "content-type": "application/x-www-form-urlencoded" // 默认值
          },
          method: "POST",
          success: function (res) {
            console.log(res);
            Taro.setStorage({ key: "userinfo", data: userInfo });
          },
          fail: function (err) {
            console.log(err);
          }
        }).then(res=>{

          Taro.navigateTo({
            url: '/pages/choosesex/choosesex'
          })

        })

      }else{

        Taro.navigateTo({
          url:'/pages/choosesex/choosesex'
        })

      }


     

    }

    

  };

  render() {
    const {
      counterStore: { counter }
    } = this.props;
    return <View className="index">
        <Image src={bg} mode="aspectFill" />
        <View className="btn_container">
          <View className="btn_warper" hoverClass="btn_warper_hover">
            <Button className="btn" openType="getUserInfo" onGetUserInfo={this.tobegin}>
              开启缘分
            </Button>
          </View>
        </View>
      </View>;
  }
}

export default Index
