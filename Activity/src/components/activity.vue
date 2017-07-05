<template>
    <div class="activity-container">
        <div class="gallery-title">
            <div>> 全部活动</div>
            <div>
                <input class="search-input" type="text" placeholder="搜索" v-model="searchkey">
                <i class="fa fa-search" @click="searchAct(searchkey)"></i>
            </div>
        </div>
        <hr>
        <div id="activity">
            <ul>
                <li v-for="(activity, index) in activityMes">
                    <figure class="activity-item">
                        <div class="act-title">{{activity.title}}</div>
                        <div class="photo-wrap">
                            <img :src="activity.actPhotoAddress" :width="width" :height="height" class="status-photo">
                        </div>
                        <div class="intro">{{activity.dec}}</div>
                        <div class="operation">
                            <span>{{activity.time}}</span>
                            <i class="fa fa-heart" @click="addLike(index)" v-if="activity.like"></i>
                            <i class="fa fa-heart-o" @click="addLike(index)" v-else></i>
                            <span><strong>{{ activity.activityLike }}</strong> Likes</span>
                            <i class="fa fa-bars" @click="openDetail"></i>
                            <span @click="openDetail(index)">详请</span>
                            <i class="fa fa-usd" @click="contribute"></i>
                            <span @click="contribute(index)"> 支持一下</span>
                        </div>
                        <processbar :type="infoType(activity.monneyVal,activity.monneyMax)" :value="activity.monneyVal" :max="activity.monneyMax" animate="animate"></processbar>
                    </figure>
                </li>
            </ul>
        </div>
        <detail v-if="showDetail" @close="showDetail = false" :activity="detailactivity"></detail>
        <funding v-if="showPay" @close="showPay = false" :ali-pay-address="detailpay1" :wei-pay-address="detailpay2"></funding>
    </div>
</template>

<script type="text/ecmascript-6">
    import Detail from './Detail.vue'
    import Funding from './Funding.vue'
    import processbar from './processbar.vue'
    export default {
        props : ['imgWidth', 'imgHeight'],
        components : {
            Detail,
            Funding,
            processbar
        },
        created : function() {
            this.start();
        },
        data () {
            return {
                showDetail : false,
                showPay:false,
                detailactivity : {},
                detailpay1:'',
                detailpay2:'',
                width : this.imgWidth || '400px',
                height : this.imgHeight || '273px',
                activityMes : [
                ],
                actStatus:'',
                searchkey:''
            };
        },
        methods : {
            checkStatus :function (time) {
                var now = new Date()
                console.log(time);
                var status = 'before';
                if(now.toDateString() == new Date(time).toDateString()){
                    status = 'now';
                }
                else if (new Date(new Date(time).toDateString())>new Date(now.toDateString())){
                    status = 'after';
                }
                return status;
            },
            addLike : function(index) {
//                console.log(this.$route.params);
                if(this.$route.params.name == 'visitor') {
                    this.$router.push('/login');
                }
                else {
                    if(this.activityMes[index].like) {
                        this.activityMes[index].activityLike -= 1;
                    }
                    else {
                        this.activityMes[index].activityLike += 1;
                    }
                    this.activityMes[index].like = !this.activityMes[index].like;
//                    var resource_1 = this.$resource('http://localhost:3000/addLike');
//                    var params_1 = {id : this.activityMes[index].id, likeNum: this.activityMes.likeNum};
//                    resource_1.save(params_1).then((response) => {
//                        if(response.body.code != 200) {
//                            alert(response.body.description);
//                        }
//                    })
//                        .catch((response) => {
//                            console.log('err ' + response);
//                        })
                    var resource = this.$resource('http://localhost:3000/changeLikeNum');
                    var params = {id : this.activityMes[index].id, likeNum : this.activityMes[index].activityLike,like :this.activityMes[index].like};
                    resource.save(params).then((response) => {
                        if(response.body.code != 200) {
                            alert(response.body.description);
                        }
                    })
                        .catch((response) => {
                            console.log('err ' + response);
                        })
                }
            },
            openDetail : function(index) {
                if(this.$route.params.name == 'visitor') {
                    this.$router.push('/login');
                }
                else {
                    this.showDetail = true;
                    this.detailactivity = this.activityMes[index];
                }
            },
            contribute : function(index) {

                this.showPay = true;
                this.detailpay1 = this.activityMes[index].aliPayAddress;
                this.detailpay2 = this.activityMes[index].weiPayAddress;

            },
            infoType : function (val,max) {
                var i = parseInt(val *100 / max,10);
                console.log(i);
                if(i<11){
                    return'1';
                }else if(i<31){
                    return'2';
                }else if(i<51){
                    return'3';
                }else if(i<71){
                    return'4';
                }else if(i<101){
                    return'5';
                }
            },
            searchAct : function (searchkey) {
                this.$router.push('/gallery/'+this.$route.params.name+'?key='+searchkey);
                this.$router.go(0);
            },
            routeToIntroduction: function(name) {
                this.showDetail = false;
                this.$emit('routeToIntroduction', name);
            },
            start : function() {
                var _this = this;
                var params = {};
                if(this.$route.query.key) {
                    params = {title: this.$route.query.key};
                }
                var resource = this.$resource('http://localhost:3000/getactivity');
                resource.save(params).then((response) => {
                    console.log(response.body);
                    _this.activityMes = response.body.activity;
                    for(var i in _this.activityMes) {
//                        _this.activityMes[i].like = false;
                        _this.activityMes[i].activityLike = Number(_this.activityMes[i].likeNum);
//                        _this.activityMes[i].activityComment = Number(_this.activityMes[i].activityComment);
                        var acttime = _this.activityMes[i].time;
                        _this.activityMes[i].actStatus = _this.checkStatus(acttime);

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
    @import url("../css/jquery.fancybox.css");
    @import url("../css/font-awesome.min.css");
    @import url(http://fonts.googleapis.com/css?family=Ruda:400,700,900);
    * {
        font-family: 'Ruda', 'Microsoft Yahei', 'Arial', sans-serif;
    }
    .gallery-title {
        text-align: left;
    }
    #activity ul li {
        display: inline-block;
        list-style: none;
        margin: 10px;
    }
    #activity {
        text-align: left;
        margin-left: 1%;
    }
    .operation {
        text-align: left;
        color: #000;
    }
    .operation i {
        cursor : pointer;
        color : #FF3757;
        margin-left : 20px;
    }
    .operation span {
        cursor: pointer;
    }
    .activity-item img {
        cursor : zoom-in;
    }
    .gallery-title {
        margin-bottom: 16px;
        font-size: 22px;
        color: #797C8B;
    }
    .intro{
        width: 400px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size: 15px;
        color: #797C8B;
    }
    .act-title{
        text-align: center;
        font-size: 18px;
        color: #e1960e;
    }
    .star-word{
        float:left;
    }
    .three-circle-before span{
        border:1px solid #4DB9A3;
        border-radius: 50% 50%;
        background-color: #4DB9A3;
        font-size: 20px;
    }
    .three-circle-ing span{
        border:1px solid #1C93D6;
        border-radius: 50% 50%;
        background-color: #1C93D6;
        font-size: 20px;
    }
    .three-circle-after span{
        border:1px solid #CAA23D;
        border-radius: 50% 50%;
        background-color: #CAA23D;
        font-size: 20px;
    }
    .search-input{
        border-style:none;
        border-bottom-style:solid;
        border-bottom-width:thin;
        border-bottom-color:#4D4D4D;
        height:30px;
    }

</style>