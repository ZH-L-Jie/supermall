<!-- categories -->
<template>
    <div class="wrapper">

        <ul class="content">
            <button @click="btnClick">按钮</button>
            <div @click="btnClick2">按钮2</div>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
        </ul>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: 'Categories',
        data() {
            return {
                scroll: null
            }
        },
        //创建完组件后调用
        mounted() {
            this.scroll = new BScroll(document.querySelector('.wrapper'), {

                probeType: 3,
                pullUpLoad: true

            })
            this.scroll.on('scroll', (position) => {
                console.log(position)
            })
            this.scroll.on('pullingUp', () => {
                console.log("上拉加载更多666")
            })
        },
        methods: {
            btnClick() {
                console.log('btnClick')
            },
            btnClick2() {
                console.log('btnClick')
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        height: 150px;
        background-color: #ff5777;

        overflow: hidden;

    }
</style>
