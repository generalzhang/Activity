<template>
    <div>
        <div class="user-table-head">
            <span>用户名字</span>
            <span>用户联系方式</span>
            <span>用户邮箱</span>
            <span>操作</span>
        </div>

        <div class="user-table-body">
            <ul>
                <li v-for="(user, index) in usersMes">
                    <span>{{user.name}}</span>
                    <span>{{user.telephone}}</span>
                    <span>{{user.email}}</span>
                    <span><i class="fa fa-trash redclass" @click="deleteUser(user.name)">删除</i></span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        created : function() {
            this.start();
        },
        data () {
            return {
                usersMes : [
                ],
            };
        },
        methods : {
            start : function() {
                var _this = this;
                var resource = this.$resource('http://localhost:3000/getUsers');
                resource.save({}).then((response) => {
                    console.log(response.body);
                    _this.usersMes = response.body.users;
                })
                    .catch((response) => {
                        console.log('err ' + response);
                    })
            },
            deleteUser :function (name) {
                var _this = this;
                var resource = this.$resource('http://localhost:3000/deleteUser');
                resource.save({name :name}).then((response) => {
                    console.log(response.body);
                    if(response.body.code == 200){
                        alert('删除成功')
                        _this.$router.go(0);
                    }
                })
                    .catch((response) => {
                        console.log('err ' + response);
                    })
            }

        }
    }
</script>
<style>
    .user-table-head{
        display: flex;
    }
    .user-table-head span{
        flex:1;
        font-size: 20px;
        color: #172a8f;
    }
    .user-table-body ul li{
        display: flex;
        list-style: none;
        margin: 5px 0px;
        align-items: center;
    }
    .user-table-body span{
        flex:1;
        font-size: 20px;
    }
    .redclass{
        color: red;
    }
</style>