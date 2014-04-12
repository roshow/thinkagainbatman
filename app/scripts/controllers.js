'use strict';
// var AYE = 0;
angular.module('thinkagainbatmanApp')
    .controller('ThoughtCtrl', ['$scope', '$routeParams', '$location', 'GetAThought',
        function ($scope, $routeParams, $location, GetAThought) {
            $scope.getRandom = function(){
                // console.log('get a random thought '+ (AYE++));
                GetAThought.random(function(thought){
                    $location.path('thought/' + thought.id);
                });
            };
            if ($routeParams.batId){
                var q = ($routeParams.batId.length === 24) ? { _id: $routeParams.batId } : { id: $routeParams.batId };
                $scope.thought = GetAThought.query(q);
            }
            else {
                $scope.getRandom();
            }
        }]);
