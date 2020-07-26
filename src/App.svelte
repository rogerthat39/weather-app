<script>
	import DetailedSection from './Detail.svelte'
	import WeatherCard from './Card.svelte'

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
</script>

<style>
	#weekly-forecast {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		grid-gap: 5px;
	}
	#loading {
		color: white;
		margin: 0 auto;
		text-align: center;
		padding: 80px;
	}
</style>

<main>
	{#await weather}
		<h1 id="loading">Loading...</h1>
	{:then result}
		<div id="weekly-forecast">
			{#each weather_array as day, id}
				<WeatherCard {id} {day} bind:currentSelected={currentSelected}/>
			{/each}
		</div>
		<DetailedSection bind:day={in_depth_weather}/>
	{/await}
</main>