import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"

import './height.less'


class Height extends Component{



    getlist(start,length){

        let list = []

        list.push(start)

        for (let i = 1; i <= length; i++){

            start += 1

            list.push(start)

        }

        return list


    }

    setHeight(h){
        this.props.onChoose(h)

    }


    render(){

        const { height_value } = this.props

        return (
            <View className="warper">

                <View className="container">
                    <View className="left">
                        <View className="left-1">150</View>
                        <View className="left-2">cm</View>
                        <View className="left-3" />
                    </View>
                    <View className="right" >
                        <View onClick={this.setHeight.bind(this, n)} className={height_value == "149以下" ? "item choose" : "item"} style='padding-left:10px;padding-right:10px'>149以下</View>
                        {
                            this.getlist(150,9).map(n => {
                                return <View onClick={this.setHeight.bind(this, n)} className={height_value == n ? "item choose" : "item"} key={n}>
                                    {n}
                                </View>;
                            })
                        }
                    </View>
                </View>
                <View className="container">
                    <View className="left">
                        <View className="left-1">160</View>
                        <View className="left-2">cm</View>
                        <View className="left-3" />
                    </View>
                    <View className="right" >
                        {
                            this.getlist(160, 9).map(n => {
                                return <View onClick={this.setHeight.bind(this, n)} className={height_value == n ? "item choose" : "item"} key={n}>
                                    {n}
                                </View>;
                            })
                        }
                    </View>
                </View>
                <View className="container">
                    <View className="left">
                        <View className="left-1">170</View>
                        <View className="left-2">cm</View>
                        <View className="left-3" />
                    </View>
                    <View className="right" >
                        {
                            this.getlist(170, 9).map(n => {
                                return <View onClick={this.setHeight.bind(this, n)} className={height_value == n ? "item choose" : "item"} key={n}>
                                    {n}
                                </View>;
                            })
                        }
                    </View>
                </View>
                <View className="container">
                    <View className="left">
                        <View className="left-1">180</View>
                        <View className="left-2">cm</View>
                        <View className="left-3" />
                    </View>
                    <View className="right" >
                        {
                            this.getlist(180, 9).map(n => {
                                return <View onClick={this.setHeight.bind(this, n)} className={height_value == n ? "item choose" : "item"} key={n}>
                                    {n}
                                </View>;
                            })
                        }
                    </View>
                </View>
                <View className="container">
                    <View className="left">
                        <View className="left-1">190</View>
                        <View className="left-2">cm</View>
                        <View className="left-3" />
                    </View>
                    <View className="right" >
                        {
                            this.getlist(190, 9).map(n => {
                                return <View onClick={this.setHeight.bind(this, n)} className={height_value == n ? "item choose" : "item"} key={n}>
                                    {n}
                                </View>;
                            })
                        }
                    </View>
                </View>
                <View className="container">
                    <View className="left">
                        <View className="left-1">200</View>
                        <View className="left-2">cm</View>
                        <View className="left-3" />
                    </View>
                    <View className="right" >
                        {
                            this.getlist(200, 9).map(n => {
                                return <View onClick={this.setHeight.bind(this, n)} className={height_value == n ? "item choose" : "item"} key={n}>
                                    {n}
                                </View>;
                            })
                        }
                        <View onClick={this.setHeight.bind(this, n)} className={height_value == "210以上" ? "item choose" : "item"} style='padding-left:10px;padding-right:10px'>
                            210以上
                        </View>
                    </View>
                </View>


            </View>
           
        )
    }

}

export default Height