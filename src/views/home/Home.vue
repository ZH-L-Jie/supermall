<!-- home -->
<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>

        <scroll class="content" ref="scroll"
                :probe-type="3"
                :pullUpLoad="true"
                @scroll="contentScroll"
                @pullingUp="loadMore">
            <HomeSwiper :banners="banners"/>
            <RecommendView :recommends="recommends"></RecommendView>
            <FeatureView></FeatureView>
            <TabControl :titles="['流行','新款','精选']" @tabClick="tabClick"/>
            <GoodsList :goods="showGoods"></GoodsList>

        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>

    </div>
</template>

<script>
    //购物街公共组件
    import NavBar from "components/common/navbar/NavBar";
    import Scroll from "components/common/scroll/Scroll";


    //购物街业务组件
    import TabControl from "components/content/tabControl/TabControl";
    import GoodsList from "components/content/goods/GoodsList";
    import BackTop from "components/content/backTop/BackTop";

    //购物街子组件
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";


    import {getHomeMultidata, getHomeGoods} from "network/home";

    export default {
        name: "home",
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    pop: {page: 0, list: []},
                    new: {page: 0, list: []},
                    sell: {page: 0, list: []}
                },
                currentType: 'pop',
                isShowBackTop: false
            };
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list;
            }
        },
        components: {
            NavBar,
            Scroll,
            BackTop,

            TabControl,

            HomeSwiper,
            RecommendView,
            FeatureView,
            GoodsList,

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
            backClick() {
                this.$refs.scroll.scrollTo(0, 0, 300);
            },
            contentScroll(position) {
                this.isShowBackTop = (-position.y) > 1000
            },
            loadMore() {
                this.getHomeGoods(this.currentType)
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
                const page = this.goods[type].page + 1;
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page++;

                    this.$refs.scroll.finishPullUp()

                });
            }
        }
    };
</script>

<style scoped>
    #home {
        height: 100vh;
        position: relative;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
    }

    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    .tab-control {
        position: relative;
        z-index: 9;
        background: #fff;
    }
</style>
