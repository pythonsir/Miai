import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import './year.less'

/**
 * 选择年
 */
class Year extends Component {
 

  state={
      yearlist:[],
  }

  generateYearList(number,year){

    let list = []

    for(let i =0; i < 10; i ++ ){

        list.push("" + year + number);

        number++

    }
   
    return list
  }

  setYear(year){
    this.props.onChoose(year)
  
  }

  render() {

    const { number , year, year_value } = this.props;
   
    const list = this.generateYearList(number,year)

    return (
      <View className="container">
        <View className="left">
          <View className="left-1">{number}</View>
          <View className="left-2">后</View>
          <View className="left-3" />
        </View>
        <View className="right" >
           {
             list.map(n => {
               return <View onClick={this.setYear.bind(this, n)} className={year_value == n? "item choose":"item"} key={n}>
                   {n}
                 </View>;
             })
           }
        </View>
      </View>
    );
  }
}
export default Year;