<template>
  <swiper>
        <swiperItem v-for="(item,key) in banners " :key="key">
          <a :herf="item.link">
            <img :src="item.image" alt="">
          </a>
        </swiperItem>
      </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
    name: "HomeSwiper",
    props: {
        banners: {
            type: Array,
            default: []
        },
    
    },
    components: {
        Swiper,
        SwiperItem
    }
}
</script>

<style>

</style>