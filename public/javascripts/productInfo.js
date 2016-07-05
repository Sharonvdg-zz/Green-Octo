$( document ).ready(function() {
	console.log( "ready!" );

	var theproductinfo = "http://pod.opendatasoft.com/api/records/1.0/search/?dataset=pod_gtin&q=" + $("#searchquery").val() + "&facet=gpc_s_nm&facet=brand_nm&facet=owner_nm&facet=gln_nm&facet=prefix_nm&refine.prefix_nm=GS1+Netherlands&refine.gpc_s_nm=Food+-+Beverage+-+Tobacco"

	$( '#homepage' ).show()
	$( '#resultpage' ).hide()

	$( '#clickSearch' ).click(function(event) {
		event.preventDefault()
		$.get( theproductinfo, function( data ) {
			console.log($("#searchquery").val())
			for (var i = 0; i < data.records.length; i++) {
				console.log(data.records[i].fields.gtin_cd + " with name " + data.records[i].fields.gtin_nm)
				$("#results").append('<li>' + data.records[i].fields.gtin_nm + '</li>')
			};

			$( '#homepage' ).hide()
			$( '#resultpage' ).show()

		});

	})
});

