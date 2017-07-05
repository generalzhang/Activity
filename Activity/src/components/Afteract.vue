<template>
    <span class="act-dec">
        <b v-if="status" class="redclass">快点编辑活动回顾</b>
        <b v-if="status == false" v-for="(imgAdd, index) in afterAct[num].actPhotoAddress">
            <img :src="imgAdd" width="40px" height="40px">
        </b>
        <b v-if="status == false">{{afterAct[num].dec}}</b>
    </span>
</template>

<script type="text/ecmascript-6">
    export default {
        name : 'afteract',
        props : ['preActOne', 'afterAct'],
        mounted : function() {
            this.checkStatus();
        },
        data () {
            return {
                status:true,
                num :0
            };
        },
        methods : {
            checkStatus: function () {
                var i=0;
                if(!this.afterAct.length){
                    this.status = true;
                }
                else{
                    for(;i<this.afterAct.length;i++){
                        if(this.afterAct[i].title == this.preActOne.title){
                            this.status = false;
                            this.num = i;
                        }
                    }
                }
                this.$emit('status',this.status)

            }
        }
    }
</script>

<style>
    .redclass{
        color: #FF3757;
    }

</style>