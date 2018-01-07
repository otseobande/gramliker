import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import VueMaterial from 'vue-material';
import './socket.js';

import App from './components/app.vue';
import Task from './components/task.vue';
import Home from './components/home.vue';
import CreateTask from './components/createtask.vue';
import GoPro from './components/gopro.vue';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueMaterial);

Vue.component('app', App);
   
const routes = [
	{path:"/tasks", component: Task},
	{path:"/", component: Home},
	{path:"/createtask", component: CreateTask},
	{path:"/gopro", component: GoPro},
];

const router = new VueRouter({
	routes
})

const store = new Vuex.Store({
	plugins: [createPersistedState({
		key: "state",
	})],
  
	state:{
		name: "instaliker",
		url: "https://www.instagram.com/",
		isLoggedIn: true,
		tasks: [],
		likedImagesData: [],
		likes: 0,
		currentStatus: false,
	},
	getters:{
		activeTask(state){
			let activetask;
			for(let i= 0; i < state.tasks.length; i++){
				if(state.tasks[i].active === true){
					return state.tasks[i];
				}
			};
		}, 
		likes(state){
			return state.likes;
		},
		latestLikedImages(state){
			return state.likedImagesData;
		},
		numberOfConfiguredTasks(state){
			return state.tasks.length;
		},
		proStatus(state){
			return state.proStatus;
		},
	},
	mutations:{
		addLike(state){
			state.likes++;
		},
		changeLogInStatusToTrue(state){
			state.isLoggedIn = true;
		},
		changeLogInStatusToFalse(state){
			state.isLoggedIn = false;
		},
		addTask(state,task){
			state.tasks.push(task);
		},
		removeTask(state,taskId){
			for(let i= 0; i < state.tasks.length; i++){
				if(state.tasks[i].id === taskId){
					delete state.tasks[i];
				}
			};
			state.tasks = state.tasks.filter(Boolean);
		},
		clearAllTasks(state){
			for(let i= 0; i < state.tasks.length; i++){
					delete state.tasks[i];
			};
			state.tasks = state.tasks.filter(Boolean);
		},
		toggleTask(state,taskId){
			for(let i= 0; i < state.tasks.length; i++){
				if(state.tasks[i].id === taskId){
					if(state.tasks[i].active === true){
						state.tasks[i].active = false;
						continue;
					}
					state.tasks[i].active = true;
				}else{
					state.tasks[i].active = false;
				}
			};
			Socket.postMessage("refresh");
		},
		
	},

	actions:{
		updateLogInStatus({commit}){
			chrome.cookies.get({
						url: "https://www.instagram.com",
						name: "ds_user_id"
					},function(cookie){
						if(cookie){
							commit('changeLogInStatusToTrue');
						}else{
							commit('changeLogInStatusToFalse');
						}							
					})
		}
	},
})
setTimeout(()=>{
	const app = new Vue({
		router,
		store,
		methods:{

		},

		render (createElement) {
		    return createElement('app');
		},
	}).$mount('#app');
},1000);
