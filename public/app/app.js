var timeApp = angular.module("timeApp", ['ngRoute', 'ngCookies', 'ngAnimate'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				controller: "lobby",
				templateUrl: 'public/app/pages/lobby.html'
			})
			.when('/tap', {
				controller: "tap",
				templateUrl: 'public/app/pages/tap.html'
			})
			.when('/shake', {
				controller: "shake",
				templateUrl: 'public/app/pages/shake.html'
			})
			.when('/admin', {
				controller: 'admin',
				templateUrl: 'public/app/pages/admin.html'
			})
			.when('/diagnostics', {
				controller: "diagnostics",
				templateUrl: 'public/app/pages/diagnostics.html'
			})
	});