'use strict';

angular.module('thinkagainbatmanApp')
    .directive('backImg', function(){
        return function(scope, element, attrs){
            attrs.$observe('backImg', function(value) {
                var i = Math.floor(Math.random()*3),
                    img = new Image();
                element.html('<img id="batspinner" src="http://roshow.net/public/images/thinkbatman/spinners/batspinner_'+ i +'.jpg">');
                img.onload = function(){
                    element.html('');
                    element.css({
                        'background-image': 'url(' + value +')'
                    });
                };
                img.src = value;
            });
        };
    })
    .directive('backSize', function(){
        return function(scope, element, attrs){
            attrs.$observe('backSize', function(value) {
                element.css({
                    'background-size' : value
                });
            });
        };
    });