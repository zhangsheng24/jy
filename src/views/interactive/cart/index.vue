<template>
    <div class="cart_wrap">111</div>
</template>
<script>
import api from '@/api'
import { LgetItem, LsetItem } from "@/utils/storage";
export default {
    data(){
        return{

        }
    },
    created(){
        this.getListAll()
    },
    methods:{
        getListAll(){
            api('cart.listAll',{
                activityId:LgetItem('currentOptionId')
            }).then(res=>{
                console.log(res)
            })
        }
    }
}
</script>
