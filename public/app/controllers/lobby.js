/*controllers.lobby = function($scope, socket, UserSet, $location) {

	var scope = angular.element(main_container).scope();

	scope.countdown = "00 : 00 : 00";

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	var startTime = "23:08:00";

	var target_date = new Date(mm + " " + dd + ", " + yyyy + ", " + startTime).getTime();
	var hours, minutes, seconds;
	var timer = document.getElementById("timer");

	console.log("You've reached the LOBBY!");

	$('.autoplay').slick({
		dots: false,
		arrows: false,
		infinite: true,
		speed: 200,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000
	});

	var timerId = setInterval(function() {

		var current_date = new Date().getTime();
		var seconds_left = (target_date - current_date) / 1000;

		hours = parseInt(seconds_left / 3600);
		seconds_left = seconds_left % 3600;

		minutes = parseInt(seconds_left / 60);
		seconds = parseInt(seconds_left % 60);

		scope.$apply(function() {
			scope.countdown = ("0" + hours).slice(-2) + " : " + ("0" + minutes).slice(-2) + " : " + ("0" + seconds).slice(-2);;
		})

		if (hours <= 0 && minutes <= 0 && seconds <= 0) {

			timer.innerHTML = "00 : 00 : 00";

			clearInterval(timerId);
		}
	}, 1000);

	socket.on('CP', function(data) {
		$location.path(data)
	});
}*/