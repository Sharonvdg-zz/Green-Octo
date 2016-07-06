$( document ).ready(function() {
	console.log( "ready!" );
	$( '#homepage' ).show()
	$( '#resultpage' ).hide()

	var APIallFood = "https://api.nal.usda.gov/ndb/list?lt=f&max=500&api_key=FFB7WsiNR7bR4HtRIWnDOtf80CocjsLMTnG12Yn3"
	function APItheFood (randomNr) {
		return "https://api.nal.usda.gov/ndb/list?lt=f&max=1&offset=" + randomNr + "&api_key=FFB7WsiNR7bR4HtRIWnDOtf80CocjsLMTnG12Yn3"
	}
	function APIcalFood (foodId) { 
		return "https://api.nal.usda.gov/ndb/reports/?ndbno=" + foodId + "&api_key=FFB7WsiNR7bR4HtRIWnDOtf80CocjsLMTnG12Yn3"
	}

	$( '#clickSearch' ).click(function(event) {
		event.preventDefault()
		$( '#homepage' ).hide()
		$( '#resultpage' ).show()

		// First get list of foods
		$.get( APIallFood, function( allFood ) {
			
			// Second, choose random food item 
			function getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
			var max = allFood.list.item.length
			rand = getRandomInt(0, max)
			console.log('Random nr: ' + rand)

			// Get the specific food and its id or ndbno
			var APItheFoodLink = APItheFood(rand)
			$.get( APItheFoodLink, function( theFood ) {
				var foodId = theFood.list.item[0].id 
				var foodName = theFood.list.item[0].name

				// Third, find amount of calories of the chosen food
				var APIcalFoodLink = APIcalFood(foodId)
				$.get( APIcalFoodLink, function( nutrFood ) {

					var burnedCal = function() {
						return $("#searchquery").val() / 1000
					}
					var burnedCalories = burnedCal()
					$("#results").append('<h1> Burned: ' + burnedCalories + ' kcal </h1>')

					for( var i=0; i<nutrFood.report.food.nutrients.length; i++ ) {
						if( nutrFood.report.food.nutrients[i].nutrient_id == 208 ) {
							var amountCal = nutrFood.report.food.nutrients[i].value;
							console.log('random food amount calories ' + amountCal + nutrFood.report.food.nutrients[i].unit)
							console.log('burned amount calories ' + burnedCalories)
							i = nutrFood.report.food.nutrients.length ++;
						}
					}

					// Fourth, compare the filled in calories with the calories of chosen food - divide by and come up with an amount of pieces of food.
					// 		Example: "You burned 4 apples with your workout."

					function calculateAmount(burnedCal, amountCal) {
						var number = (burnedCalories / amountCal);
						console.log(number)
						return (Math.round( number * 10 ) / 10);
					}
					//Still to add: the amount of kcal food is calculated per 100 gram, translate to total!!
					var amountFood = calculateAmount(burnedCal, amountCal) 
					console.log('amountFood ' + amountFood)
					$("#results").append('<p> You burned ' + amountFood + ' ' + foodName + ' </p>')
				})
			})
}) 
})
})