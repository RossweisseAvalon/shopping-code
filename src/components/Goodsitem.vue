<template>
  <div v-if="item.goods_id" class="goods" @click="$router.push(`/prodetail/${item.goods_id}`)">
    <div class="left">
      <img :src="item.goods_image" alt="">
    </div>
    <div class="right">
      <p class="title text-ellipsis-2" >{{ item.goods_name }}</p>
      <p class="count">已售{{ item.goods_sales }}件</p>
      <p class="price">
        <span class="new">￥{{ item.goods_price_min }}</span>
        <span class="old">￥{{ item.goods_price_max }}</span>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GoodsItem',
  props: {
    item: {
      type: Object,
      // 值是对象型时，默认值需要以这种方式
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .goods {
    display: flex;
    margin-bottom: 6px;
    padding: 10px;
    background-color: #fff;
    .left {
      margin-right: 5px;
      img {
        height: 140px;
      }
    }
    .right {
      flex: 1;
      padding-top: 20px;
      .title {
        height: 40px;
        font-size: 15px;
      }
      .count {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 13px;
        color: gray;
      }
      .price {
        .new {
          color: #f03c3c;
          margin-right: 10px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          color: gray;
        }
      }
    }
  }
</style>
