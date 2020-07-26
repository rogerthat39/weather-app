<script>
  export let id
  export let day
  export let currentSelected

  function showDetails(id) {
    //update detailed view
    currentSelected = id

    //remove selected class from previous clicked div
    let oldSelected = document.getElementsByClassName("selected")
    for (let i = 0; i < oldSelected.length; i++) {
      oldSelected[i].classList.remove("selected")
    }
    //add selected class to new div
    document.getElementById(currentSelected).classList.add("selected")
  }
</script>

<style>
	:global(.selected) {
		background-color: #D0CCD0!important;
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
</style>

<!--card html-->
<div {id} class="day-card {id == 0 ? 'selected' : ''}" on:click={function() {showDetails(id)}}>
  <div class="day-heading">
    <h3 class="title">{day.weekday}</h3>
    <h3 class="subtitle">{day.date}</h3>
  </div>
  <div class="day-body">
    <img class="card-img" src={day.image} alt={day.alt}/>
    <div class="temperature">
      <i class="fas fa-thermometer-full" style="color: red"/>
      {day.high_temp}
    </div>
    <div class="temperature">
      <i class="fas fa-thermometer-quarter" style="color: blue"/>
      {day.low_temp}
    </div>
  </div>
</div>
