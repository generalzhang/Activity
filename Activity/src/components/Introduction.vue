<template>
	<div class="intro-wrap">
		<div class="introlist">
			<div class="userlist">
				<span>lijun</span>
				<span>个人中心</span>
			</div>
			<div class="actlist">
				<div>
					<span>{{allCount}}</span>
					<span>共计</span>
				</div>
				<div>
					<span>{{allIng}}</span>
					<span>进行中</span>
				</div>
				<div>
					<span class="redclass">{{allnoFin}}</span>
					<span>完成未编辑</span>
				</div>
			</div>
		</div>
		<div class="newAct">
			<span>Activity</span>
			<i class="fa fa-plus-square" @click="newPre"></i>
		</div>
		<hr>
		<div>
			<div class="act-table-head">
				<span>id</span>
				<span>活动名称</span>
				<span>活动状态</span>
				<span>活动详情</span>
				<span>活动回顾</span>
				<span>操作</span>
			</div>
			<div class="act-table-body">
				<ul>
					<li v-for="(preActOne, index) in preAct">
						<span>{{preActOne._id}}</span>
						<span>{{preActOne.title}}</span>

						<span v-if="checkStatus(preActOne.time)=='活动前'" class ="greenclass">活动前</span>
						<span v-if="checkStatus(preActOne.time)=='活动中'" class ="blueclass">活动中</span>
						<span v-if="checkStatus(preActOne.time)=='活动结束'" class ="redclass">活动结束</span>

						<span class="act-dec">
							<img :src="preActOne.actPhotoAddress" width="40px" height="40px">
							{{preActOne.dec}}
						</span>

						<span v-if="checkStatus(preActOne.time)=='活动前'" class ="greenclass">敬请期待</span>
						<span v-if="checkStatus(preActOne.time)=='活动中'" class ="blueclass">快去现场瞅瞅</span>
						<span v-if="checkStatus(preActOne.time)=='活动结束'&& !afterAct.length" class ="redclass">赶紧去编辑</span>
						<afteract v-if="checkStatus(preActOne.time)=='活动结束' && afterAct.length" :preActOne="preActOne" :afterAct ="afterAct" @status="changeStatus"></afteract>

						<span>
							<i class="fa fa-file-text blueclass" @click="editPre(preActOne)">初始</i>
							<i v-if="checkStatus(preActOne.time)=='活动结束'" class="fa fa-plus-square-o greenclass" @click="newAfter(preActOne.title)" >回顾</i>
							<i v-if="checkStatus(preActOne.time)=='活动结束' && afterStatusArr[index] == false" class="fa fa-files-o orangeclass" @click="editAfterAct(preActOne.title)" >回顾</i>
						</span>
					</li>
				</ul>
			</div>
		</div>
		<editperson v-if="showPerson" @close="changeperson" :person-name="personName" :person-motto="personMotto" :person-sex="personSex" :person-birth="personBirth" :person-avatar="personAvatarNum"></editperson>
		<editact v-if="showEditAct" @close="closeEditAct" @new="$router.go(0)" :pre-act-one ="preActivity"></editact>
		<editafter v-if="showEditAfter" @close="closeEditAfter" @new="$router.go(0)" :after-act-one ="afterActivity"></editafter>
	</div>
</template>

