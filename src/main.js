import App from './App.svelte';
import {weather_key} from './api-keys.js';

let api_url = "https://api.openweathermap.org/data/2.5/onecall?lat=-40.35&lon=175.62&units=metric&appid=" + weather_key

const app = new App({
	target: document.body,
	props: {
		api_url: api_url
	}
});

export default app;