
<script>

export default {
  async created() {
    console.log('小程序启动了')
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
.text-primary{
  color: #ea5149;
}
.text-footer{
  text-align: center;
  font-size: 12px;
  margin-bottom: 5px;
}
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


