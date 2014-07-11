'use strict';

angular.module('thinkagainbatmanApp')
    .controller('ThoughtController', ['$scope', '$routeParams', '$location', 'GetAThought', function ($scope, $routeParams, $location, GetAThought){
        $scope.batSpinner = 'http://roshow.net/public/images/thinkbatman/spinners/batspinner_'+ Math.floor(Math.random()*3) +'.jpg';
        $scope.batLoading = true;
        
        $scope.getRandom = function(){
            GetAThought.random(function (thought){
                $location.path('thought/' + thought.docs[0]._id);
            });
        };

        if ($routeParams.batId){
            var q = {
                // id: ($routeParams.batId.length === 24) ? $routeParams.batId.slice(19) : $routeParams.batId
                id: $routeParams.batId
            };
            GetAThought.query(q).$promise.then(function (thoughts){
                $scope.thought = thoughts.docs[0];
                $scope.batLoading = false;
            });
        }
        else {
            $scope.getRandom();
        }        
    }]);
