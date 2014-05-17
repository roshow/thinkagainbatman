'use strict';

angular.module('thinkagainbatmanApp')
    .controller('ThoughtController', ['$scope', '$routeParams', '$location', 'GetAThought', function ($scope, $routeParams, $location, GetAThought){
        function getRandom(){
            GetAThought.random(function (thought){
                $location.path('thought/' + thought.id);
            });
        }
        $scope.getRandom = getRandom;
        if ($routeParams.batId){
            var q = {
                id: ($routeParams.batId.length === 24) ? $routeParams.batId.slice(19) : $routeParams.batId
            };
            console.log(GetAThought.query(q));
            GetAThought.query(q).$promise.then(function(thoughts){
                $scope.thought = thoughts.docs[0];
            });
        }
        else {
            getRandom();
        }
    }])
    .controller('ManageController', ['$scope', '$routeParams', 'GetAThought', function ($scope, $routeParams, GetAThought){
        $scope.hello = function (){
            $scope.editThought = true;
        };
        $scope.goodbye = function (){
            $scope.editThought = false;
        };
        console.log($routeParams);
        if (!$routeParams.id){
            GetAThought.query().$promise.then(function(thoughts){
                console.log(thoughts);
                $scope.thoughts = thoughts.docs;
            });
        }
        else {
            console.log($routeParams.id);
        }
    }]);
