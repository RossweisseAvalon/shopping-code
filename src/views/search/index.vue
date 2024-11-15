<template>
  <div>
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.back()"/>
    <van-search autofocus background="#f1f1f2" v-model="search" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <button @click="goSearch(search)">搜索</button>
      </template>
    </van-search>
    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length > 0">
      <p>最近搜索</p>
      <van-icon @click="empty" name="delete-o"/>
    </div>
    <div class="list">
      <div v-for="item in history" :key="item" class="list-item" @click="goSearch(item)">{{ item }}</div>
    </div>
  </div>
</template>

<script>
import { getHitoryList, setHistoryList } from '@/utils/storage'
export default {
  name: 'SerachIndex',
  data () {
    return {
      search: '', // 输入框的内容
      history: getHitoryList() // 历史记录
    }
  },
  methods: {
    goSearch (key) {
      if (key.trim() === '') return
      // 将已经存在最近搜索中的数据进行删除
      this.history = this.history.filter(item => item !== key)
      // 将新数据头部插入
      this.history.unshift(key)
      // 本地持久化
      setHistoryList(this.history)

      // 跳转到搜索列表页
      this.$router.push(`/searchlist?search=${key}`)
    },
    empty () {
      this.history = []
      setHistoryList(this.history)
    }
  }
}
</script>

<style lang="less" scoped>
  .van-search__action {
    padding: 0;
    button {
      margin-right: 10px;
      width: 60px;
      border-radius: 0px 5px 5px 0px;
      text-align: center;
      background-color: red;
      color: white;
      border: none;
    }

  }
  .search-history {
    display: flex;
    padding: 0px 10px;
    p {
      flex: 1;
    }
    .van-icon {
      font-size: 20px;
    }
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    .list-item {
      width: 30%;
      text-align: center;
      padding: 7px;
      line-height: 15px;
      border-radius: 50px;
      font-size: 13px;
      border: 1px solid #efefef;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 10px;
    }
  }
</style>
