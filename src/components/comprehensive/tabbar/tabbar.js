import Taro, { Component } from "@tarojs/taro";
import './tabbar.less'

/**
 * 底部tabbar
 */
class Tarbar extends Component{

    state ={
        index : 1,
        tablist:[
            {
                text:'推荐',
                class:'recommend',
                selectClass:'c_recommend',
                textClass:'item_text_select'
            },
            {
                text: '我的',
                class:'me',
                selectClass:'c_me',
                textClass:'item_text_select'
            }
        ]
    }

    changeTab(i){
        this.setState({
            index:i
        })
    }

    render(){
        return <View className='container'>
            <View className='tab-bar'>
                {
                    this.state.tablist.map((item,i) => {
                        return <View className='item' onClick={this.changeTab.bind(this,i)}>
                            <View className={'item_image ' + (this.state.index === i ? item.selectClass :  item.class) }></View>
                            <View className={'item_text ' +  (this.state.index === i && 'item_text_select')  }>
                                {item.text}
                            </View>
                        </View>
                    })
                }
            </View>
        </View>
    }
}

export default Tarbar