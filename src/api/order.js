import request from '@/utils/request'

// 订单结算确认
// mode: cart    => obj { cartIds }
// mode: buyNow  => obj { goodsId, goodsNum, goodsSkuId }
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // 结算模式（buyNow立即购买 cart购物车
      delivery: 10, // 配送方式（10快递配送 20上门自提）
      shopId: 0, // 自提门店ID
      couponId: 0, // 优惠券ID
      isUsePoints: 0, // 是否使用积分抵扣（1使用 0不使用）
      ...obj // 购物车ID集
    }
  })
}

// 提交订单
// mode: cart    => obj { cartIds, remark }
// mode: buyNow  => obj { goodsId, goodsNum, goodsSkuId, remark }
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    payType: 10,
    mode,
    ...obj
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType, // 订单类型，all-全部，payment-待支付，delivery-待发货，received-待收货，comment-待评价
      page
    }
  })
}
