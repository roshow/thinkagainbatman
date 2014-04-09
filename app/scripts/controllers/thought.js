'use strict';

angular.module('thinkagainbatmanApp')
    .controller('ThoughtCtrl', ['$scope', '$routeParams', '$location', 'GetAThought',
        function ($scope, $routeParams, $location, GetAThought) {
            $scope.getRandom = function(){
                GetAThought.random(function(thought){
                    $location.path('/thought/'+thought.id);
                });
            };
            if ($routeParams.batId){
                GetAThought.query({id: $routeParams.batId}, function(thought){
                    $scope.thought = thought;
                });
            }
            else {
                $scope.getRandom();
            }
        }]);
