<template>
    <div class="activity-container">
        <div class="gallery-title">
            <div>> 活动回顾</div>
        </div>
        <hr>
        <div id="after-activity">
            <ul>
                <li v-for="(activity, index) in activityMes">
                    <figure class="after-activity-item">
                        <div class="act-title">{{activity.title}}</div>
                        <div class="photo-wrap">
                        <afteractitem :act-photo-address="activity.actPhotoAddress"></afteractitem>
                        </div>
                        <div class="after-intro">{{activity.dec}}</div>
                    </figure>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Afteractitem from './Afteractitem.vue'
    export default {
        components : {
            Afteractitem
        },
        created : function() {
            this.start();
        },
        data () {
            return {
                width :'400px',
                height :'273px',
                activityMes : [
                ],
            };
        },
        methods : {
            start : function() {
                var _this = this;
                var params = {};
                var resource = this.$resource('http://localhost:3000/getAfterActivity');
                resource.save(params).then((response) => {
                    console.log(response.body);
                    _this.activityMes = response.body.afterActivity;
                })
                    .catch((response) => {
                        console.log('err ' + response);
                    })
            }
        }
    }
</script>

<style scoped>
    @import url("../css/jquery.fancybox.css");
    @import url("../css/font-awesome.min.css");
    @import url(http://fonts.googleapis.com/css?family=Ruda:400,700,900);
    * {
        font-family: 'Ruda', 'Microsoft Yahei', 'Arial', sans-serif;
    }
    .gallery-title {
        text-align: left;
    }
    #after-activity ul li {
        display: inline-block;
        list-style: none;
        margin: 10px;
    }
    #after-activity {
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
    .after-activity-item img {
        cursor : zoom-in;
    }
    .gallery-title {
        margin-bottom: 16px;
        font-size: 22px;
        color: #797C8B;
    }
    .after-intro{
        width: 400px;
        height: 45px;
        word-break: break-all;
        display:-webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
        overflow: hidden;
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