import Taro, { Component } from "@tarojs/taro"
import Util from "../../util/util";
import api from "../../config/api";
import { observer, inject } from "@tarojs/mobx";
import Navbar from "../../components/navbar/navbar"
import Banner from "../../components/banner/banner"
import { View, PickerView, PickerViewColumn } from "@tarojs/components"
import './workspace.less'
import { object } from "../../../../../../../Library/Caches/typescript/3.2/node_modules/@types/prop-types";

@inject("formStore")
@observer
class Workspace extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    height: 0,
    statusBarHeight: 0,
    display: true,
    area: [],
    province_:[],
    city_:[],
    county_:[]
  };

  componentWillMount() {
    Taro.showLoading({
      title: "数据加载中..."
    });

    Util.getNavInfo().then(res => {
      this.setState({
        height: res.height,
        statusBarHeight: res.statusBarHeight
      });
    });

  }
  componentDidMount() {

    let that = this;

    Taro.request({
      url: api.getArea,
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      success: function(res) {

          let _province = Object.keys(res.data.data.area.province_list).map(
            key => ({
              key,
              value: res.data.data.area.province_list[key]
            })
          );

          let _city = Object.keys(res.data.data.area.city_list).map(
            key => ({
              key,
                  value: res.data.data.area.city_list[key]
            })
          );

          let _county = Object.keys(res.data.data.area.county_list).map(
            key => ({
              key,
                  value: res.data.data.area.county_list[key]
            })
          );
          
          that.setState({ province_:_province, city_:_city,county_:_county });

          const { formStore } = that.props;
           
          formStore.setPCO(_province[0].value, _city[0].value, _county[0].value);


        Taro.hideLoading();
      },
      fail: function(err) {
        console.log(err);
      }
    });
  }

  componentDidShow() {}

onChange = e => {

    const { formStore } = this.props;
     const val = e.detail.value

    formStore.setPCO(this.state.province_[val[0]].value, this.state.city_[val[1]].value, this.state.county_[val[2]].value);

}


  render() {

      const {
          formStore: { province,city,county }
      } = this.props;

    return <View className="container" style={{ paddingTop: this.state.height + "px" }}>
        <Navbar height={this.state.height} statusBarHeight={this.state.statusBarHeight} size="28" color="#ffffff" icon="chevron-left" title="完善资料" />
        <Banner title="您的工作地区在哪里？" style="width:100%" />
        <View className="content">
          <View className="select">
            <View className="province">{province}</View>
            <View className="city">{city}</View>
            <View className="county">{county}</View>
          </View>
          <PickerView indicatorStyle="height: 50px;" style="width: 100%;height:250px;" onChange={this.onChange}>
            <PickerViewColumn className="pvc">
              {this.state.province_.map(item => {
                return <View>{item["value"]}</View>;
              })}
            </PickerViewColumn>
            <PickerViewColumn className="pvc">
              {this.state.city_.map(item => {
                return <View>{item["value"]}</View>;
              })}
            </PickerViewColumn>
            <PickerViewColumn className="pvc">
              {this.state.county_.map(item => {
                return <View>{item["value"]}</View>;
              })}
            </PickerViewColumn>
          </PickerView>
        </View>
      </View>;
  }
}
export default Workspace