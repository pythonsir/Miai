import Taro, { Component } from "@tarojs/taro"
import Util from "../../util/util";
import api from "../../config/api";
import { observer, inject } from "@tarojs/mobx";
import Navbar from "../../components/navbar/navbar"
import Banner from "../../components/banner/banner"
import { View, PickerView, PickerViewColumn } from "@tarojs/components"
import Area from '../../components/area/area'
import { AtButton } from "taro-ui";
import './workspace.less'

@inject("formStore")
@observer
class Workspace extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    height: 0,
    statusBarHeight: 0,
    province:'',
    city:'',
    county:''
  };

  componentWillMount() {
  

    Util.getNavInfo().then(res => {
      this.setState({
        height: res.height,
        statusBarHeight: res.statusBarHeight
      });
    });

  }
  componentDidMount() {

  
  }

  componentDidShow() {}

  handleSelect(newstate){ // 获取子组件传回来的state

    this.setState(newstate)

  }

  gotoNext(){

    const {province,city,county} = this.state

    const { formStore } = this.props;

    if (province == '' || city == '' || county == ''){
      Taro.showToast({
        title:'请选择工作区域',
        icon:'none'
      })
      return;
    }

    formStore.setPCO(province,city,county)

  }


  render() {

      

    return <View className="container" style={{ paddingTop: this.state.height + "px" }}>
        <Navbar height={this.state.height} statusBarHeight={this.state.statusBarHeight} size="28" color="#ffffff" icon="chevron-left" title="完善资料" />
        <Banner title="您的工作地区在哪里？" style="width:100%" />
        <Area onChange={this.handleSelect} />
        <View className="btn">
          <AtButton
            onClick={this.gotoNext}
            className="btn_bg"
            size="normal"
            circle={true}
          >
            下一步
              </AtButton>
          <View className="title">已有账号，直接登陆</View>
        </View>
      </View>;
  }
}
export default Workspace