<script type="text/ecmascript-6">
	import Photo from './Photo.vue'
	import Socialrelations from './Socialrelations.vue'
	import Editperson from './Editperson.vue'
    import Editact from './Editact.vue'
	import Afteract from './Afteract.vue'
	import Editafter from './Editafter.vue'

	export default {
		name : 'introduction',
		components : {
			Photo,
			Editperson,
			Editact,
			Afteract,
			Editafter
		},
		mounted : function() {
			this.startComponent();
		},
		computed: {
		},
		data () {
			return {
			    name:'lijun',
				imgWidth : '360px',
				imgHeight : '250px',

				showModal : false,
				showPerson : false,
                showEditAct : false,
                showEditAfter:false,

				allCount:0,
				allIng:0,
                allEditAfter:0,
				allnoFin:0,

                preAct : [],
                afterAct: [],

                statusClass:'greenclass',
                preActivity:{
                },
				afterActivity:{
				},
				afterStatusArr:[]
			}
		},
		methods : {
			startComponent : function() {
				var _this = this;
                var resource = this.$resource("http://localhost:3000/getAllCount");
                resource.save({username : this.$route.params.introductionId}).then((response) => {
                    if(response.body.code == 200) {
                        _this.allEditAfter = response.body.allEditAfter;
                        _this.allnoFin = response.body.noFin;
                        _this.allIng =response.body.allIng;
                        _this.allCount =response.body.allCount;
                    }
                    else {
                        _this.allCount = 999;
                    }
                })
                var resource_2 = this.$resource('http://localhost:3000/getUserEditAfter');
					resource_2.save({ username : this.$route.params.introductionId}).then((response) => {
						_this.afterAct = response.body.afterAct;
					})
                    .catch((response) => {
                        console.log('err ' + response);
                    })

				var resource_3 = this.$resource('http://localhost:3000/getUserAllAct');
				resource_3.save({ username : this.$route.params.introductionId}).then((response) => {
					_this.preAct = response.body.preAct;
				})
				.catch((response) => {
					console.log('err ' + response);
				})

			},
			toIntroduction : function(userId) {
				var route = '/gallery/' + this.$route.params.userId + '/introduction/' + userId;
				this.$emit('closeMesBox');
				this.showModal = false;
				this.$router.push(route);
			},
            closeEditAct :function () {
				this.showEditAct = false;
				this.preActivity ={};
            },
            closeEditAfter :function () {
                this.showEditAfter = false;
                this.AfterActivity ={};
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
            changeStatus:function (status) {
			    this.afterStatusArr.push(status);
            },
            newPre: function () {
                this.showEditAct = true;
                var act = {};
                this.readPreActOne(act);
            },
            editPre :function (preActOne) {
				this.showEditAct = true;
				this.readPreActOne(preActOne);
            },
            newAfter: function (title) {
                this.showEditAfter = true;
                var after = {
                    _id:'',
                    title:title,
					dec:'',
                    actPhotoAddress:['','','']
				};
                this.readAfterActOne(after);
            },
            editAfterAct :function (title) {
			    var i =0;
                this.showEditAfter = true;
                if(this.afterAct.length){
                    for(;i<this.afterAct.length;){
                        if(title == this.afterAct[i].title) {
                            this.readAfterActOne(this.afterAct[i]);
                            console.log(i);
                        }
                        i++;
					}
				}else{
                    return;
				}
            },
			//取得初始项目的内容
            readPreActOne : function (preActOne) {
				this.preActivity = preActOne;
            },

            readAfterActOne : function (AfterActOne) {
                this.afterActivity = AfterActOne;
            },
			getNowFormatDate : function() {
			    var date = new Date();
			    var seperator1 = "-";
			    var seperator2 = ":";
			    var month = date.getMonth() + 1;
			    var strDate = date.getDate();
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			    }
			    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
			            + " " + date.getHours() + seperator2 + date.getMinutes()
			            + seperator2 + date.getSeconds();
			    return currentdate;
			}
		},
		watch : {
			'$route' : 'startComponent'
		}
	}
</script>

<style>
	@import url("../css/font-awesome.min.css");
	@import url("../css/introduction.css");
	.act-table-head{
		display: flex;
	}
	.act-table-head span{
		flex:1;
	}
	.act-table-head span:nth-child(4){
		flex:2;
	}
	.act-table-head span:nth-child(5){
		flex:2;
	}
	.act-table-body ul li{
		display: flex;
		list-style: none;
		margin: 5px 0px;
		align-items: center;
	}
	.act-table-body span{
		flex:1;
	}
	.act-table-body span:last-child{
		cursor: pointer;
	}
	.act-table-body span:last-child i{
		font-weight: bold;
		font-size:18px;
	}
	.act-table-body .act-dec{
		flex: 2;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		color: #6BAFE1;
	}
	.act-table-body span:nth-child(5){
		flex:2;
	}
	.act-dec img{
		vertical-align: middle;
	}
	.greenclass{
		color: #42b983;
	}
	.blueclass{
		color: #6BAFE1;
	}
	.redclass{
		color: #FF3757;
	}
	.orangeclass{
		color: coral;
	}


</style>