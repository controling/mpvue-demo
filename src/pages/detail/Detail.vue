<template>
    <div>{{bookid}}</div>
</template>
<script>
import {get} from '@/util'
export default {
    data(){
        return {
            bookid: ''
        }
    },
    methods:{
        async getDetail(){
            const info = await get('/weapp/bookdetail', {id: this.bookid})
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


