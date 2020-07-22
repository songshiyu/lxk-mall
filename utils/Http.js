import { promise } from "./util";

const { config } = require("../config/config");

class Http{

    static async request({url,data,method='GET'}){
        const res =  await promise(wx.request)({
          url: `${config.apiBaseUrl}${url}`,
          data:data,
          method:method,
          header:{
              appkey:config.appkey
          }
        })

        return res.data
    }
}



export {
    Http
}