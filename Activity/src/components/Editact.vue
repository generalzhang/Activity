<template>
    <transition name="editact">
        <div class="editact-mask">
            <div class="editact-wrapper">
                <div class="editact-container">
                    <div class="editact-header">
                        //编辑/新增活动
                    </div>
                    <hr>
                    <div class="editact-body">
                        <div class="editact-item">
                            <label>图片</label>
                            <img :src="actPhotoAddress" width="200px" height="100px" @click="changeAvatar">
                            <input type="file" style="display:none;" id="fileInput" @change="onFileChange('actPhoto',$event)">
                        </div>
                        <div class="editact-item">
                            <label>活动名称 </label>
                            <input type="text" v-model="title" autofocus>
                        </div>
                        <div class="editact-item">
                            <label>筹集进度</label>
                            <input  class="half-input" type="text" placeholder="当前资金" v-model="monneyVal" autofocus>/
                            <input type="text" class="half-input" placeholder="目标金额" v-model="monneyMax" autofocus>
                        </div>
                        <div class="editact-item">
                            <label>活动口号</label>
                            <input type="text" v-model="slogan">
                        </div>
                        <div class="editact-item">
                            <label>活动地点</label>
                            <input type="text" v-model="address">
                        </div>
                        <div class="editact-item">
                            <label>活动介绍 </label>
                            <textarea name="dec" cols="30" rows="4" v-model="dec"></textarea>
                        </div>
                        <div class="editact-item">
                            <label>活动日期 </label>
                            <input type="date" v-model="time">
                        </div>
                        <div class="editact-item">
                            <label>支付渠道 </label>
                            <img :src="aliPayAddress" width="40px" height="40px" @click="changeAlipay">
                            支付宝<input type="file" style="display:none;" id="alipay" @change="onFileChange('aliPay',$event)">
                            <img :src="weiPayAddress" width="40px" height="40px" @click="changeWeipay">
                            微信<input type="file" style="display:none;" id="weipay" @change="onFileChange('weiPay',$event)">
                        </div>
                    </div>
                    <div class="editact-footer">
                        <button class="editact-button" @click="cancel">关闭</button>
                        <button class="editact-button" @click="save">保存</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        name : 'editact',
        props : ['preActOne'],
        // mounted : function() {
        // 	console.log(this.$store.state.count);
        //  },
        data () {
            return {
                id:this.preActOne._id||'',
                title:this.preActOne.title||'',
                slogan:this.preActOne.slogan||'',
                dec:this.preActOne.dec||'',
                time:this.preActOne.time||'',
                address:this.preActOne.address||'',
                monneyVal:this.preActOne.monneyVal||'',
                monneyMax:this.preActOne.monneyMax||'',
                actPhotoAddress:this.preActOne.actPhotoAddress||'',
                aliPayAddress:this.preActOne.aliPayAddress||'',
                weiPayAddress:this.preActOne.weiPayAddress||'',
                like:this.preActOne.like||false,
                likeNum: this.preActOne.likeNum||0
            };
        },
        methods : {
            save : function() {
                var resource = this.$resource('http://localhost:3000/editPreAct');
                if(this.title == ''||this.slogan ==''||this.monneyVal ==''||this.monneyMax ==''||this.dec ==''||this.time==''|| this.address==''||this.actPhotoAddress==''||this.aliPayAddress==''||this.weiPayAddress==''){
                    alert('信息填写不全');
                }
                else {
                    var params = {
                        _id:Number(this.id),
                        username:this.$route.params.introductionId,
                        title: this.title,
                        slogan: this.slogan,
                        dec: this.dec,
                        time: this.time,
                        address: this.address,
                        monneyVal:this.monneyVal,
                        monneyMax:this.monneyMax,
                        actPhotoAddress: this.actPhotoAddress,
                        aliPayAddress: this.aliPayAddress,
                        weiPayAddress: this.weiPayAddress,
                        like:this.like,
                        likeNum:this.likeNum
                    };

                    resource.save(params).then((response) => {
                        if (response.body.code == 200) {
                            this.$emit('new');
                        }
                        else {
                            alert('修改失败！');
                        }
                    });
                }
            },
            cancel : function() {
                this.$emit('close', '');
            },
            changeAvatar : function() {
                document.getElementById('fileInput').click();
            },
            changeAlipay : function () {
                document.getElementById('alipay').click();
            },
            changeWeipay : function () {
                document.getElementById('weipay').click();
            },
            onFileChange : function(text,e) {
                console.log(e);
                var files = e.target.files || e.dataTransfer.files;
                this.createImage(files,text);
            },
            createImage(file,text) {
                var address='';
                if(typeof FileReader === 'undefined') {
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                }
                else {
                    var vm = this;
                    var reader = new FileReader();
                    reader.readAsDataURL(file[0]);
                    reader.onload = function(e) {
                        var resource = vm.$resource('http://localhost:3000/uploadPhoto');
                        resource.save({ photoBase : e.target.result}).then((response) => {
                            console.log(text);
                            switch (text){
                                case 'actPhoto':
                                    vm.actPhotoAddress = response.body.address;
                                    break;
                                case 'aliPay':
                                    vm.aliPayAddress = response.body.address;
                                    break;
                                case 'weiPay':
                                    vm.weiPayAddress = response.body.address;
                                    break;
                            }
                            console.log(response.body.address);
                        });
                    }
                }

            },
        }
    }
</script>

<style>
    @import url("../css/editact.css");
    .editact-body .editact-item .half-input{
        width: 30%;
    }
</style>
