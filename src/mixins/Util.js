import Vue from "vue";
import axios from "axios";
import router from "../router";

export default {
	methods: {
		//Gera a data para exibição com offset do gmt-3
		MixinUtil_CreateDate(date){
			let dt = new Date(date);
			let gmtBrDate = new Date(date).setHours(dt.getHours() - 3);
			return new Date(gmtBrDate).toLocaleString("pt-BR");
		}
	}
}
