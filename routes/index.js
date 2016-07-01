var express = require('express');
var router = express.Router();
var db = require('../modules/database')

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Green Octo' });
});

router.post('/show', (req, res)=>{
	
	var barcodeInput = req.body.barcode;

	db.barcode.findOne({
		where: {
			number: barcodeInput
		}
	}).then((thebarcode)=> {
	// 	//do the API to find the nutritions
	// }).then((nutritions)=> {
	// 	//do the calculation to find the ecofriendliness
	// }).then((ecoFriendly) => {
		res.render('results', {
		// nutritions: nutritions,
		// ecoFriendly: ecoFriendly,
		thebarcode: thebarcode,
		title: 'Results'
		})		
	})

})


module.exports = router;
