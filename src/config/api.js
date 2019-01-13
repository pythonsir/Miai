const apiRoot = "http://localhost:8888/";

export default {
  apiRoot,
  getSession3rd: apiRoot + "?s=Core.GetSession3rd",
  saveWeixin: apiRoot + "?s=Core.SaveWeixinInfo",
  getArea: apiRoot + "?s=Dictionary.GetArea"
};