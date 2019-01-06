import Taro, { Component } from "@tarojs/taro";

import './banner.less'

class Banner extends Component{


    render(){
        const {title} = this.props

        return (
        <View className='container'>

                <View className='title'>
                    {title}
                </View>

                </View>
        )
    }

}
export default Banner