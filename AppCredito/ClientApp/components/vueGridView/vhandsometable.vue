<template>
     <HotTable :root="root" :settings="hotSettings">
         
     </HotTable>
</template>
 
<script>
import HotTable from 'vue-handsontable-official';
export default {
    components: {
        HotTable
    },
    props:{
        data:{
            type:Array,
            default:[]            
        }
    },
    data(){
        return{
            hotSettings: {
                data: [['sample', 'data']],
                colHeaders: true
            }
        }
    }

}
</script>
