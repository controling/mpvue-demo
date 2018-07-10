<template>
    <div>
        <!-- :book 传数据给Card组件 -->
        <Card :key="book.id" v-for="book in books" :book="book"></Card>
        <p class="text-footer" v-if="!more">
            没有更多数据
        </p>
    </div>
</template>
<script>
// 滚动加载
// 35条数据
// 1页 0-10
// 2   11-20
// 3   21-30
// 4   31-40
// page 当前第几页

// 没有更多数据
// 1, page=0 不能显示这条提示
// 2, page>0 当前数据长度<10 停止触底加载, 显示提示

// more 是否有更多数据
// 初始化加载more为true
// page>0 当前数据长度<10 more为false

import { get } from "@/util"
import Card from "@/components/Card"
export default {
    components:{
        Card
    },
    data() {
        return {
            books: [],
            page: 0,
            more: true
        };
    },
    methods: {
        // init标识是不是初始化加载 下拉刷新,首次加载都是初始化加载
        async getList(init) {
            if(init){
                this.page = 0
                this.more = true
            }
            wx.showNavigationBarLoading()
            const books = await get("/weapp/booklist", {page: this.page})
            console.log(books)
            if(books.list.length < 10 && this.page > 0){
                this.more = false
            }

            if(init){
                this.books = books.list
                // 停止下拉刷新
                wx.stopPullDownRefresh()
            }else{
                // 下拉刷新, 不能直接覆盖books, 而是累加
                this.books = this.books.concat(books.list)
            }
            wx.hideNavigationBarLoading()
        }
    },
    onPullDownRefresh(){
        //下拉刷新
        console.log('下拉')
        this.getList(true)
    },
    onReachBottom(){
        // 下拉刷新
        if(!this.more){
            // 没有更多数据
            return false
        }
        this.page = this.page + 1
        this.getList()
    },
    mounted() {
        // 首次加载
        this.getList(true)
    }
};
</script>
<style lang="scss">

</style>

