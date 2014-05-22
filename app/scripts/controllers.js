'use strict';

angular.module('thinkagainbatmanApp')
    .controller('ThoughtController', ['$scope', '$routeParams', '$location', 'GetAThought', function ($scope, $routeParams, $location, GetAThought){
        function getRandom(){
            GetAThought.random(function (thought){
                $location.path('thought/' + thought.docs[0].id);
            });
        }
        $scope.getRandom = getRandom;
        if ($routeParams.batId){
            var q = {
                // id: ($routeParams.batId.length === 24) ? $routeParams.batId.slice(19) : $routeParams.batId
                id: $routeParams.batId
            };
            GetAThought.query(q).$promise.then(function(thoughts){
                console.log(thoughts.docs[0]);
                $scope.thought = thoughts.docs[0];
            });
        }
        else {
            getRandom();
        }
    }])

    .controller('ManageController', ['$scope', 'GetAThought', function ($scope, GetAThought){
        GetAThought.query().$promise.then(function(thoughts){
            $scope.thoughts = thoughts.docs;
        });
    }])

    .controller('ManageAThoughtController', ['$scope', '$routeParams', 'GetAThought', function ($scope, $routeParams, GetAThought){
    
        function updateState (newState){
            $scope.saveState = newState;
            $scope.showAlert = true;
        }

        $scope.saveState = 0;
        $scope.showAlert = true;


        $scope.thoughtInstance = GetAThought.find($routeParams, function(thought){
            $scope.thought = thought.docs[0];
        });

        $scope.hideAlert = function(){
            $scope.showAlert = false;
        };
        
        $scope.saveThought = function(){
            updateState(3);
            $scope.thoughtInstance.$save($scope.thought, function(savedThought){
                updateState(4);
                $scope.thought = savedThought.docs[0];
            });
        };
    }]);
