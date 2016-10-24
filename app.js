var beerApp = {};
//request to get the API from the LCBO API

//get all of the craft beer 
beerApp.getBeer = function(beerQuery){
	$.ajax({
		url: 'https://lcboapi.com/products',
		headers: { 
			'Authorization': 'Token MDo3ZWNjMDY0OC05NTY2LTExZTYtOWE3Zi05Mzc5MWE3YzdjMTA6cll2UlF6NFZhekFIdkxRMkNBcHRmZXNEV0llc2wxRHNNU2hk' 
			},
		method:'GET',
		dataType: 'json',
		data: {
			where: beerQuery,
			per_page: '100',
			// page: 3
		}
	})
	.then(function(dataResults) {
	 	 // console.log(dataResults);

	 	 //beerApp.seasonalBeer(dataResults.result)
	 	 //calling the regular array without seasonal filter
	 	 beerApp.styleBeer(dataResults.result);
	});
};

//filter 1:

beerApp.seasonalBeer = function(arrayOfOcb) {
	// console.log('ocb', arrayOfOcb)
	 seasonalBeerArr = arrayOfOcb.filter(function(beer) {
 		return beer.is_seasonal === true;
 	});
 	// console.log('this is seasonal beer', seasonalBeerArr);
 	beerApp.styleBeer(seasonalBeerArr);
 	//sending hte season beer array to the function called styleBeer
 };


 beerApp.styleBeer = function(seasonalBeerArr) {
 	for (i = 0; i < 3; i++) {
	 	var userStyle = $('input[name=typeOfBeer]:checked').val()
	 	var styleReg = new RegExp(userStyle, 'gi')
	 	// console.log('seasonalbeerarr', seasonalBeerArr);
	 	beerStyleArr = seasonalBeerArr.filter(function(beer){
	 		return styleReg.exec(beer.style);
	 	});
	 	//get a random result from the filtered options 
	 	var randomNumber = Math.floor(Math.random() * beerStyleArr.length);
	 	var randomBeer = beerStyleArr[randomNumber];
 		// console.log('beer array', beerStyleArr);
 		//handlebars compiler
		var myTemplate = $('#myTemplate').html();
		var template = Handlebars.compile(myTemplate);
		var renderedTemplate = template(randomBeer);
	
		$('section.wrapper').append(renderedTemplate);
		}

	var myTemplate2 = $('#myTemplate2').html();
	var template2 = Handlebars.compile(myTemplate2);
	var renderedTemplate2 = template2(randomBeer);
		$('.whoknows2').append(renderedTemplate2);
};

// hides and shows a div 
$('.submit').click(function() {
	$( ".landingPage").toggleClass('landingPage resultsPage');
	$('.wrapper').removeClass('resultsPage')

});

//refreshes the page 

$('.whoknows2').click(function(){
	window.location.reload(true);
			setTimeout(location.reload);
});

    // Start app
beerApp.init = function() {
//on click of submit button $jquery
	$('form').on('submit', function(e){
		e.preventDefault();

	//the submit button will check to see the variables and only give results that apply to checked items 
		var isSeasonal = $('input[name=seasonal]:checked').val()
		console.log(isSeasonal);

		var beerQuery ='';
		// 	// *1 if user checks seasonal, create string that says is_ocb, is_seasonal 
		if ( isSeasonal === "seasonalBeer") {
			beerQuery = 'is_seasonal, is_ocb';
			//then i think i pass this var onto
			// #2else if user did not check seasonal, create a string that says is_ocb  
		} else if (isSeasonal === "all") {
			beerQuery ='is_ocb';
			//then i think i pass both of these onto line 64 
		} 
		beerApp.getBeer(beerQuery);
		// #3then with that string pass that to teh getbeer method at the 
		// top of the page so we can use that as the criteria for the where query
		// $( ".landingPage").toggleClass('resultsPage');
	});
}


$(function() {
    beerApp.init();
});


