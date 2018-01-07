<template>
	<div class="">
		<md-whiteframe style="margin-bottom: 20px;">
			<md-toolbar class="md-dense">
				<md-layout md-align="center">
					<p>Tasks</p>
				</md-layout>
			</md-toolbar>
		</md-whiteframe>
		<div v-if="proStatus" >
		</div>
		<div v-else class="pro">
			<p>The free version is limited to 800 likes per day</p>
		</div>
		<div v-for="task in tasks" class="task" v-show="tasks.length">
			<div style="width: 280px; margin: auto;">
				<md-whiteframe style="padding: 10px;">
					<div class="taskbox-inner">
						Tag: {{task.tag}}<br/>
						Likes Per Day: {{task.likesPerDay}}
					</div>
					<div class="taskbox-inner-switch">
						<div style="display: inline" @click.prevent="toggleTask(task.id)">
							<md-switch :value="task.active" class="md-primary"></md-switch>
						</div>
						<md-button class="md-icon-button" @click="removeTask(task.id)">
							<md-icon>remove_circle_outline</md-icon>
						</md-button>
				</div>
				</md-whiteframe>
			</div>
		</div>
		<md-layout md-align="center">
			<md-button class="md-icon-button md-accent md-raised" href="#/createtask">
				<md-icon>add</md-icon>
			</md-button>
		</md-layout>
	</div>
</template>


<script>
import {mapMutations,mapGetters} from 'vuex';

export default{
	data(){
		return{
		}
	},
	methods:{
		...mapMutations([
				'addTask','removeTask','clearAllTasks','toggleTask',
			])
	},
	computed:{
		...mapGetters([
			'proStatus'
			]),
		tasks(){
			return this.$store.state.tasks;
		},

	}

}
</script>

<style>
.pro{
	text-align: center;
	font-size: 12px;

}
</style>