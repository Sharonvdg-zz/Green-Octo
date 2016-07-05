$( '#homepage' ).show()
$( '#resultpage' ).hide()

$( document ).ready(function() {
	console.log( "ready!" );

	var APIallFood = ""
	var APIcalFood = ""
	var burnedCal = $("#searchquery").val()

	$( '#clickSearch' ).click(function(event) {
		event.preventDefault()

		$.get( APIallFood, function( calorieData ) {

			// First get list of foods @ https://ndb.nal.usda.gov/ndb/doc/apilist/API-LIST.md > APIallFood
			// Second, choose random food item 
			// Third, find amount of calories of the chosen food > APIcalFood
			// Fourth, compare the filled in calories with the calories of chosen food - divide by and come up with an amount of pieces of food.
			// 		Example: "You burned 4 apples with your workout."
			
		}) 
	})
})