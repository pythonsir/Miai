import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { AtTabBar } from 'taro-ui'
import './comprehensive.less'

import Tabbar from '../../components/comprehensive/tabbar/tabbar'


class Comprehensive extends Component {

    config = {
        navigationBarTitleText: "综合频道",
        navigationStyle:"default"
    }

    state = {
        current:0
    }

    render(){
        return <View>
            {/* <AtTabBar
                fixed
                iconSize = {15}
                fontSize = {12}
                tabList={[
                    { title: '待办事项', iconType: 'bullet-list'  },
                    { title: '拍照', iconType: 'camera' },
                    { title: '文件夹', iconType: 'folder' }
                ]}
                onClick={this.handleClick.bind(this)}
                current={this.state.current}
            /> */}
            <Tabbar></Tabbar>
        </View>
    }

}