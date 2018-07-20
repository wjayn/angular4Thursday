// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// const baseText = '/ccb-api';
const baseText = '/cbc-api';

export const environment = {
    production: false,
    frontEndUrl: `/php-api/wechat_front/ccb/ccbSuccess/ccbSuccess.php`,
    paymentUrl: `/payWeb/payment/ccbPay.html`,
    thursdayPhpUrl: `/php-api/wechat_front/ccb/ccb-php/index.php?type=callback&menu=thursday`,
    userPhpUrl: `/ccb/#/user/index`,

    /**
     * 获取油券列表
     */
    moneyUrl: `${baseText}/api/v1/cbc/goods/query`,

    /**
     * 添加订单
     */
    addOilOrderUrl: `${baseText}/api/v1/cbc/SecKillOrders`,

    /**
     * 支付订单
     */
    payOrderdUrl: `${baseText}/api/v1/cashier/payOrder`,

    /**
     * 发送认证信息卡验证码
     */
    sendAuthMsg: `${baseText}/api/v1/cbc/auth/sendAuthMsg`,

    /**
     * 验证并保存信息卡
     */
    authMsgUrl: `${baseText}/api/v1/cbc/auth/authMsg`,

    /**
     * 查询是否绑定信息卡
     */
    checkIsAuthUrl: `${baseText}/api/v1/cbc/auth/checkIsAuth`,
    /**
     * 获取tokenId
     */
    getTokenUrl: `${baseText}/api/v1/cbc/account/getToken`,

    /**
     * 汽车养护券
     */
    receiveVoucher: `${baseText}/api/v1/cbc/SecKillOrders/giveCareCoupons`,
    /**
     * 获取时间戳
     */
    getTimeUrl: `${baseText}/api/v1/cbc/time/nowTime`,

    /**
     * 汽车养护 获取类别&类别下的商品
     */
    classifyUrl: `${baseText}/api/v1/cbc/carLife/category/list`,
    /**
     * 汽车养护 下单
     */
    addCarOrderUrl: `${baseText}/api/v1/cbc/carLife/orders/add`,
    /**
     * 汽车养护 判断订单是否能够支付
     */
    judgeCarOrderdUrl: `${baseText}/api/v1/cbc/carLife/orders/judge`,
    /**
     * 汽车养护 确认收货
     */
    carOrderConfirm: `${baseText}/api/v1/cbc/carLife/orders/confirm`,
    /**
     * 判断早晚市是否开始
     */
    earlyAndEveningMarketUrl: `${baseText}/api/v1/cbc/carLife/category/checkEarlyAndEveningMarketIsOk`

  }
;
