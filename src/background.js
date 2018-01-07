import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {mapMutations, mapGetters} from 'vuex';
import './socket.js';
_ = require('lodash');

window.axios = require('axios');

Vue.use(Vuex);

const store = new Vuex.Store({
	plugins: [createPersistedState({
		key: "state",
	})],

	mutations:{
		addLike(state){
			state.likes++;
			Socket.postMessage("addLike");
		},
		addLikedImageDetails(state,details){
			state.likedImagesData.push(details);
		},
		reduceLikedImagesData(state){
			state.likedImagesData = state.likedImagesData.slice(-12);
		},
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
	},
});

window.vm = new Vue({
	store,
	data:{
		baseUrl: "https://www.instagram.com",
		headers: new Headers({
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
	            'Origin': 'https://www.instagram.com',
	            'Referer': 'https://www.instagram.com/',
	            'X-Instagram-AJAX': '1',
	            'X-Requested-With': 'XMLHttpRequest',
	            'Origin': 'https://www.instagram.com',
            	'Referer': 'https://www.instagram.com/',
			}),
		fetchOptions:{
            method: 'POST',            
            credentials: "include",

		},
		mediaByTag: "",
		intervalId: null,
		num: 0,
		
	},
	methods:{
		...mapMutations([
			'addLike', 'addLikedImageDetails','reduceLikedImagesData'
		]),

		likeImageById(id){
			let self = this;
			fetch(this.baseUrl + "/web/likes/" + id + "/like/",this.fetchOptions).then(function(res){
				if(res.ok){
					self.addLike();
				}
			}).catch(function(e){
				console.log("error fetching " + e)
			})
						
		},
		setCsrfToken(){
			let self = this;
			chrome.cookies.get({
						url: "https://www.instagram.com",
						name: "csrftoken"
					},function(cookie){
						self.headers.set('X-CSRFToken', cookie.value);
						self.fetchOptions.headers = self.headers;
					});
		},
		likePostByTag(){
			let tag = this.activeTask.tag.split("#").join("");
			let tagUrl = this.baseUrl + "/explore/tags/" +tag+ "/?__a=1";
			let self = this;
			fetch(tagUrl).then(function(res){
				res.text().then(function(value){
					self.mediaByTag = JSON.parse(value);
					let nodes = self.mediaByTag.tag.media.nodes;
					for (let i = 0; i <= nodes.length - 1; i++){
						(function(ind){
							setTimeout(()=>{
								self.likeImageById(nodes[i].id);
								self.addLikedImageDetails({
									taskId: self.activeTask.id,
									tag: self.activeTask.tag,
									imgUrl: nodes[i].display_src,
									page : "https://www.instagram.com/p/" + nodes[i].code + "/",
								});
								self.reduceLikedImagesData();
							},self.afterLike() * ind);
						})(i)
					}
				})
			})
					
			
		},

		afterPage: function() {
                return 5 + Math.floor(5 * Math.random())
            },
        afterCheck: function() {
            return 500 + Math.round(500 * Math.random())
        },
        afterLike: function() {
            return 4e3 + Math.round(2e3 * Math.random())
        },

		_onBeforeSendHeaders: function(e) {
                if (e.tabId === -1) {
                    var t = _.find(e.requestHeaders, {
                        name: "Origin"
                    });
                    t && (t.value = this.baseUrl)
                }
                var n = _.find(e.requestHeaders, {
                    name: "Referer"
                });
                return n ? n.value = this.baseUrl : e.requestHeaders.push({
                    name: "Referer",
                    value: this.baseUrl
                }), {
                    requestHeaders: e.requestHeaders
                }
        },

        _onHeadersReceived: function(e) {
            return _.remove(e.responseHeaders, function(e) {
                return "x-frame-options" === e.name
            }), {
                responseHeaders: e.responseHeaders
            }
        },

        updateStoreState(){
			this.$store.commit('recieveState');
		},

		setAlarms(){
			let self = this;
			chrome.alarms.create('liking',{
				delayInMinutes: 1,
				periodInMinutes: self.afterPage(),
			})
		},
		
	},

	

	computed:{
		...mapGetters([
				'activeTask'
		]),

	},

	created(){
		let self = this;

		this.setCsrfToken();
		this.setAlarms();

		chrome.webRequest.onBeforeSendHeaders.addListener(this._onBeforeSendHeaders, {
            urls: [this.baseUrl + "/*"]
        }, ["blocking", "requestHeaders"]), chrome.webRequest.onHeadersReceived.addListener(this._onHeadersReceived, {
            urls: [this.baseUrl + "/*"]
        }, ["blocking", "responseHeaders"]);

        chrome.alarms.onAlarm.addListener((alarm)=>{
        	if (alarm.name == 'liking'){
        		console.log('alarm fired')
        		self.likePostByTag();
        	}
        })
	},

})
