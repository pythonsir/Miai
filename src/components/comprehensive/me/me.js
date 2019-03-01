import Taro, { Component } from "@tarojs/taro";
import './me.less'

class Me extends Component{

    componentDidMount(){

        Taro.setNavigationBarTitle({
            title:"个人中心"
        })

    }

    render(){
        return <View>
me
        </View>
    }


}

export default Me