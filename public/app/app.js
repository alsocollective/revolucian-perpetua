var timeApp = angular.module("timeApp", ['ngRoute', 'ngCookies', 'ngAnimate'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				controller: "login",
				templateUrl: 'public/app/pages/login.html'
			})
			.when('/tapping', {
				controller: "tapping",
				templateUrl: 'public/app/pages/tapping.html'
			})
			.when('/admin', {
				controller: 'admin',
				templateUrl: 'public/app/pages/admin.html'
			})
			.when('/sync', {
				controller: 'sync',
				templateUrl: 'public/app/pages/loading.html'
			})
	});