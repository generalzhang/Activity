<template>
    <div>
        <div class="user-table-head">
            <span>用户名字</span>
            <span>联系电话</span>
            <span>举报活动</span>
            <span>举报内容</span>
        </div>

        <div class="user-table-body">
            <ul>
                <li v-for="(complain, index) in complainMes">
                    <span>{{complain.username}}</span>
                    <span>{{complain.telephone}}</span>
                    <span>{{complain.actname}}</span>
                    <span>{{complain.dec}}</span>
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
                complainMes : [
                ],
            };
        },
        methods : {
            start : function() {
                var _this = this;
                var resource = this.$resource('http://localhost:3000/getComplain');
                resource.save({}).then((response) => {
                    console.log(response.body);
                    _this.complainMes = response.body.complain;
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