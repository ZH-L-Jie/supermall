<template>
    <!-- <nav-bar>
        <div slot="center" class="nav-bar">购物车</div>
    </nav-bar> -->
    <div>
        购物车
    </div>
</template>

<script>
    // import NavBar from 'components/common/navbar/NavBar'
    export default {
        name: "Cart",
        components: {
            // NavBar
        }
    }
</script>

<style scoped>
    .nav-bar{
        background-color: var(--color-tint);
        color: #fff;
        text-align: center;
    }
</style>