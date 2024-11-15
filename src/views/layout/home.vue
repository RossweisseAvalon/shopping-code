<template>
  <div class="home">
    <van-nav-bar fixed title="智慧商城"/>
    <van-search
      placeholder="请输入搜索关键词"
      readonly
      @click="$router.push('/search')"
      background="#f1f1f2"/>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
        <img :src="item.imgUrl"  alt="" >
      </van-swipe-item>
    </van-swipe>
    <van-grid :column-num="5">
      <van-grid-item
        v-for="item in navList"
        :key="item.imgUrl"
        :icon="item.imgUrl"
        :text="item.text"
        @click="$router.push('/category')"/>
    </van-grid>

    <div v-if="proList.length > 1" class="guess">
      <p>————猜你喜欢————</p>
      <div>
        <!-- 因为GoodsIem是封装的组件，要将数据给它进行渲染需要传递过去:item="item"  -->
        <GoodsItem
          v-for="item in proList" :key="item.goods_id"
          :item="item">
        </GoodsItem>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/Goodsitem'
import { getHomeData } from '@/api/home'
export default {
  name: 'HomeIndex',
  data () {
    return {
      bannerList: [], // 轮播图
      navList: [], // 导航
      proList: [] // 商品
    }
  },
  components: {
    GoodsItem
  },
  async created () {
    const { data: { pageData } } = await getHomeData()
    this.bannerList = pageData.items[1].data
    this.navList = pageData.items[3].data
    this.proList = pageData.items[6].data
  }
}
</script>

<style lang="less" scoped>
  .home {
    padding-top: 100px;
    padding-bottom: 50px;
    background-color: rgb(241, 241, 242);
  }
  .my-swipe {
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      text-align: center;
      img {
        width: 100%;
        height: 185px;
      }
    }
  }
  .guess {
    margin-top: 10px;
    p {
      background-color: #fff;
      text-align: center;
      font-size: 16px;
    }
  }
  .van-nav-bar{
    background-color: red;
    /* ::v-deep 就是把data-v-hash值选择器写到类名的前面 */
    ::v-deep .van-nav-bar__title {
      color:white;
      font-size: 18px;
    }
  }
  .van-search {
    width: 100%;
    position: fixed;
    top: 46px;
    z-index: 999;
  }
</style>
