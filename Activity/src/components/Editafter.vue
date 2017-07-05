<template>
    <transition name="editact">
        <div class="editact-mask">
            <div class="editact-wrapper">
                <div class="editact-container">
                    <div class="editact-header">
                        //编辑/新增活动回顾
                    </div>
                    <hr>
                    <div class="editact-body">

                        <div class="editact-item">
                            <label>活动名称 </label>
                            {{afterActOne.title}}
                        </div>
                        <div class="editact-item">
                            <label>图片</label>
                            <img :src="actPhotoAddress1" width="200px" height="100px" @click="changeAvatar1">
                            <input type="file" style="display:none;" id="fileInput1" @change="onFileChange('actPhoto1',$event)">

                        </div>

                        <div class="editact-item">
                            <label>图片</label>
                            <img :src="actPhotoAddress2" width="200px" height="100px" @click="changeAvatar2">
                            <input type="file" style="display:none;" id="fileInput2" @change="onFileChange('actPhoto2',$event)">
                        </div>


                        <div class="editact-item">
                            <label>图片</label>
                            <img :src="actPhotoAddress3" width="200px" height="100px" @click="changeAvatar3">
                            <input type="file" style="display:none;" id="fileInput3" @change="onFileChange('actPhoto3',$event)">
                        </div>

                        <div class="editact-item">
                            <label>活动回顾 </label>
                            <textarea name="dec" cols="30" rows="4" v-model="dec"></textarea>
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
        name : 'editafter',
        props : ['afterActOne'],
        data () {
            return {
                afterAct:this.afterActOne||{},
                id:this.afterActOne._id||'',
                title:this.afterActOne.title||'',
                dec:this.afterActOne.dec||'',
                actPhotoAddress1:this.afterActOne.actPhotoAddress[0]||'',
                actPhotoAddress2:this.afterActOne.actPhotoAddress[1]||'',
                actPhotoAddress3:this.afterActOne.actPhotoAddress[2]||'',
            };
        },
        methods : {
            save : function() {
                var resource = this.$resource('http://localhost:3000/editAfterAct');
                if(this.title == ''||this.dec ==''||this.actPhotoAddress1==''||this.actPhotoAddress2==''||this.actPhotoAddress3==''){
                    alert('信息填写不全');
                }
                else {
                    var params = {
                        _id:Number(this.id),
                        username:this.$route.params.introductionId,
                        title: this.title,
                        dec: this.dec,
                        actPhotoAddress: [this.actPhotoAddress1,this.actPhotoAddress2,this.actPhotoAddress3],
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
            changeAvatar1 : function() {
                document.getElementById('fileInput1').click();
            },
            changeAvatar2 : function() {
                document.getElementById('fileInput2').click();
            },
            changeAvatar3 : function() {
                document.getElementById('fileInput3').click();
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
                                case 'actPhoto1':
                                    vm.actPhotoAddress1 = response.body.address;
                                    break;
                                case 'actPhoto2':
                                    vm.actPhotoAddress2 = response.body.address;
                                    break;
                                case 'actPhoto3':
                                    vm.actPhotoAddress3 = response.body.address;
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
</style>