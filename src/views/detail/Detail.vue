<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
            <detail-swiper :top-images="topImages"></detail-swiper>

            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
            <goods-list :goods="recommends" ref="recommend"></goods-list>

        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
        <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
<!--        <toast :message="message" :show="show"/>-->
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import Scroll from "../../components/common/scroll/Scroll";
    import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";

    import {debounce} from "common/utils"
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import GoodsList from "../../components/content/goods/GoodsList";
    import {
        itemListenerMixin
    } from '../../common/mixin'
    import DetailBottomBar from "./childComps/DetailBottomBar";
    import BackTop from "../../components/content/backTop/BackTop";
    import {mapActions} from 'vuex'
    // import Toast from "../../components/common/toast/Toast";

    export default {
        name: "Detail",
        mixins: [itemListenerMixin],
        components: {
            // Toast,
            BackTop,
            DetailBottomBar,
            GoodsList,
            DetailCommentInfo,
            DetailParamInfo,
            DetailGoodsInfo, DetailShopInfo, DetailBaseInfo, DetailSwiper, Scroll, DetailNavBar
        },
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTopYs: [],
                getThemeTopY: null,
                currentIndex: 0,
                isShowBackTop: false,
                // message:'',
                // show:false,

            }
        },
        created() {
            // 保存iid
            this.iid = this.$route.params.iid
            // 请求数据
            getDetail(this.iid).then(res => {
                // 1.获取数据
                const data = res.result;
                // 2.获取顶部的图片数据
                this.topImages = data.itemInfo.topImages;
                // 3.获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
                // 4.获取店铺信息
                this.shop = new Shop(data.shopInfo);
                // 5.获取商品详细信息
                this.detailInfo = data.detailInfo;
                // 6.保存参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

                if (data.rate.cRate) {
                    this.commentInfo = data.rate.list[0];
                }

                this.getThemeTopY = debounce(() => {
                    this.themeTopYs = []
                    this.themeTopYs.push(0)
                    this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                    this.themeTopYs.push(Number.MAX_VALUE);
                    // console.log(this.themeTopYs);
                }, 100)

            })
            getRecommend().then(res => {
                this.recommends = res.data.list
            })
        },
        methods: {
            ...mapActions(['addCart']),
            detailImageLoad() {
                this.newRefresh()
                this.getThemeTopY()
            },
            titleClick(index) {
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
            },
            contentScroll(position) {
                // 获取y值
                const positionY = -position.y;
                let length = this.themeTopYs.length
                // 普通版
                // positionY与主题中的值对比
                // for (let i = 0; i < length; i++) {
                //     if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i +
                //     1]) || (i === length - 1 && positionY > this.themeTopYs[i]))) {
                //         this.currentIndex = i;
                //         this.$refs.nav.currentIndex = this.currentIndex
                //     }
                // }
                for (let i = 0; i < length - 1; i++) {
                    if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i +
                    1])) {
                        this.currentIndex = i;
                        this.$refs.nav.currentIndex = this.currentIndex
                    }
                }
                this.isShowBackTop = positionY > 1000
                // console.log(length);
            },
            backClick() {
                this.$refs.scroll.scrollTo(0, 0, 300);
            },
            addToCart() {
                const product = {}
                product.image = this.topImages[0];

                product.iid = this.iid;
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.newprice = this.goods.nowPrice;
                // mapperActions映射导入
                this.addCart(product).then(res => {
                    // this.show=true
                    // this.message=res
                    // setTimeout(()=>{
                    //     this.show=false
                    //     this.message=''
                    // },1500)
                    // console.log(res);
                    this.$toast.show(res)
                })
                // this.$store.dispatch('addCart',product).then(res =>{
                //     console.log(res);
                // })
                console.log("购物车")

            }
        },
    }


</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        height: 100vh;
        background-color: #fff;
    }

    .content {
        position: fixed;
        height: calc(100% - 102px);
        top: 44px;
        /*bottom: 49px;*/
    }

    .detail-nav-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9;
        background-color: #fff;
    }
</style>
