<template>
	<div class="intro-wrap">
		<div class="admin-bar">
			<span><i class="fa fa-users" @click ="toUser()">用户管理</i></span>
			<span><i class="fa fa-flag" @click ="toAct()">活动管理</i></span>
			<span><i class="fa fa-envelope-open" @click ="toComplain()">举报查看</i></span>
		</div>
		<hr>
		<div>
			<transition mode="out-in" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight">
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">

	export default {
		components : {
		},
		mounted : function() {
		},
		computed: {
		},
		data () {
			return {
			}
		},
		methods : {
			toUser :function () {
               var route = '/gallery/' + this.$route.params.name+ '/admin/user' ;
               this.$router.push(route);
            },
            toAct :function () {
                var route = '/gallery/' + this.$route.params.name+ '/admin/act' ;
                this.$router.push(route);
            },
            toComplain :function () {
                var route = '/gallery/' + this.$route.params.name+ '/admin/complain' ;
                this.$router.push(route);
            }
		}
	}
</script>

<style>
	@import url("../css/font-awesome.min.css");
	@import url("../css/introduction.css");
	.admin-bar span{
		cursor: pointer;
		font-weight: bold;
		font-size: 30px;
		color: #1C93D6;
	}
	.admin-bar span:nth-child(2){
		color: #4DB9A3;
	}
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