<template>
	<div id="app">
		<div v-if="isLoggedIn">
			<div v-if="isOnline">
				<router-view></router-view>
				<md-bottom-bar md-shift>
					<md-bottom-bar-item md-icon="settings" href="#/tasks">Tasks</md-bottom-bar-item>
					<md-bottom-bar-item md-icon="home" href="#/" md-active>Home</md-bottom-bar-item>
					<md-bottom-bar-item md-icon="verified_user" href="#/gopro">Go Pro</md-bottom-bar-item>
				</md-bottom-bar>
			</div>
			<div v-else class="offline">
				<h3>No Internet connection</h3>
				<img :src="offlineImageSrc">
			</div>
		</div>
		<div v-else style="background-color: #eeeeee; height: 100%">
			<div class="logged-out">
				<div style="height: 50px;"></div>
				<md-whiteframe>
					<p>Oops..Seems you are logged out of instagram on this browser.</p>
					<p>Log In to instagram on any tab or click the button below</p>
					<md-button @click="newTab" class="md-raised md-primary">Click here to Log In</md-button>
				</md-whiteframe>
				<div style="height: 180px;"></div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex';
 export default {
 	data(){
 		return{
 			isOnline: true,
 			offlineImageSrc : "../../img/no-connection.png",
 		}
 	},

	methods: {
		updateStatus(){
			this.$store.dispatch('updateLogInStatus');
			this.isOnline = navigator.onLine;
		},
		newTab(){
			chrome.tabs.create({url: this.$store.state.instagramUrl})
		}

	},

	computed:{
		isLoggedIn(){
			return this.$store.state.isLoggedIn;
		}
	},

	created(){
		setInterval(this.updateStatus, 1000);
	}
}
</script>


<style  scoped>
.offline{
	padding-top: 50px;
	text-align: center;
	margin: auto;
	font-size: 15px;
}
.offline > img{
	height: 60px;
	width: 60px;
}
</style>