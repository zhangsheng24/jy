<template>
    <div>
        <date-range-picker 
            :minDate='minDate'
            :maxDate='maxDate'
            @handleConfirm='handleConfirm'
            />
    <uploader />
    </div>
</template>
<script>
import DateRangePicker from '@/components/DateRangePicker/index.vue'
import uploader from '@/components/Uploader/index.vue'
import {moment} from '@/utils/index'
export default {
    components:{
        DateRangePicker,
        uploader
    },
    created(){
        this.minDate=moment(new Date()).toDate()
        this.maxDate=moment(new Date()).add(5,'Y').toDate()
    },
    methods:{
        handleConfirm(value){
            console.log(value,'value')
        }
    }
}
</script>