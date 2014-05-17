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
            .otherwise({
                redirectTo: '/thought'
            });
    });


