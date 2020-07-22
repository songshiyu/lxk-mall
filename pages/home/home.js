
const { Banner } = require("../../model/banner")
const { Categoty } = require("../../model/category")
const { Activity } = require("../../model/Activity")
const { Theme } = require("../../model/Theme")
const { SpuPaging } = require("../../model/spu_paging")
const { pageing } = require("../../utils/paging")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ThemeA:null,
    ThemeE:null,
    ThemeESpu:null,
    ThemeF:null,
    BannerB:null,
    grid:[],
    activityD:null,
    BannerG:null,
    ThemeH:null
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.initAllData(),
    await this.initBottomSpuList()
  },

  /**
  * 一次性初始化首页数据
  * TODO 此处有一个遗留问题，如何确保用户随意上传的图片能够符合我们定义的图片尺寸--参考小程序文档中媒体组件-image-mode
  */
  async initAllData(){
    //将所有获取主题的方法放在同一个http请求中
    const theme = new Theme()
    await theme.getThemes()
    //获取首页主题
    const themeA = theme.getHomeLocationA()
    const themeE = theme.getHomeLocationE()
    const themeH = theme.getHomeLocationH()
    let themeESpu = []
    if(themeE.online){
      const data = await theme.getHomeLocationESpu()
      if(data != null){
        themeESpu = data.spu_list.splice(0,8)
      }
    }
    const themeF = await theme.getHomeLocationF()
    //获取首页第一个轮播图
    const bannerB = await Banner.getHomeLocationB()
    //获取首页六宫格数据
    const Grid =  await Categoty.getCategoryA()
    //获取首页优惠券活动
    const activity = await Activity.getHomeLocationD()
    //获取热卖
    const bannerG = await Banner.getHomelocationG()

    this.setData({
      ThemeA:themeA,
      ThemeE:themeE,
      ThemeESpu:themeESpu,
      BannerB:bannerB,
      grid:Grid,
      activityD:activity,
      ThemeF:themeF,
      BannerG:bannerG,
      ThemeH:themeH
    })
  },
  async initBottomSpuList(){
    const paging = SpuPaging.getLastestPaging()
    const data = await paging.getMoreData()
    if(!data){
        return
    }
   wx.lin.renderWaterFlow(data.items)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})