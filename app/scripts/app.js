'use strict';

var app = angular.module('thinkagainbatmanApp', [
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
    })

app.directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background-image': 'url(' + value +')'
            });
        });
    };
});
app.directive('backSize', function(){
    return function(scope, element, attrs){
        console.log(element);
        attrs.$observe('backSize', function(value) {
            element.css({
                'background-size' : value
            });
        });
    };
});
