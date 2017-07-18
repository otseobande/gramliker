<template>
	<div id="app" class="container">
		<div v-if="isLoggedIn">
			<p>Tests</p>
		</div>
		<div v-else>{{newTab()}}</div>
	</div>
</template>

<script>
    export default {
	  data: function(){
	  	return {
	  			isLoggedIn: false,	  		  
	  		}	
	  	},

	  methods:{
		updateLoggedInStatus: function(){
			let self = this;

			chrome.cookies.get({
						url: "https://www.instagram.com",
						name: "ds_user_id"
					},function(cookie){
						self.isLoggedIn = false;
						if(cookie){
							self.isLoggedIn = true;
						}							
					})
			},

			newTab: function(){
				chrome.tabs.create({
					url: "https://www.instagram.com",
				})
			}


		},	
    }
</script>


<style  scoped>
.container{
	padding: 10px;
	height: 400px;
	width: 300px;
}
</style>