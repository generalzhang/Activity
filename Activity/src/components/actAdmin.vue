<template>
    <div>
        <div class="activity-table-head">
            <span>活动名称</span>
            <span>活动详情</span>
            <span>活动状态</span>
            <span>活动回顾</span>
            <span>活动举办者</span>
            <span>举办者联系方式</span>
            <span>操作</span>
        </div>
        <div class="activity-table-body">
            <ul>
                <li v-for="(act, index) in activityMes">
                    <span>{{act.title}}</span>
                    <span class="act-dec">
                        <img :src="act.actPhotoAddress" width="40px" height="40px">
							{{act.dec}}
                    </span>
                    <span v-if="checkStatus(act.time)=='活动前'" class ="greenclass">活动前</span>
                    <span v-if="checkStatus(act.time)=='活动中'" class ="blueclass">活动中</span>
                    <span v-if="checkStatus(act.time)=='活动结束'" class ="redclass">活动结束</span>

                    <span v-if="checkStatus(act.time)=='活动前'" class ="greenclass">敬请期待</span>
                    <span v-if="checkStatus(act.time)=='活动中'" class ="blueclass">快去现场瞅瞅</span>
                    <span v-if="checkStatus(act.time)=='活动结束'&& !afterAct.length" class ="redclass">赶紧去编辑</span>
                    <afteract v-if="checkStatus(act.time)=='活动结束' && afterAct.length" :preActOne="act" :afterAct ="afterAct"></afteract>
                    <span>{{act.username}}</span>
                    <connect :username="act.username" :users="users"></connect>
                    <span><i class="fa fa-trash redclass" @click="deleteAct(act.title)">删除</i></span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue'
    Vue.component('connect', {
        props: ['username','users'],
        template: '<span>{{users[num].email}}</span>',
        data () {
            return {
                num:0
            };
        },
        created : function() {
            var i=0;
            for(;i<this.users.length;i++){
                if(this.users[i].name == this.username){
                    this.num = i;
                }
            }
        },
        methods : {

        }

    })
    import Afteract from './Afteract.vue'
    export default {
        components : {
            Afteract
        },
        created : function() {
            this.start();
        },
        data () {
            return {
                activityMes : [
                ],
                afterAct :[],
                users:[]

            };
        },
        methods : {
            start : function() {
                var _this = this;
                var resource = this.$resource('http://localhost:3000/getActandUser');
                resource.save({}).then((response) => {
                    console.log(response.body);
                    _this.activityMes = response.body.activity;
                    _this.users = response.body.users;

                })
                    .catch((response) => {
                        console.log('err ' + response);
                    })
                var resource_2 = this.$resource('http://localhost:3000/getAfterActivity');
                resource_2.save({}).then((response) => {
                    _this.afterAct = response.body.afterActivity;
                })
                    .catch((response) => {
                        console.log('err ' + response);
                    })
            },
            checkStatus :function (time) {
                var _this = this;
                var now = new Date();
                var actTime = new Date(time).getTime();
                var now2 = now.getTime();
                var status = '活动前';
                if(now.toDateString() == new Date(time).toDateString()){
                    status = '活动中';
                } else if (actTime < now2){
                    status = '活动结束';
                } else if (actTime > now2){
                    status = '活动前';
                }
                return status;
            },
            deleteAct : function (actname) {
                var _this = this;
                var resource = this.$resource('http://localhost:3000/deleteAct');
                resource.save({actname:actname}).then((response) => {
                    console.log(response.body);
                    if(response.body.code == 200){
                        alert(response.body.description);
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
    .activity-table-head{
        display: flex;
    }
    .activity-table-head span{
        flex:1;
    }
    .activity-table-head span:nth-child(2){
        flex:2;
    }
    .activity-table-head span:nth-child(4){
        flex:2;
    }
    .activity-table-body ul li{
        display: flex;
        list-style: none;
        margin: 5px 0px;
        align-items: center;
    }
    .activity-table-body span{
        flex:1;
    }
    .activity-table-body span:last-child{
        cursor: pointer;
    }
    .activity-table-body span:last-child i{
        font-weight: bold;
        font-size:18px;
    }
    .activity-table-body .act-dec{
        flex: 2;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color: #6BAFE1;
    }
    .activity-table-body span:nth-child(4){
        flex:2;
    }
    .act-dec img{
        vertical-align: middle;
    }
    .redclass{
        color: red;
    }
    .blueclass{
        color: #1C93D6;
    }
    .greenclass{
        color: #07d643;
    }

</style>