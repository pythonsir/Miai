import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./month.less";

/**
 * 选择月
 */
class Month extends Component{

    componentDidMount(){
  
    }



    generateNumber(){

        let list = []

        for(let i = 1; i < 13; i++){

            list.push(i)

        }

        return list

    }
    selectMonth(n){

        this.props.onSelect(n)

    }


  render(){

    const { value } = this.props

     let list = this.generateNumber()

      return <View className="container">
         
          <View className="right" >
              {
                  list.map(n => {
                      return <View onClick={this.selectMonth.bind(this,n)} className={value == n ? "item choose" : "item"} key={n}>
                          {n}
                        </View>;
                  })
              }
          </View>
      </View>
  }

}

export default Month