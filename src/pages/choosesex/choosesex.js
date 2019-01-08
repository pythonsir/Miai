import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { AtButton } from "taro-ui";
import Util from '../../util/util'
import { observer, inject } from "@tarojs/mobx";
import Navbar from "../../components/navbar/navbar";
import './choosesex.less'
import Banner from '../../components/banner/banner'
import male from "../../assets/images/male.jpeg"
import female from "../../assets/images/female.jpeg"


@inject("formStore")
@observer
class Choosesex extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    bgimg: "http://qiniu.cdn.colorlib.cn/navbg.jpg",
    male: "",
    female: "",
    height: 0,
    statusBarHeight: 0
  };

  componentWillMount() {
    

    Util.getNavInfo().then(res => {
      this.setState({
        height: res.height,
        statusBarHeight: res.statusBarHeight
      });
    });
    this.setState({ male: male, female: female });
  }

  choosesex(sex) {
    
    const { formStore } = this.props;

    formStore.setGender(sex);

  }

  render() {

    const { formStore: { gender } } = this.props;
    console.log(gender);
    return <View className="container" style={{ paddingTop: this.state.height + "px" }}>
        <Navbar height={this.state.height} statusBarHeight={this.state.statusBarHeight} bgimg={this.state.bgimg} size="28" color="#ffffff" icon="chevron-left" title="完善资料" />
        <Banner title="请选择性别" style="width:100%" />
        <View className="content">
          <View className="content_1">
            <View className="male">
              <View className={ gender == "male" ? "warper choose" : "warper"} onClick={this.choosesex.bind(this, "male")}>
                <Image mode="aspectFit" src={this.state.male} />
                <View className="label">帅哥</View>
              </View>
            </View>
            <View className="female">
            <View className={gender == "female" ? "warper choose" : "warper"} onClick={this.choosesex.bind(this, "female")}>
                <Image mode="aspectFit" src={this.state.female} />
                <View className="label">美女</View>
              </View>
            </View>
          </View>
          <View className="btn">
            <AtButton className="btn_bg" size="normal" circle={true}>
              下一步
            </AtButton>
            <View className="title">已有账号，直接登陆</View>
          </View>
        </View>
      </View>;
  }
}

export default Choosesex;