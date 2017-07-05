<template>
	<div class="page">
		<div class="container register" @keyup.enter="register">
			<div class="title">
				<h2>Register here</h2>
			</div>
			<div class="wrap">
				<input type="text" placeholder="name" v-model="name">
			    <input type="text" placeholder="password" v-model="pwd">
				<input type="text" placeholder="password" v-model="pwd2">
				<input type="text" placeholder="email" v-model="email">
				<input type="text" placeholder="telephone" v-model="telephone">
		        <p class="right" @click="visitorIn">as a visitor?</p>
		        <button @click="register"><i class="fa fa-registered"></i> Register</button>
		        <hr>
		        <div class="signIn">
		        	have an account yet?<br/>
		        	<router-link to="/login">
			            <a href="#" @click="signIn">
			                sign in here
			            </a>
			        </router-link>
		        </div>
			</div>	
		</div>	 	
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				pwd : '',
				name : '',
				pwd2 :'',
				email:'',
				telephone:'',
			}
		},
		methods : {
			visitorIn : function() {
				this.$router.push("/gallery/visitor");
				console.log('游客登陆');
			},
			register : function() {
				if(this.pwd == '' || this.name == '' || this.pwd2 == '' || this.email == ''|| this.telephone == '') {
					alert('请填写所有字段!');
				}
				else if(this.pwd !== this.pwd2){
				    alert('前后密码不一致');
				}
				else if( !(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(this.email))){
                    alert('邮箱格式不对');
				}
                else if( !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.telephone))){
                    alert('电话格式不对');
                }
				else {
					var _this = this;
					var params = { name : this.name,pwd : this.pwd,email : this.email,telephone : this.telephone};
					var resource = this.$resource('http://localhost:3000/register');
					resource.save(params).then((response) => {
						if(response.body.code == 200) {
							alert('注册成功，自动跳转到登陆界面~');
							_this.$router.push("/login");
						}
						else {
							alert(response.body.description);
						}
					})
					.catch((response) => {
						console.log('err ' + response);
					})
				}
			},
			signIn : function() {
				console.log('转去登录界面');
			}
		}
	}
</script>

<style scoped>
	@import url("../css/font-awesome.min.css");
	@import url("../css/login.css");
</style>