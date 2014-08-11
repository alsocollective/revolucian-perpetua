var timeApp = angular.module("timeApp", ['ngRoute', 'ngCookies', 'ngAnimate'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				controller: "login",
				templateUrl: 'public/app/pages/login.html'
			})
			.when('/tap', {
				controller: "tap",
				templateUrl: 'public/app/pages/tap.html'
			})
			.when('/shaker', {
				controller: "shaker",
				templateUrl: 'public/app/pages/shaker.html'
			})
			.when('/swipe', {
				controller: "swipe",
				templateUrl: 'public/app/pages/swipe.html'
			})
			.when('/admin', {
				controller: 'admin',
				templateUrl: 'public/app/pages/admin.html'
			})
			.when('/sync', {
				controller: 'sync',
				templateUrl: 'public/app/pages/loading.html'
			})
			.when('/lobby', {
				controller: "lobby",
				templateUrl: 'public/app/pages/lobby.html'
			})
			.when('/diagnostics', {
				controller: "diagnostics",
				templateUrl: 'public/app/pages/diagnostics.html'
			})
			.when('/testtap', {
				controller: "testTap",
				templateUrl: 'public/app/pages/testtap.html'
			})
	});