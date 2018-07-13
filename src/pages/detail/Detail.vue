<template>
    <div>
        <BookInfo :info="info"></BookInfo>
    </div>
</template>
<script>
import {get} from '@/util'
import BookInfo from '@/components/BookInfo'
export default {
    components: {
        BookInfo
    },
    data(){
        return {
            bookid: '',
            info: {}
        }
    },
    methods:{
        async getDetail(){
            const info = await get('/weapp/bookdetail', {id: this.bookid})

            // 设置导航栏标题
            wx.setNavigationBarTitle({
                title: info.title
            })

            this.info = info
        }
    },
    mounted(){
        // 获取url参数
        this.bookid = this.$root.$mp.query.id
        // 获取图书详情信息
        this.getDetail()
    }
}
</script>
<style>

</style>


