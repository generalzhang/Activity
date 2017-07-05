<template>
    <transition name="funding" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div class="editact-mask">
            <div class="editact-wrapper">
                <div class="funding-container">
                    <div class="pay-title">
                        <span>支付宝扫码支持</span>
                        <span>微信扫码支持</span>
                    </div>
                    <div class="pay-photo">
                        <img :src="aliPayAddress" width="200px" height="200px">
                        <img :src="weiPayAddress" width="200px" height="200px">
                    </div>

                    <div class="editact-footer">
                        <button class="editact-button" @click="cancel">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        name : 'funding',
        props : ['aliPayAddress','weiPayAddress'],
        // mounted : function() {
        // 	console.log(this.$store.state.count);
        //  },
        data () {
            return {


            };
        },
        methods : {
            cancel : function() {
                this.$emit('close', '');
            }

        }
    }
</script>

<style>
    @import url("../css/editact.css");
    .pay-title{
        width: 100%;
        display: flex;
    }
    .pay-title span{
        flex:1;
        text-align: center;
        color: #1C93D6;
    }
    .pay-title span:nth-child(2){
        flex:1;
        text-align: center;
        color: #4DB9A3;
    }
    .pay-photo img{
        margin: 0 22px;
    }
</style>
