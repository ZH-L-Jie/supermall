<template>
    <swiper>
        <swiperItem v-for="(item,key) in banners " :key="key">
            <a :herf="item.link">
                <img :src="item.image" alt="" @load="imageLoad">
            </a>
        </swiperItem>
    </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from "components/common/swiper";

    export default {
        name: "HomeSwiper",
        props: {
            banners: {
                type: Array,
                default: []
            },


        },
        data() {
            return {
                isLoad: false
            }
        },
        components: {
            Swiper,
            SwiperItem
        },
        methods: {
            imageLoad() {
                if (!this.isLoad) {
                    this.$emit('swiperImageLoad')
                    this.isLoad = true
                }
            }
        }
    }
</script>

<style>

</style>
