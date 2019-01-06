import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { AtIcon } from "taro-ui";
import './navbar.less'

class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = { 
          statusBarHeight: 0, 
          height:0,
        };
    }
  

  componentWillMount() {
   
   
    
  }

  componentDidMount() {

   



  }

  componentWillUnmout() {}

  componentWillReceiveProps() {}

  goback(){
    Taro.navigateBack({
      delta:1
    })
  }

  render() {
    const { bgimg,icon,title,color,size,height,statusBarHeight } = this.props;

    const bg = { height: height + 'px', paddingTop: statusBarHeight+'px' ,backgroundImage: `url(${bgimg})` };
     
    return <View className="container" style={bg}>
        <View className='warper'>
          <View className='warper_1'>
           <AtIcon value={icon} size={size} color={color} onClick={this.goback} />
          </View>
          <View className='warper_2'>
            {title}
          </View>
        </View>
      </View>;
  }
}
export default Navbar