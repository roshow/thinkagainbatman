'use strict';

angular.module('thinkagainbatmanApp', [
    'ngResource',
    'ngRoute'
])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/thought', {
                templateUrl: 'views/thought.html',
                controller: 'ThoughtCtrl'
            })
            .when('/thought/:batId', {
                templateUrl: 'views/thought.html',
                controller: 'ThoughtCtrl'
            })
            .otherwise({
                redirectTo: '/thought'
            });
    });


