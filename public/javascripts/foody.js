function doCalculation(elementid) {
	function APItheFood (randomFood) {
		return "https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=FFB7WsiNR7bR4HtRIWnDOtf80CocjsLMTnG12Yn3&nutrients=208&ndbno=" + randomFood 
	}

	var thearray = [ ['09500', '09501', '09502', '09503', '09504', '09040', '19902', '19903', '19904', '19410'], 
	['19155', '21118', '21237', '21309', '21233'] ]
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	randomArr = getRandomInt(0, 1)
	console.log('randomArr ' + randomArr)
	$( '#homepage' ).hide()
	$( '#resultpage' ).show()

		// How much kcal did you burn?
		var burnedCalories = $(elementid).val()
		$("#resultsh1").html('You burned ' + burnedCalories + ' kcal!')

		for( var i=0; i < thearray[randomArr].length; i++ ) {
			var maxFood = (thearray[randomArr].length -1)
			var nrFood = getRandomInt(0, maxFood)
			var randomFood = thearray[randomArr][nrFood]
			console.log('for loop: randomFood ' + randomFood)

			// Get the specific food and its value
			var APItheFoodLink = APItheFood(randomFood)

			// if it's per 100 gram
			if( randomArr == 0 ) {
				$.get( APItheFoodLink, function( theFood ) {
					console.log(theFood)
					var foodName = theFood.report.foods[0].name 
					var foodValue = theFood.report.foods[0].nutrients[0].gm
					console.log('if randomArr = 0; foodValue ' + foodValue)

					function calculateAmount(burnedCal, amountCal) {
						var number = (burnedCal / amountCal);
						console.log('number ' + number * 100)
						return (Math.round( number * 10000 ) / 100);
					}

					var amountFood = calculateAmount(burnedCalories, foodValue) 
					console.log('amountFood ' + amountFood)
					$("#results").html('<p>You can now eat another ' + amountFood + ' gram of ' + foodName + ' </p>')
				})
				i = thearray[randomArr].length ++
			}

			// if it's per piece (Chicken macNuggets: 21309 (4 pieces))
			else if( randomArr == 1 ) {
				$.get( APItheFoodLink, function( theFood ) {
					var foodName = theFood.report.foods[0].name 
					var foodValue = theFood.report.foods[0].nutrients[0].value

					function calculatePieces(burnedCal, amountCal) {
						var number = (burnedCal / amountCal);
						console.log('number ' + number *100)
						return (Math.round( number * 100 ) / 100);
					}

					if( theFood.report.foods[0].ndbno == 21309 ) { 
						//if it's macNuggets, multiply by 4
						var piecesNugg = 4 * calculatePieces(burnedCalories, foodValue) 
						console.log('piecesNugg nuggets ' + piecesNugg)
						$("#results").html('<p>Now you can eat ' + piecesNugg + ' more ' + foodName + ' </p>')	
					} 
					else { // just do your thing!
						var piecesFood = calculatePieces(burnedCalories, foodValue) 
						console.log('piecesFood other ' + piecesFood)
						$("#results").html('<p>You can now eat ' + piecesFood + ' more ' + foodName + ' </p>')	
					}			
				})
				i = thearray[randomArr].length ++
			}

		}

}

$( document ).ready(function() {
	console.log( "ready!" );
	$( '#homepage' ).show()
	$( '#resultpage' ).hide()

	$("#refreshSearch").click(function(event){
		event.preventDefault()
		if ( $('#searchquery2').val().length > 1 ) {
			// $("#results").text('')
			doCalculation('#searchquery2') 
		} else  {
			// $("#results").text('')
			doCalculation('#searchquery') 
		}
	})

	$( '#clickSearch' ).click(function(event) {
		event.preventDefault()
		doCalculation('#searchquery')
	})
	
	$( '#clickSearch2' ).click(function(event) {
		event.preventDefault()
		$("#results").text('')
		doCalculation('#searchquery2')
	})
})