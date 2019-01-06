import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import Util from '../../util/util'

import Navbar from "../../components/navbar/navbar";
import './choosesex.less'
import Banner from '../../components/banner/banner'
import male from "../../assets/images/male.png"
import female from "../../assets/images/female.png"

class Choosesex extends Component {

  constructor(props){
    super(props)
    this.state = { bgimg: "http://qiniu.cdn.colorlib.cn/navbg.jpg", male: "", female: "", height: 0, statusBarHeight:0 };

  }

  componentWillMount(){

    Util.getNavInfo().then(res => {
      this.setState({ height: res.height, statusBarHeight:res.statusBarHeight});
    })

    this.setState({ male: male,female:female});
  }
  render() {
    return <View className="container" style={{paddingTop:this.state.height + 'px'}}>

      <Navbar height={this.state.height} statusBarHeight={this.state.statusBarHeight} bgimg={this.state.bgimg} size="28" color="#ffffff" icon="chevron-left" title="完善资料" />
          <Banner title="请选择性别" />
          <View className='content'>
            <View className='content_1'>
              <View className='male'>
                <Image  src={this.state.male} />
                <View>帅哥</View>
              </View>
              <View className='female'>
                  <Image src={this.state.female} />
                  <View>美女</View>
              </View>
            </View>

          </View>
      </View>
  }
}

export default Choosesex;