<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />
    <van-search background="#f1f1f2" @click="$router.replace('/search')" :value="querySearch || '搜索商品'"  show-action>
      <template #action>
        <van-icon @click="$router.push('/category')" class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格 </div>
    </div>

    <div v-if="proList.length>1" class="goods-list">
      <GoodsItem
        v-for="item in proList"
        :key="item.goods_id"
        :item="item">
      </GoodsItem>
    </div>
  </div>
</template>

<script>
import { getProList } from '@/api/product'
import GoodsItem from '@/components/Goodsitem'
export default {
  name: 'SearchIndex',
  data () {
    return {
      page: 1, // 页数
      proList: [] // 商品列表
    }
  },
  components: {
    GoodsItem
  },
  computed: {
    // 获取地址栏的搜索关键字
    querySearch () {
      return this.$route.query.search
    }
  },

  async created () {
    // 获取商品数据
    const res = await getProList({
      categoryId: this.$route.query.categoryId,
      goodsName: this.querySearch,
      page: this.page
    })
    this.proList = res.data.list.data
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  .tool {
    font-size: 24px;
    vertical-align: middle ;
  }
  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
