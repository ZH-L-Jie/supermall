import {
    debounce
} from './utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh, 500)
        this.itemImgListener = () => {
            this.newRefresh();
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
    },
    data() {
        return {
            itemImgListener: null,
            newRefresh: null
        }
    }
}


export const backTopMixin = {
    components: {
        BackTop

    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 300);
        },
    }
}