import request from '@/utils/request'
// 获取商品分类
export const getCategory = () => {
  return request.get('/category/list')
}
