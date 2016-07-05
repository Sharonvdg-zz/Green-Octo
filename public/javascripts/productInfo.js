$( document ).ready(function() {
	console.log( "ready!" );

	var APIbarcode = "http://pod.opendatasoft.com/api/records/1.0/search/?dataset=pod_gtin&q=" + $("#searchquery").val() + "&facet=gpc_s_nm&facet=brand_nm&facet=owner_nm&facet=gln_nm&facet=prefix_nm&refine.prefix_nm=GS1+Netherlands&refine.gpc_s_nm=Food+-+Beverage+-+Tobacco"
	var APIproductNumber = "https://api.nal.usda.gov/ndb/search/?format=json&q=" + productName + "&max=1&offset=0&api_key=FFB7WsiNR7bR4HtRIWnDOtf80CocjsLMTnG12Yn3"
	var APIproductDetails = "https://api.nal.usda.gov/ndb/reports/?ndbno=" + productNumber + "&api_key=FFB7WsiNR7bR4HtRIWnDOtf80CocjsLMTnG12Yn3"

	var productName;
	var productNumber;
	var productNameNutr;
	var productDetails;

	$( '#homepage' ).show()
	$( '#resultpage' ).hide()

	$( '#clickSearch' ).click(function(event) {
		event.preventDefault()

		$.get( APIbarcode, function( barcodedata ) {
			console.log($("#searchquery").val())
			//for loop, if gtin_nm consists, then take that result and return.
			for( var i = 0; i < barcodedata.records.length; i++ ){
				if(barcodedata.records[i].fields.gtin_nm != undefined && barcodedata.records[i].fields.gtin_nm !== 'unileverfoodsolutions.fr'){
					productName = barcodedata.records[i].fields.gtin_nm
					console.log('The product name ' + productName)
					i = barcodedata.records.length ++
					//return productName;
				}
			}
			$("#results").append('<li><h2>productName ' + productName + '</h2></li>')
			$( '#homepage' ).hide()
			$( '#resultpage' ).show()
			console.log('now the new api is coming ' + productName)
			
			//Turns out that the barcode API doesn't give back solid productnames, but random names which are sometimes really long sentences. 
			//These sentences can not be understood by the next API, which can in his turn search for nutritions in the food. 
			//This nutrition API needs a food, not a brand, to search for nutritions. 
			
			$.get( APIproductNumber, function( numberdata ) {
				//first find the specific product number through API
				console.log('productNumber name ' + numberdata.list.item[0].name)
				productNumber = numberdata.list.item[0].ndbno
				productNameNutr = numberdata.list.item[0].name
				$("#results").append('<li><h4>productNameNutr  ' + productNameNutr + '</h4></li>')


				$.get( APIproductDetails, function( productdata ) {
					//then fill in that number and get product details.
					productDetails = productdata.report.food.nutritions
					console.log('productDetails' + productDetails)
					$("#results").append('<li><p> Contains per 100 gram: </p></li>')
					for( var i = 0; i < productDetails.length; i++ ){
						$("#results").append('<li>productDetails' + productDetails[i].name + ": " + productDetails[i].value 
							+ " " + productDetails[i].unit + '</li>')
					}
				})

			})

		});

})
});

