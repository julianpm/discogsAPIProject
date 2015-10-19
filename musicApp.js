
// The user will be asked what genre of music
// they feel like listening to. They will then
// enter their choice of genre in a search box
// and submit. The app will then return a list
// of suggestions based on their input.

var musicApp = {};

musicApp.apiKey = 'gDjpFQORoFgOEcviFwIW';


musicApp.userMood = function(moodChoice){

	if (moodChoice === 'prettyAlright'){
		musicApp.findArtists('hip-hop');
		musicApp.findArtists('hard-bop');
	}
	else if (moodChoice === 'prettyCalm'){
		musicApp.findArtists('psychedelic-rock');
	}
	else if (moodChoice === 'prettySad'){
		musicApp.findArtists('shoegazer');
		musicApp.findArtists('goth-rock');
	}
	else {
		musicApp.findArtists('black-metal');
		musicApp.findArtists('death-metal');
	}
}


musicApp.genreClick = function(){
	$('.buttonMain').on('click',function(){
		var genre = $(this).data('mood'); 
		$('.results').empty();
		musicApp.userMood(genre);
	});
}


musicApp.findArtists = function(userChoice){
	$.ajax({
		url:'https://api.discogs.com/database/search',
		format:'GET',
		dataType:'jsonp',
		data: {
			key:musicApp.apiKey,
			secret: 'iXTmtqBIuOkEsoXbZRyqqrSFrdNsdzRc',
			q: 'style=' + userChoice
		}
	}).then(function(res){
		musicApp.displayArtists(res.data.results);
	});
};


musicApp.displayArtists = function(swissCheese){
	var reducedSwissCheese = swissCheese.slice(0,10);
	$('main').hide();
	$.each(reducedSwissCheese, function(i,value){
		console.log(value);
		var logo = $('<img>').addClass('bandLogo').attr('src',value.thumb);
		var title = $('<h3>').addClass('bandName').text(value.title);
		var container = $('<div>').addClass('allTheThings').append(logo,title);
		$('.results').append(container);
		$('.apiReturn').removeClass('isHidden');
	});
}


musicApp.init = function(){
	musicApp.genreClick();
};


$(document).ready(function(){
	musicApp.init();
});












