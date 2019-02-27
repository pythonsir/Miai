const apiRoot = "http://localhost:8888/";

export default {
  apiRoot,
  getSession3rd: apiRoot + "?s=Core.GetSession3rd",
  saveWeixin: apiRoot + "?s=Core.SaveWeixinInfo",
  getArea: apiRoot + "?s=Dictionary.GetArea",
  getPhone: apiRoot + "?s=Core.getPhone",
  sendSms: apiRoot + "?s=Core.sendSms",
  bindPhone: apiRoot + '?s=Core.bindPhone',
  saveFormStore: apiRoot + '?s=User.saveUserInfo'
};