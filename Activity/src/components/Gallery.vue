<template>
	<div class="gallery-container">
		<div class="nav">
			<h2>大学生课外活动众筹网</h2>
			<div class="avatar" v-if="isLogin">
				<img :src="userAvatar" width="40px" height="40px" @click="topToIntroduction">
			</div>
			<!--<div class="mes" v-if="isLogin">-->
				<!--<i class="fa fa-envelope-o" @click="openMesBox"></i>-->
			<!--</div>-->
			<!--<div class="mes-box" v-show="mesBox">-->
				<!--<div class="mes-title">-->
					<!--<h4>You have {{ mesNum }} new messages</h4>-->
				<!--</div>-->
				<!--<div v-for="(item, index) in message" class="mes-item">-->
					<!--<div class="mes-avatar">-->
						<!--<img :src="item.messageAvatar" width="40px" height="40px" @click="mesToIntroduction(index)">-->
					<!--</div>-->
					<!--<div class="mes-content">-->
						<!--<span><strong>{{ item.messageName }}</strong></span>-->
						<!--<span class="mes-time"><strong>{{ item.messageTime }}</strong></span>-->
						<!--<p>{{ item.messageContent }}</p>-->
					<!--</div>-->
				<!--</div>-->
				<!--<div class="mes-more" @click="topToIntroduction">-->
					<!--See more messages-->
				<!--</div>-->
			<!--</div>-->
			<!--<span class="badge" @click="openMesBox" v-if="isLogin">{{ mesNum }}</span>-->
			<div class="front-back">
				<i class="fa fa-arrow-left" @click="$router.go(-1)"></i>
				<i class="fa fa-arrow-right" @click="$router.go(1)"></i>
			</div>
			<router-link to="/login"><button v-if="!isLogin">登录</button></router-link>
			<button v-if="isLogin" @click="unLogin">注销</button>
			<button @click="backToGallery">全部活动</button>
			<button @click="backToAfter">活动回顾</button>
			<button @click="toComplain">投诉</button>
			<input type="file" id="photo" @change="photoUpload" style="display:none;">
		</div>
		<div class="gallery-wrap">
			<transition mode="out-in" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight">
				<router-view @routeToIntroduction="toIntroduction" @closeMesBox="mesBox=false"></router-view>
			</transition>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Photo from './Photo.vue'
	import Introduction from './Introduction.vue'
	export default {
		beforeRouteEnter(to, from, next) {
			next(vm => {
				if(sessionStorage.getItem('name') == null) {
					next('/gallery/visitor');
				}
				else {
					if(sessionStorage.getItem('name') != vm.$route.params.name) {
						next('/gallery/' + sessionStorage.getItem('name'));
					}
				}
			})
		},
		created : function() {
//			var _this = this;
//			_this.getMessage();
//			setInterval(function() {
//				_this.getMessage();
//			}, 60000 * 5);
		},
		components : {
			Photo,
			Introduction
		},
		computed : {
			isLogin : function() {
				return !(this.$route.params.name == 'visitor');
			}
		},
		data () {
			return {
				userAvatar : '/src/assets/user.jpg',
				mesBox : false,
				mesNum : 0,
				lastPull : this.getNowFormatDate(1),
				message: [
					// {
					// 	useName : 'Zac Snider',
					// 	time : '2017-02-12 21:14:40',
					// 	content : 'Hi mate, how is everything.',
					// 	avatar : require('../assets/avatar2.jpg')
					// },
				],
				complainUrl:'/complain/'+this.$route.params.name
			};
		},
		methods : {
			unLogin : function() {
				this.$router.push('/gallery/visitor');
				sessionStorage.removeItem('name');
			},
			openMesBox : function() {
				this.mesBox = !this.mesBox;
				if(!this.mesBox) {
					this.message = [];
					this.mesNum = 0;
				}
			},
			mesToIntroduction : function(index) {
				this.mesBox = false;
				this.message = [];
				this.mesNum = 0;
				var route = '/gallery/' + this.$route.params.name + '/introduction/' + this.message[index].messageId;
				this.$router.push(route);
			},
			toIntroduction : function(name) {
				this.mesBox = false;
				var route = '/gallery/' + this.$route.params.name + '/introduction/' + name;
				this.$router.push(route);
			},
            toComplain : function() {
                var route = '/complain/' + this.$route.params.name ;
                this.$router.push(route);
            },
			topToIntroduction : function() {	
				this.mesBox = false;
				var route;
				if(this.$route.params.name =='admin'){
				    route = '/gallery/' + this.$route.params.name+ '/admin' ;
				}else{
                    route = '/gallery/' + this.$route.params.name + '/introduction/' + this.$route.params.name;
				}

				this.$router.push(route);
			},
			getMessage : function() {
				var _this = this;
				var resource = this.$resource('http://localhost:3000/getMessages');
				resource.save({ name : this.$route.params.name, lastPull : this.lastPull, variety : 'gallery'}).then((response) => {
					_this.message = response.body.message;
					_this.message.reverse();
					if(_this.message.length > 4) {
						_this.message.splice(4, _this.message.length - 4);
					}
					for(var i in _this.message) {
						_this.message[i].messageAvatar = require('../assets/avatar' + _this.message[i].messageAvatar + '.jpg');
					}
					_this.mesNum = _this.message.length;
					_this.lastPull = _this.getNowFormatDate();
				})
				.catch((response) => {
					console.log('err ' + response);
				})
			},
			backToGallery : function() {
				this.$router.push('/gallery/' + this.$route.params.name);
			},
            backToAfter : function() {
                this.$router.push('/gallery/' + this.$route.params.name +'/after');
            },
			getNowFormatDate : function(variety) {
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
			    if(variety == 1) {
			    	return date.getFullYear() + seperator1 + month + seperator1 + strDate
			            + " 0:0:0";
			    }
			    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
			            + " " + date.getHours() + seperator2 + date.getMinutes()
			            + seperator2 + date.getSeconds();
			    return currentdate;
			},
			uploadPhoto : function() {
				if(sessionStorage.getItem('name') != undefined) {
					document.getElementById('photo').click();
				}
			},
			photoUpload : function(e) {
				var file = e.target.files || e.dataTransfer.files;
				var reader = new FileReader();
				var vm = this;
				reader.readAsDataURL(file[0]);
				reader.onload = function(e) {
					var resource = vm.$resource('http://localhost:3000/uploadPhoto');
					resource.save({ photoBase : e.target.result }).then((response) => {
						//console.log(vm.$children);
						//vm.avatar = require('../assets/' + response.body.imgAddress + vm.$route.params.name + '.jpg');
						// vm.$children[1].start();
					})
				}
			}
		}
	}
</script>

<style>
  @import url("../css/animate.css");
  @import url("../css/font-awesome.min.css");
  @import url("../css/gallery.css");
</style>