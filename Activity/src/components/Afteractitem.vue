<template>
    <div class="shuffling">
        <div class="fouce fl">
            <div class="focus">
                <ul class="showimg">
                    <template v-for='(photo, index) in actPhotoAddress'>
                        <li v-if='shufflingId==index' @mouseover='showPreNext' @mouseout='hiddenPreNext'>
                            <a target="_blank" class="img"><img :src="photo"/></a>
                        </li>
                    </template>
                </ul>
                <div class='bullet-pagination'>
                    <a class="bullet" :class="{'active': shufflingId==0}" @click='bulletFunOne'></a>
                    <a class="bullet" :class="{'active': shufflingId==1}" @click='bulletFunTwo'></a>
                    <a class="bullet" :class="{'active': shufflingId==2}" @click='bulletFunThree'></a>
                </div>
                <i v-show='PreNext' class="preNext pre fa fa-chevron-left" @mouseover='showPreNext' @mouseout='hiddenPreNext' @click='preFun'></i>
                <i v-show='PreNext' class="preNext next fa fa-chevron-right" @mouseover='showPreNext' @mouseout='hiddenPreNext' @click='nextFun'></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props : ['actPhotoAddress'],
        components: {
        },
        ready: function() {
            var _this=this;
            var timer = setInterval(function() {
                if(_this.shufflingId>=0&&_this.shufflingId<_this.actPhotoAddress.length-1){
                    _this.shufflingId=parseInt(_this.shufflingId)+1;
                }
                else if (_this.shufflingId==_this.actPhotoAddress.length-1) {
                    _this.shufflingId=0;
                }
            }, 5000)
        },
        methods: {
            bulletFunOne:function(){
                this.shufflingId=0;
            },
            bulletFunTwo:function(){
                this.shufflingId=1;
            },
            bulletFunThree:function(){
                this.shufflingId=2;
            },
            showPreNext:function(){
                this.PreNext=true;
            },
            hiddenPreNext:function(){
                this.PreNext=false;
            },
            preFun:function(){
                var _this=this;
                if(_this.shufflingId>0&&_this.shufflingId<_this.actPhotoAddress.length){
                    _this.shufflingId=parseInt(_this.shufflingId)-1;
                }
            },
            nextFun:function(){
                var _this=this;
                if(_this.shufflingId>=0&&_this.shufflingId<_this.actPhotoAddress.length-1){
                    _this.shufflingId=parseInt(_this.shufflingId)+1;
                }
            }
        },
        data() {
            return {
//                actPhotoAddress:['/src/assets/port4.jpg','/src/assets/port5.jpg','/src/assets/port14.jpg'],
                shufflingId:0,
                PreNext:false
            }
        }
    }
</script>

<style scoped>
    .fouce {
        position: relative;
        overflow: hidden;
        height: 300px;
        width: 400px;
    }
    .fl {
        float: left;
    }
    .focus{
        overflow: hidden;
    }
    .fouce ul {
        position: absolute;
    }
    .fouce ul li {
        float: left;
        margin: 0;
    }
    .fouce ul li a.img {
        display: block;
        height: 300px;
    }
    .showimg{
        width:1440px;
        left:-0px;
    }
    .showimg img {
        display: block;
        width:400px;
        height:300px;
    }
    .fouce .bullet-pagination {
        position: absolute;
        bottom: 5px;
    }
    .bullet-pagination {
        width: 100%;
        text-align: center;
        padding-top: 16px;
        clear: both;
        overflow: hidden;
    }
    .bullet {
        display: inline-block;
        background: #fff;
        width: 12px;
        height: 12px;
        border-radius: 6px;
        -webkit-border-radius: 6px;
        margin-right: 5px;
        opacity: 0.8;
        -webkit-transition: opacity 0.8s linear;
        -moz-transition: opacity 0.8s linear;
        -ms-transition: opacity 0.8s linear;
        -o-transition: opacity 0.8s linear;
        transition: opacity 0.8s linear;
    }
    .bullet.active {
        background: #007cdb;
        opacity: 1;
        cursor: pointer;
    }
    .preNext {
        display: block;
        width: 31px;
        height: 41px;
        font-size: 30px;
        position: absolute;
        top: 150px;
        cursor: pointer;
    }
    .next {
        right: -10px;
    }
    * {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    a{
        text-decoration: none;
    }
</style>