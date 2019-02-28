import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/mobx";
import Index from "./pages/index";
import api from "./config/api";

import store from "./store";

import "./app.less";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: [
      "pages/index/index",
      "pages/choosesex/choosesex",
      "pages/workspace/workspace",
      "pages/birthday/birthday",
      "pages/height/height",
      "pages/education/education",
      "pages/marriage/marriage",
      "pages/income/income",
      "pages/account/create_account",
      "pages/account/phone_register",
      "pages/comprehensive/comprehensive"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#FF4D56",
      navigationStyle: "custom",
      navigationBarTextStyle: "white",
      navigationBarTitleText: "脱单在太原"
    }
  };

  componentWillMount() {
    Taro.checkSession()
      .then(res => {
        return Taro.getStorage({ key: "session3rd" });
      })
      .catch(err => {
        return Taro.login()
          .then(res => {
            return Taro.request({
              url: api.getSession3rd,
              data: { code: res.code },
              success: function(res) {
                if (res.statusCode == 200 && res.data.ret == 200) {
                  Taro.setStorage({
                    key: "session3rd",
                    data: res.data.data.session3rd
                  });
                } else if (res.statusCode == 500) {
                  Taro.showToast({
                    title: "发生错误,请重试！",
                    icon: "none"
                  });
                }
              }
            });
          })
          .catch(err => {
            console.log(err);
            Taro.showToast({
              title: "发生错误,请重试！",
              icon: "none"
            });
          });
      });

    Taro.getSetting()
      .then(res => {
        if (res.authSetting["scope.userInfo"]) {
          return true;
        } else {
          throw new Error("没有授权");
        }
      })
      .then(res => {
        return Taro.getUserInfo();
      })
      .then(res => {
        Taro.setStorage({
          key: "userinfo",
          data: res.userInfo
        });

        this.saveWeixin(res.userInfo);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  saveWeixin(userinfo) {
    Taro.request({
      url: api.saveWeixin,
      data: {
        session3rd: Taro.getStorageSync("session3rd"),
        nickName: userinfo.nickName,
        avatarUrl: userinfo.avatarUrl
      },
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      success: function(res) {
        console.log(res);
      },
      fail: function(err) {
        console.log(err);
      }
    });
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
