import App from './App.svelte';

let api_url = "https://api.openweathermap.org/data/2.5/onecall?lat=-40.35&lon=175.62&units=metric&appid=635aae9cd780842dfe59de96b45afd1e"

const app = new App({
	target: document.body,
	props: {
		api_url: api_url
	}
});

export default app;