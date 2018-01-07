<template>
	<div class="container">
		<div v-if="numberOfConfiguredTasks">
			<div v-if="activeTask">
				<h2 class="main-title">GramLiker</h2>
				<div class="heart-shape beat"></div><br/>
				<div class="like-info">
					<div>Liking <b>{{activeTask.tag}}</b></div>
					<div>{{likes}} images liked</div>
				</div>
				<div class="liked-images-section">
					<div class="inner-container">
						<div v-for="img in latestLikedImages" class="img-container">
							<img @click="newTab(img.page)" :src="img.imgUrl" class="pic">
						</div>
					</div>
				</div>
				<div style="font-size: 11px; text-align: center;">Instaliker would like images in the background</div>
			</div>
			<div v-else style="padding-top:80px;">
				<h2 class="main-title">Instaliker</h2>
				<div class="heart-shape"></div><br/>
				<div class="like-info">
					<div>No task activated</div>
					<div>{{likes}} images liked</div>
				</div>
			</div>
		</div>
		<div v-else style="padding-top:80px;">
			<h2 class="main-title">Instaliker</h2>
			<div class="heart-shape"></div><br/>
			<div class="like-info">
				<div>No task configured</div>
				<div>Click the Task Tab to Configure Tasks</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default{
	data(){
		return {
			
		}
	},
	methods:{
		newTab(link){
			chrome.tabs.create({url: link})
		},
	},
	computed:{
		tasks(){
			return this.$store.state.tasks;
		},
		likedImages(){

		},
		...mapGetters([
				'activeTask','likes', 'latestLikedImages','numberOfConfiguredTasks'
			]),

	},

}
</script>

<style scoped>
.img-container:hover img {

	transform: scale(.5);

}

.img-container img:hover {

	transform: scale(1.25);

}
.img-container img {

	transition: transform .25s ease;

}


</style>