/**
 * 获取商品列表
 */
export class Money {
  id: string;  // 商品Id
  name: string; // 商品名称
  image: string; // 商品图片
  price: number; // 商品原价
  saledPrice: number; // 商品折后价格
  descriptions: string; // 商品描述
  status: number;		// 商品状态 0下架 1上架
  createTime: number; // 创建时间
  couponDetail: string; // 商品详情
  couponTempletId: string; // 赠送优惠券
  disCount: number; // 商品折扣
  isSale: number; // 是否售完
}
/**
 * 添加订单实体类
 */
export class AddOrder {
  accountId: string; // 账户id
  activityId: string; // 	活动id
  bankSerialNo: string; // 银行缴费流水号
  couponId: string; // 优惠券id
  couponTempletId: string; // 发优惠券id
  createTime: string; // 下单时间
  discountAmount: number; // 优惠金额
  finishTime: string;	// 订单完成时间
  id: string;
  isAvailable: string; // 是否删除 0 否 1 已删除
  itemId: string; // 商品id
  itemTotalValue: number; // 商品总值
  mark: string;
  oilDetail: string; // 油券明细
  payPrice: number; // 实付金额
  payStatus: number; // 支付状态 0 未支付 1支付成功
  payTime: string; // 付款时间
  payType: string; // 付款类型
  refund: number; // 退款 0 初始化 1 退款成功 2 退款失败 3 退款中 4 部分退款
  salePrice: number; // 商品售价
  sendStatus: string;	// 发货状态
  serialNumber: string; // 订单序列号
  status: number; // 状态 1 订单生成(未支付) 2 待发货(支付成功) 3 已完成
  updateTime: string;	// 修改时间
}

/**
 * 汽车养护券
 */
export class MaintenanceVoucher {
  accountId: string;
  creatTime: number;
  id: string;
  joinType: number;
  name: string;
  phoneNumber: string;
  plateNumber: string;
  type: number;
}

/**
 * 汽车养护类别 及其类别下的商品
 */
export class CarClassifyList {
  id: string;
  name: string;
  createTime: number;
  updateTime: number;
  status: number;
  check: boolean;
  itemsList: CarItemsList[];
}
export class CarItemsList {
  id: string;
  categoryId: string;
  name: string;
  coverImg: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  saleStatus: number;
  storage_count: number;
  createTime: number;
  updateTime: number;
  status: number;
  activeType: number;
  seller: CarSeller[];
}
export class CarSeller {
  id: string;
  telephone: string;
  name: string;
  address: string;
  createTime: number;
  updateTime: number;
  status: number;
}

/**
 * 汽车养护 下单
 */
export class AddCarOrder {
  id: string;
  accountId: string;
  orderSerial: string;
  orderFrom: number;
  salePrice: number;
  payPrice: number;
  discountAmount: number;
  phoneNo: string;
  bankSerialNo: string;
  mark: string;
  couponId: string;
  createTime: string;
  payTime: string;
  finishTime: string;
  updateTime: string;
  refund: string;
  isPromotion: number;
  isAvailable: number;
  payType: string;
  status: number;
  payStatus: number;
  sendStatus: number;
  ordersItems: OrdersItems[];
}
export class OrdersItems {
  id: string;
  orderSerial: string;
  sellerId: string;
  sellerName: string;
  itemId: string;
  itemName: string;
  reserveTime: number;
  reserveMobile: string;
}
