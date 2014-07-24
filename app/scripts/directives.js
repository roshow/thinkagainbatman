'use strict';

angular.module('thinkagainbatmanApp')

.directive('backImg', function(){
    return {
        restrict: 'A',
        scope: {
            backImg: '=',
            batLoaded: '='
        },
        link: function(scope, element){
            scope.$watch('backImg', function (newVal){
                if (newVal && newVal.src){
                    var img = new Image();
                    img.onload = function(){
                        scope.batLoaded = true;
                        element.css({
                            'background-image': 'url(' + newVal.src +')',
                            'background-size' : newVal.scale
                        });
                        scope.$apply();
                    };
                    img.src = newVal.src;
                    scope.batLoaded = false;
                }
            });
        }
    };
})

// var i = Math.floor(Math.random()*3),
// element.html('<img id="batspinner" src="http://roshow.net/public/images/thinkbatman/spinners/batspinner_'+ i +'.jpg">');


.directive('linkTo', ['$location', function($location){
    return function(scope, element, attr){
        element.on('click', function(){
            $location.path(attr.linkTo).replace();
            scope.$apply();
        });
    };
}])

.directive('upFile', function(){
    return {
        restrict: 'A',
        scope: {
            upFile: '=upFile'
        },
        link: function(scope, element, attr){
            element.on('change', function(){
                console.log(this.files);
            });
        }
    };
})

.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0];
                    // or all selected files:
                    // scope.fileread = changeEvent.target.files;
                });
            });
        }
    }
}]);
