'use strict';

angular.module('thinkagainbatmanApp')

.directive('backImg', function(){
    return {
        restrict: 'A',
        scope: {
            backImg: '='
        },
        link: function(scope, element, attrs){
            scope.$watch('backImg', function(newVal, oldVal){
                var i = Math.floor(Math.random()*3),
                    img = new Image();
                element.html('<img id="batspinner" src="http://roshow.net/public/images/thinkbatman/spinners/batspinner_'+ i +'.jpg">');
                img.onload = function(){
                    element.html('');
                    element.css({
                        'background-image': 'url(' + newVal.src +')',
                        'background-size' : newVal.scale
                    });
                };
                img.src = newVal.src;
            });
        }
    };
})

.directive('linkTo', ['$location', function($location){
    return function(scope, element, attr){
        element.on('click', function(){
            $location.path(attr.linkTo).replace();;
            scope.$apply();
        });
    };
}]);