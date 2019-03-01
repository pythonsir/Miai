import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { AtTabBar } from 'taro-ui'
import Recommend from '../../components/comprehensive/recommend/recommend'
import Me from "../../components/comprehensive/me/me";
import './comprehensive.less'
import Tabbar from '../../components/comprehensive/tabbar/tabbar'


/**
 * 
 */
class Comprehensive extends Component {

    config = {
        navigationStyle:"default"
    }

    state = {
        current:''
    }

    componentWillMount(){
        const { i } = this.$router.params
        this.setState({
            current:i
        })
    }


    changeTab(i){
        this.setState({
            current:i
        })
    }

    render(){
        return <View>
            {this.state.current == 0 && <Recommend ></Recommend>}
            {this.state.current == 1 && <Me></Me>}
            <Tabbar tabindex={this.state.current} onChange={this.changeTab}></Tabbar>
        </View>
    }

}