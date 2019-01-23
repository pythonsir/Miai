import Taro, {Component} from "@tarojs/taro";
import {View} from "@tarojs/components";

import "./day.less";

class Day extends Component {



    // componentDidMount(){
    //     this.generateDay(this.state.year,this.state.month)
    // }


    // componentWillReceiveProps(nextProps,prepPops){

    //     const {year ,month} = nextProps

    //     console.log(year+' ' + month)

    //     this.setState({
    //         year:year,
    //         month:month,
    //         list:this.generateDay(year,month)
    //     })

    // }

    

    generateDay(year,month){

        let num = new Date(year, month, 0).getDate();

        let list  = []

        for(let i = 0; i < num; i++){

            list.push(i+1)

        }
        

        return list 

    }

    setDay(n){

        this.props.onSelect(n)

    }


    render() {

        const { dyear, dmonth, onSelect,value} = this.props

        const list = this.generateDay(dyear,dmonth)

        return <View className="container">

            <View className="right">
               
                {
                    list.map(n => {
                        return <View onClick={this.setDay.bind(this, n)} className={value == n ? "item choose" : "item"} key={n}>
                            {n}
                        </View>;
                    })
                }

            </View>
        </View>
    }
}

export default Day