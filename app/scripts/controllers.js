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
            GetAThought.query(q).$promise.then(function(thoughts){
                $scope.thought = thoughts.docs[0];
            });
        }
        else {
            getRandom();
        }
    }])
    .controller('ManageController', ['$scope', '$routeParams', 'GetAThought', function ($scope, $routeParams, GetAThought){
        if (!$routeParams.id){
            GetAThought.query().$promise.then(function(thoughts){
                $scope.thoughts = thoughts.docs;
            });
        }
        else {
            $scope.thoughtInstance = GetAThought.find($routeParams, function(thought){
                $scope.thought = thought.docs[0];
            });

            $scope.saveThought = function(){
                $scope.thoughtInstance.$save($scope.thought, function(savedThought){
                    $scope.saved = true;
                    $scope.thought = savedThought.docs[0];
                    // console.log($scope.thought);
                });
            };
        }
    }]);
