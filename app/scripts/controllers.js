'use strict';

angular.module('thinkagainbatmanApp')
    .controller('ThoughtCtrl', ['$scope', '$routeParams', '$location', 'GetAThought',
        function ($scope, $routeParams, $location, GetAThought) {
            console.log($routeParams);
            function getRandom(){
                GetAThought.random(function(thought){
                    $location.path('thought/' + thought.id);
                });
            };
            $scope.getRandom = getRandom;
            if ($routeParams.batId){
                var qKey = ($routeParams.batId.length === 24) ? '_id' : 'id',
                    q = {};
                q[qKey] = $routeParams.batId;
                $scope.thought = GetAThought.query(q);
            }
            else {
                getRandom();
            }
        }]);
