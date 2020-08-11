module.exports = {
	css: {
		loaderOptions: {
			sass: {
				prependData: `
				@import "@/theme/main.scss";
				`
			}
		}
	}
};
