<script>
    export let day
</script>

<div id="detailed-forecast">
	<div id="container">
		<h2>{day.weekday} {day.date}</h2>
		<div id="day">
			<img src={'images/'+ day.main_weather +'.png'} alt={day.main_weather + ' icon'}>
			<p>Forecast: {day.description}</p>
		</div>
		<div>
			<p>High: {day.high_temp}</p>
			<p>Low: {day.low_temp}</p>
			<p>Sunrise: {day.sunrise}</p>
			<p>Sunset: {day.sunset}</p>
			<p>Wind: {day.wind_speed} km/h</p>
		</div>
	</div>
</div>

<style>
    #detailed-forecast {
		background-color: rgb(233, 233, 233);
		border-radius: 10px;
		padding: 0.1em 1.5em;
		margin-top: 2em;
	}
	#container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 5em;
		margin: 0 10em;
		padding: 0 5em;
		background-color: #FBFCFF;
	}
	#day {
		text-align: right;
	}
	h2 {
		grid-column: 1/3;
		text-align: center;
	}
	img {
		width: 150px;
	}
	#day > p {
		text-transform: capitalize;
	}
</style>