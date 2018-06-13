
<script>
//引入配置项
import {get, showSuccess, showFail} from "./util";
import qcloud from "wafer2-client-sdk"
import config from "./config"

export default {
  async created() {
    let user = wx.getStorageSync('userinfo')
    if(!user){
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: function(userinfo){
          console.log('登录成功', userinfo)
          showSuccess('登录成功')
          wx.setStorageSync('userinfo', userinfo)
        },
        fail: function (err) {
          showFail('登录失败')
          console.log('登录失败', err)
        }
      })
    }
    

    // const res = await get('/weapp/demo')
    // console.log(res)
    // wx.request({
    //   url: config.host + "weapp/demo",
    //   success: function(res){
    //       console.log(res)
    //   }
    // });
  }
};
</script>
<style>
.btn{
  color: #ffffff;
  background: #ea5a49;
  margin-bottom: 10px;
  padding: 0 15px;
  border-radius: 2px;
  font-size: 16px;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.btn:active{
  background: #fa5a49;
}
</style>


