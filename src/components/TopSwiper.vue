<template>
    <div class="swiper">
        <swiper
            indicator-dots="true"
            indicator-color="#ea5a49"
            autoplay="true"
            interval="5000"
            duration="1000"
            circular="true"
        >
            <div :key="imgindex" v-for="(top, imgindex) in imgUrls">
                <swiper-item>
                    <img class="slide-image" mode="aspectFit" 
                    @click="bookDetail(img)"
                    :key="img.id"
                    v-for="img in top"
                    :src="img.image">
                </swiper-item>
            </div>
        </swiper>
    </div>
</template>
<script>
export default {
    props: ['tops'],
    computed: {
        // 将传过来的9个图书数据分割成3个数组
        imgUrls(){
            // 如果通用 可以用chunk函数 如loadash的chunk方法
            let res = this.tops
            return  [res.slice(0, 3), res.slice(3, 6), res.slice(6)]
        }
    },
    methods: {
        bookDetail(item){
            wx.navigateTo({
                url: '/pages/detail/main?id=' + item.id
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.swiper{
    margin-top: 5px;
    .slide-image{
        width: 33%;
        height: 250rpx;
    }
}
</style>



