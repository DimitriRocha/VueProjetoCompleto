import Vue from "vue";
import axios from "axios";
import router from "../router";

const state = {
	currentUser: null
};

const getters = {
	loggedIn(state) {
		return state.currentUser != null;
	},
	getUserName(state) {
		if (state.currentUser) {
			return state.currentUser.username;
		}else{
			return;
		}
	},
	getCompanyId(state) {
		return state.currentUser.empresaId;
	},
	isAdmin(state){
		if(state.currentUser.role == "Admin"){
			return true;
		}
		return false;
	},
	isCompanyAdmin(state){
		if(state.currentUser.role == "CompanyAdmin"){
			return true;
		}
		return false;
	},
	isCompanyUser(state){
		if(state.currentUser.role == "CompanyUser"){
			return true;
		}
		return false;
	}
};

const mutations = {
	setUser(state, user) {
		state.currentUser = user;
	},
	setUserNull(state) {
		state.currentUser = null;
	}
};

const actions = {
	async login(context, data) {
		try {
			const response = await axios.post(`${Vue.prototype.$api}/authentication/login`,
				{
					username: data.login.value,
					password: data.senha.value,
				},
				{
					withCredentials: true
				}
			);

			context.commit("setUser", response.data);

			return response;
		} catch (error) {
			console.log(error);
			context.commit("setUserNull");
		}
	},
	async logout(context) {
		try {
			const response = await axios.post(
				`${Vue.prototype.$api}/authentication/logout`,
				{

				},
				{
					withCredentials: true
				}
			);

			context.commit("setUser", response.data);

			return response;
		} catch (error) {
			console.log(error);
			context.commit("setUserNull");
		}
	},
	async checkAuth(context) {
		try {
			const response = await axios.get(
				`${Vue.prototype.$api}/authentication`,
				{
					withCredentials: true
				}
			);

			context.commit("setUser", response.data);

			return response;
		} catch (error) {
			context.commit("setUserNull");
		}
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};
