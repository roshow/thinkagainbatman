'use strict';

angular.module('thinkagainbatmanApp')
    .controller('ThoughtController', ['$scope', '$routeParams', '$location', 'GetAThought', function ($scope, $routeParams, $location, GetAThought){
        function getRandom(){
            GetAThought.random(function (thought){
                console.log(thought);
                $location.path('thought/' + thought.id);
            });
        }
        $scope.getRandom = getRandom;
        if ($routeParams.batId){
            var qKey = ($routeParams.batId.length === 24) ? '_id' : 'id',
                q = {};
            q[qKey] = $routeParams.batId;
            GetAThought.query(q).$promise.then(function(thoughts){
                $scope.thought = thoughts.docs[0];
            });
        }
        else {
            getRandom();
        }
    }])
    .controller('ManageController', ['$scope', '$routeParams', 'GetAThought', function ($scope, $routeParams, GetAThought){
        $scope.thoughts = [ 'my parents were murdered', 'scum, beware me', 'I hope Alfred made me something to eat'];
        GetAThought.getData(function (thought){
            console.log(thought);
        });
    }]);
