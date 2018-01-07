<template>
	<div class="container">
				<md-button @click.prevent="addTask" class="md-raised md-primary">Save</md-button>
				<router-link to="/tasks" tag="md-button" class="md-raised md-accent" style="float: right;">Cancel</router-link>
			<md-layout md-align="center">
				<md-whiteframe  class="form-space">
					<div>			
						<form class="">
							<md-input-container>
								<label>Tag</label>
								<md-input v-model="tag" placeholder="#tag"></md-input>
							</md-input-container>
							<md-input-container>
								<label>Likes per day</label>
								<md-input type="number" v-model.number="likesPerDay"></md-input>
							</md-input-container>
						</form>
					</div>
				</md-whiteframe>
			</md-layout>
	</div>
</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex';

export default{
	data(){
		return{
			tag:"",
			likesPerDay: 0,
			active: false, 
		} 
	},

	methods: {
		...mapMutations([
			'addTask','toggleTask'
		]),
		addTask(){
			if(this.likesPerDay > 800){
				if(!this.proStatus){
					this.likesPerDay = 800;
				}
			}
			this.$store.commit('addTask',this.task);
			this.$store.commit('toggleTask',this.task.id);
			location.href = "#/tasks";
		}
	},

	computed:{
		...mapGetters([
			'proStatus',
		]),
		task(){
			return{
				id: Math.floor(Math.random()*899999+100000),
				tag: this.tag,
				likesPerDay: this.likesPerDay,
				active: this.active,
			}
		}
	}
}
</script>

<style scoped>
</style>