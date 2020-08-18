<!-- home -->
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <HomeSwiper :banners="banners" />
    <RecommendView :recommends="recommends"></RecommendView>
    <FeatureView></FeatureView>
    <TabControl :titles="['流行','新款','精选']" @tabClick="tabClick" />
    <GoodsList :goods= "showGoods"></GoodsList>
    <ul>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
      <li>aa</li>
    </ul>
  </div>
</template>

<script>
//购物街公共组件
import NavBar from "components/common/navbar/NavBar";

//购物街业务组件
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

//购物街子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  name: "home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop'
    };
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list;
    }
  },
  components: {
    NavBar,

    TabControl,

    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList
  },
  created() {
    //视图创建立马发送请求
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: { 
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log("res :>> ", res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      //请求商品数据
      const page = this.goods[type].page+1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++;
        
      });
    }
  }
};
</script>

<style  scoped>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
}
</style>
