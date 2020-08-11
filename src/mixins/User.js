import Vue from "vue";
import axios from "axios";
import router from "../router";

export default {
	methods: {
		async GetCurrentUser() {
			let response = null;
			try {
				response = await axios.get(
					`${Vue.prototype.$api}/usuarios/GetCurrent`,
					{
						withCredentials: true
					}
				);
				return response;
			} catch (e) {
				throw Error(e);
			} finally {

			}
		}
	}
}
