var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Green Octo' });
});

// router.post('/show', (req, res)=>{
	
// 	var barcodeInput = req.body.barcode;

	
// 	.then((theproductinfo)=> {
// 	// 	//do the API to find the nutritions
// 	// }).then((nutritions)=> {
// 	// 	//do the calculation to find the ecofriendliness
// 	// }).then((ecoFriendly) => {
// 		res.render('results', {
// 		// nutritions: nutritions,
// 		// ecoFriendly: ecoFriendly,
// 		theproductinfo: theproductinfo,
// 		title: 'Results'
// 		})		
// 	})

// })


module.exports = router;
