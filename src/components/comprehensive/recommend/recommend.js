import Taro, { Component } from "@tarojs/taro";
import './recommend.less'


class Recommend extends Component{

    componentDidMount(){
        Taro.setNavigationBarTitle({
            title:'推荐'
        })
    }

    render(){
        return <View>
            recommend
        </View>
    }

}
export default Recommend