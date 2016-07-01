var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Green Octo' });
});

router.post('/show', (req, res)=>{
	
	
	
	res.render('results', {
		// nutritions: nutritions,
		// ecoFriendly: ecoFriendly
	})
})


module.exports = router;
