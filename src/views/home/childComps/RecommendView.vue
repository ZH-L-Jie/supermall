<template>
    <div id="recommend">
        <div v-for="(item,key) in recommends" class="recommend-item" :key="key">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RecommendView",
        props: {
            recommends: {
                type: Array,
                default () {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    #recommend {
        display: flex;
        width: 100%;
        text-align: center;
        font-size: 14px;
        padding: 10px 0 20px;
        border-bottom: 8px solid #eee;
    }

    .recommend-item {
        flex: 2;
    }

    .recommend-item img {
        width: 70px;
        margin-bottom: 6px;
    }
</style>