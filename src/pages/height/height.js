import Taro, {Component} from "@tarojs/taro"
import {View} from "@tarojs/components"
import Util from "../../util/util"
import api from "../../config/api"
import Navbar from "../../components/navbar/navbar"
import Banner from "../../components/banner/banner"


class Height extends Component {

    state = {
        height: 0,
        statusBarHeight: 0
    }

    componentWillMount() {

        Util
            .getNavInfo()
            .then(res => {
                this.setState({height: res.height, statusBarHeight: res.statusBarHeight});
            });

    }

    render() {
        return <View
            className="container"
            style={{
            paddingTop: this.state.height + "px"
        }}>
            <Navbar
                height={this.state.height}
                statusBarHeight={this.state.statusBarHeight}
                size="28"
                color="#ffffff"
                icon="chevron-left"
                title="完善资料"/>
            <Banner title="您的身高？" style="width:100%"/>
            <View className="content">
                dddd
            </View>
        </View>
    }

}
export default Height