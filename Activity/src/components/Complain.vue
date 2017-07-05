<template>
    <div class="page">
        <div class="container">
            <div class="title">
                <h2>Complain</h2>
            </div>
            <div class="wrap" @keyup.enter="complainIn">
                <input type="text" placeholder="活动名字" v-model="actname">
                <input type="text" placeholder="联系电话" v-model="telephone">
                <textarea name="dec" placeholder="投诉内容" v-model="dec">投诉内容</textarea>
                <p class="right" @click="back">back?</p>
                <button @click="complainIn"><i class="fa fa-registered"></i> COMPLAIN</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { mapGetters } from 'vuex'

    export default {
        data () {
            return {
                actname : '',
                dec : '',
                telephone:'',
                username:this.$route.params.name
            }
        },
        computed :
            mapGetters([
                'doneTodos',
                'doneTodosLength'
            ]),
        methods: {
            complainIn : function() {
                var _this = this;
                var param = {username : this.username,dec : this.dec,actname:this.actname,telephone:this.telephone};
                if(this.dec == '' || this.telephone == '' || this.username == ''|| this.actname == '') {
                    alert('请填写所有字段!');
                }
                else if( !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.telephone))){
                    alert('电话格式不对');
                }
                else {
                    var resource = this.$resource('http://localhost:3000/uploadComplain');
                    resource.save(param).then((response) => {
                        if (response.body.code == 200) {
                            alert('投诉成功');
                            this.$router.push('/gallery/' + _this.username);
                        }
                    })
                        .catch(function (response) {
                            console.log('err' + response)
                        })
                }
            },
            back : function () {
                this.$router.push('/gallery/');
            }
        }
    }
</script>

<style>
    @import url("../css/font-awesome.min.css");
    @import url("../css/login.css");
</style>