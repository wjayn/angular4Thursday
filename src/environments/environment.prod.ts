export const environment = {
  production: true,
  frontEndUrl: `/ccb/ccbSuccess/ccbSuccess.php`,
  paymentUrl: `/wechat/payment/ccbPay.html`,
  thursdayPhpUrl: `/ccb/ccb-php/index.php?type=callback&menu=thursday`,
  userPhpUrl: `/ccb/ccb-php/index.php?type=callback&menu=user`,
  // userPhpUrl: `/ccb/web/#/user/index`,
  /**
   * 获取油券列表
   */
  moneyUrl: '/ccb-api/api/v1/cbc/goods/query',

  /**
   * 添加订单
   */
  addOilOrderUrl: '/ccb-api/api/v1/cbc/SecKillOrders',

  /**
   * 支付订单
   */
  payOrderdUrl: '/ccb-api/api/v1/cashier/payOrder',

  /**
   * 发送认证信息卡验证码
   */
  sendAuthMsg: `/ccb-api/api/v1/cbc/auth/sendAuthMsg`,

  /**
   * 验证并保存信息卡
   */
  authMsgUrl: `/ccb-api/api/v1/cbc/auth/authMsg`,

  /**
   * 查询是否绑定信息卡
   */
  checkIsAuthUrl: `/ccb-api/api/v1/cbc/auth/checkIsAuth`,
  /**
   * 获取tokenId
   */
  getTokenUrl: `/ccb-api/api/v1/cbc/account/getToken`,

  /**
   * 汽车养护券
   */
  receiveVoucher: `/ccb-api/api/v1/cbc/SecKillOrders/giveCareCoupons`,
  /**
   * 获取时间戳
   */
  getTimeUrl: `/ccb-api/api/v1/cbc/time/nowTime`,

  /**
   * 汽车养护 获取类别&类别下的商品
   */
  classifyUrl: `/ccb-api/api/v1/cbc/carLife/category/list`,
  /**
   * 汽车养护 下单
   */
  addCarOrderUrl: `/ccb-api/api/v1/cbc/carLife/orders/add`,
  /**
   * 汽车养护 判断订单是否能够支付
   */
  judgeCarOrderdUrl: `/ccb-api/api/v1/cbc/carLife/orders/judge`,
  /**
   * 汽车养护 确认收货
   */
  carOrderConfirm: `/ccb-api/api/v1/cbc/carLife/orders/confirm`,
  /**
   * 判断早晚市是否开始
   */
  earlyAndEveningMarketUrl: `/ccb-api/api/v1/cbc/carLife/category/checkEarlyAndEveningMarketIsOk`
};
