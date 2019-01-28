import Taro, {Component} from "@tarojs/taro"
import {View} from "@tarojs/components"
import Util from "../../util/util"
import api from "../../config/api"
import { observer, inject } from "@tarojs/mobx";
import Navbar from "../../components/navbar/navbar"
import Banner from "../../components/banner/banner"
import {Height as HeightComp}  from '../../components/height/height'
import './height.less'


@inject("formStore")
@observer
class Height extends Component {

    state = {
        _height: 0,
        statusBarHeight: 0,
        svHeight:0
    }

    componentWillMount() {

        Util.getNavInfo()
            .then(res => {
                this.setState({ _height: res.height, statusBarHeight: res.statusBarHeight});
            });

    }
    componentDidMount(){

        this.getScrollViewHeight()

    }

    getScrollViewHeight() { // 设置ScrollView的高度

        Taro.getSystemInfo().then(res => {

            const query = Taro.createSelectorQuery()

            query.select('#content').boundingClientRect()

            query.exec((res) => {
                const c = res[0].height
                this.setState({
                    svHeight: c
                })
            })

        })
    }

    setHeight(n){

       
        const { formStore } = this.props

        formStore.setHeight(n)

        setTimeout(() => {
            Taro.navigateTo({
                url:'/pages/education/education'
            })
        }, 300);
        
    }

    render() {

        const { formStore: { height } } = this.props
        return <View
            className="container"
            style={{
                paddingTop: this.state._height + "px"
        }}>
            <Navbar
                height={this.state._height}
                statusBarHeight={this.state.statusBarHeight}
                size="28"
                color="#ffffff"
                icon="chevron-left"
                title="完善资料"/>
            <Banner title="您的身高？" style="width:100%"/>
            <View id="content" className="content">
                <ScrollView scrollY={true} style={'height:' + this.state.svHeight + 'px'} >
                    <HeightComp height_value={height} onChoose={this.setHeight}></HeightComp>
                </ScrollView>
                
            </View>
        </View>
    }

}
export default Height