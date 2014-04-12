'use strict';

angular.module('thinkagainbatmanApp')
    .controller('ThoughtCtrl', ['$scope', '$routeParams', '$location', 'GetAThought',
        function ($scope, $routeParams, $location, GetAThought) {
            $scope.getRandom = function(){
                GetAThought.random(function(thought){
                    // $scope.thought = thought;
                    // $location.path('/thought/'+thought.id);
                    console.log(thought.img.src);
                    var img = new Image();
                    img.onload = function(){
                        $scope.thought = thought;
                        console.log('image and stuff loaded');
                    };
                    console.log('loading image');
                    img.src = thought.img.src;
                });
            };
            if ($routeParams.batId){
                $scope.thought = GetAThought.query({id: $routeParams.batId});
            }
            else {
                $scope.getRandom();
            };
        }]);
