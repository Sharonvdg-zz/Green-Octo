//UNFORTUNATELY REFRESH DOESN'T WORK YET..

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
		$("#results").append('<h1>You burned ' + burnedCalories + ' kcal! </h1>')

		for( var i=0; i < thearray[randomArr].length; i++ ) {
			var maxFood = (thearray[randomArr].length -1)
			var nrFood = getRandomInt(0, maxFood)
			var randomFood = thearray[randomArr][nrFood]
			console.log('randomFood ' + randomFood)

			// Get the specific food and its value
			var APItheFoodLink = APItheFood(randomFood)

			// if it's per 100 gram
			if( randomArr == 0 ) {
				$.get( APItheFoodLink, function( theFood ) {
					console.log(theFood)
					var foodName = theFood.report.foods[0].name 
					var foodValue = theFood.report.foods[0].nutrients[0].gm

					function calculateAmount(burnedCal, amountCal) {
						var number = (burnedCal / amountCal);
						console.log(number)
						return (Math.round( number * 100 ));
					}

					var amountFood = calculateAmount(burnedCalories, foodValue) 
					console.log('amountFood ' + amountFood)
					$("#results").append('<p>You can now eat another ' + amountFood + ' gram of ' + foodName + ' </p>')
				})
				i = thearray[randomArr].length ++
			}

			// if it's per piece (Chicken macNuggets: 21309 (4 pieces))
			if( randomArr == 1 ) {
				$.get( APItheFoodLink, function( theFood ) {
					var foodName = theFood.report.foods[0].name 
					var foodValue = theFood.report.foods[0].nutrients[0].value

					function calculatePieces(burnedCal, amountCal) {
						var number = (burnedCal / amountCal);
						console.log(number)
						return (Math.round( number * 100 ) / 100);
					}

					if( theFood.report.foods[0].ndbno == 21309 ) { 
						//if it's macNuggets, multiply by 4
						console.log('piecesFood ' + piecesFood)
						var piecesFood = 4 * calculatePieces(burnedCalories, foodValue) 
						console.log('piecesFood ' + piecesFood)
						$("#results").append('<p>Now you can eat ' + piecesFood + ' more ' + foodName + ' </p>')	
					} 
					else { // just do your thing!
						var piecesFood = calculatePieces(burnedCalories, foodValue) 
						console.log('piecesFood ' + piecesFood)
						$("#results").append('<p>Now you can eat ' + piecesFood + ' more ' + foodName + ' </p>')	
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
		$("#results").text('')
		doCalculation('#searchquery') 
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