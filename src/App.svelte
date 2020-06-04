<script>
	import DetailedSection from './Detail.svelte'

	export let api_url

	let weather = getWeatherData()
	let weather_array = [{}]

	//set detailed view to get the first day by default
	let currentSelected = 0
	$: in_depth_weather = weather_array[currentSelected]

	function getDateFromSeconds(seconds) {
		const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		
		//convert seconds to milliseconds for Date conversion
		let day = new Date(seconds*1000)

		let date = {
			day: day.getDate(),
			month: months[day.getMonth()],
			weekday: week[day.getDay()]
		}
		return date
	}

	function getTimeFromSeconds(seconds) {
		return new Date(seconds*1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
	}

	//fetch data from openweathermap
	async function getWeatherData() {
		await fetch(api_url)
		.then(r => r.json())
		.then(data => {
			weather_array = [] //reset weather_array to be empty
			for(let i=0; i < data['daily'].length; i++) {
				//convert date into human readable format
				let date = getDateFromSeconds(data['daily'][i]['dt'])
				let weather_obj = data['daily'][i]['weather'][0]
				
				//add current day to weather array
				weather_array.push({
					date: date.day + " " + date.month,
					weekday: date.weekday,
					main_weather: weather_obj.main,
					image: 'images/' + weather_obj.main + '.png',
					alt: weather_obj.main + " icon",
					description: weather_obj.description,
					high_temp: Math.round(data['daily'][i]['temp']['max']) + "°C",
					low_temp: Math.round(data['daily'][i]['temp']['min']) + "°C",
					sunrise: getTimeFromSeconds(data['daily'][i]['sunrise']),
					sunset: getTimeFromSeconds(data['daily'][i]['sunset']),
					wind_speed: Math.round(data['daily'][i]['wind_speed'] * 3.6) //convert m/s to km/h
				})
			}
			return data
		})
		.catch(err => {
			console.log(err)
		})
	}

	function showDetails(id) {
		//update detailed view
		currentSelected = id

		//remove selected class from previous clicked div
		let oldSelected = document.getElementsByClassName('selected')
		for (let i = 0; i < oldSelected.length; i++) {
			oldSelected[i].classList.remove('selected')
		}
		//add selected class to new div
		document.getElementById(currentSelected).classList.add('selected')
	}
</script>

<main>
	{#await weather}
		<h1 id="loading">Loading...</h1>
	{:then result}
		<div id="weekly-forecast">
				{#each weather_array as day, id}
					{#if id == 0}
						<div {id} class="day-card selected" on:click={function() {showDetails(id)}}>
							<div class="day-heading">
								<h3 class="title">{day.weekday}</h3>
								<h3 class="subtitle">{day.date}</h3>
							</div>
							<div class="day-body">
								<img class="card-img" src={day.image} alt={day.alt}>
								<div class="temperature">
									<i class="fas fa-thermometer-full" style="color: red"></i> {day.high_temp}
								</div>
								<div class="temperature">
									<i class="fas fa-thermometer-quarter" style="color: blue"></i> {day.low_temp}
								</div>
							</div>
						</div>
					{:else}
						<div {id} class="day-card" on:click={function() {showDetails(id)}}>
							<div class="day-heading">
								<h3 class="title">{day.weekday}</h3>
								<h3 class="subtitle">{day.date}</h3>
							</div>
							<div class="day-body">
								<img class="card-img" src={day.image} alt={day.alt}>
								<div class="temperature">
									<i class="fas fa-thermometer-full" style="color: red"></i> {day.high_temp}
								</div>
								<div class="temperature">
									<i class="fas fa-thermometer-quarter" style="color: blue"></i> {day.low_temp}
								</div>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		<DetailedSection day={in_depth_weather}/>
	{/await}
</main>

<style>
	#weekly-forecast {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		grid-gap: 5px;
	}
	.day-card {
		text-align: center;
		padding-bottom: 1em;
		background-color: #FBFCFF;
		border-radius: 10px;
	}
	.day-card:hover {
		background-color: #D0CCD0;
	}
	.card-img {
		width: 120px;
	}
	.temperature {
		padding: 5px;
		display: inline-block;
	}
	i {
		font-size: 2em;
	}
	:global(.selected) {
		background-color: #D0CCD0!important;
	}
	#loading {
		color: white;
		margin: 0 auto;
		text-align: center;
		padding: 80px;
	}
</style>