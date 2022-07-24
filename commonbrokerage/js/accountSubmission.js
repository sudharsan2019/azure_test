$(document).on('click', '.google', function() {

	let newWindow = open('https://google.com/', 'example', 'location=yes,toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=300,width=1000,height=650')
	newWindow.focus();

	newWindow.onload = function() {
		newWindow.document.body.insertAdjacentHTML('afterbegin', 'https://google.com/');
	};
});

$(document).on('click', '.majesco', function() {
 	var host = window.location.hostname;
	var protocol = window.location.protocol;
	var base_url = protocol+"//"+host;

	let newWindow = open(global_maj_link, 'example', 'location=yes,toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=300,width=1000,height=650')
	newWindow.focus();

	newWindow.onload = function() {
		newWindow.document.body.insertAdjacentHTML('afterbegin', global_maj_link);
	};
});

$(document).on('click', '.cpsc', function() {
	let newWindow = open('https://www.cpsc.gov/', 'example', 'location=yes,toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=300,width=1000,height=650')
	newWindow.focus();

	newWindow.onload = function() {
		newWindow.document.body.insertAdjacentHTML('afterbegin', 'https://www.cpsc.gov/');
	};
});

$(document).on('click', '.fda', function() {
	let newWindow = open('https://www.fda.gov/', 'example', 'location=yes,toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=300,width=1000,height=650')
	newWindow.focus();

	newWindow.onload = function() {
		newWindow.document.body.insertAdjacentHTML('afterbegin', 'https://www.fda.gov/');
	};
});



  