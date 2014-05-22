'use strict';

angular.module('thinkagainbatmanApp', [
    'ngResource',
    'ngRoute'
])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/thought', {
                templateUrl: 'views/thought.html',
                controller: 'ThoughtController'
            })
            .when('/thought/:batId', {
                templateUrl: 'views/thought.html',
                controller: 'ThoughtController'
            })
            .when('/manage', {
                templateUrl: 'views/manage.html',
                controller: 'ManageController'
            })
            .when('/manage/:id', {
                templateUrl: 'views/manage_thought.html',
                controller: 'ManageAThoughtController'
            })
            .otherwise({
                redirectTo: '/thought'
            });
    });


