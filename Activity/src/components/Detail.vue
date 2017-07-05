<template>
	<transition name="detail" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
		<div class="detail-mask">
			<div class="detail-wrapper">
				<div class="detail-container">
					<div class="detail-header">
						<h3>活动详情</h3>
					</div>
					<div class="detail-body">
						<div class="detail-head">
							<span><i class="fa fa-calendar"></i>&nbsp;&nbsp;&nbsp;{{activity.time}}</span>
							<span><i class="fa fa-map-marker"></i>&nbsp;&nbsp;&nbsp;{{activity.address}}</span>
						</div>
						<div class="detail-img">
							<img :src="activity.actPhotoAddress" width="300px" height="200px">
						</div>
						<div class="detail-footer">
							<p>{{activity.dec}}</p>
							<span><i class="fa fa-bullhorn"></i>&nbsp;&nbsp;&nbsp;{{activity.slogan}}</span>
						</div>
					</div>
					<div class="detail-footer">
						<button class="detail-button" @click="$emit('close')">关闭</button>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	export default {
		name : 'detail',
		props : ['activity'],
		data () {
			return {

			}
		},
		methods : {

		}
	}
</script>

<style>
	@import url("../css/detail.css");
	@import url("../css/animate.css");
	.detail-head {
		display: flex;
	}
	.detail-head span:nth-child(1){
		color: #4DB9A3;
		flex: 1;
	}
	.detail-head span:nth-child(2){
		color: #b9835a;
		flex: 1;
	}
	.detail-footer p{
		word-break: break-all;
		display:-webkit-box;
		-webkit-line-clamp:10;
		-webkit-box-orient:vertical;
		overflow: hidden;

	}
	.detail-footer span{
		color: #ff1401;
		font-weight: bold;
	}
</style>