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
           var thoughtData = JSON.parse(sessionStorage.getItem($routeParams.batId));
           if (!thoughtData) {
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
                $scope.thought = thoughtData.docs[0];
                $scope.batLoading = false;
            }
        }
        else {
            $scope.getRandom();
        }
    }])

    .controller('ManageController', ['$scope', '$location', 'GetAThought', function ($scope, $location, GetAThought){
        $scope.thoughtInstance = GetAThought.query(function (thoughts){
            $scope.thoughts = thoughts.docs;
        });
        $scope.addAThought = function(){
            GetAThought.save({
                img: {
                    scale: 'cover',
                    src: 'http://roshow.net/public/images/thinkbatman/bat404.jpg'
                },
                credit: {
                    name: 'Default thought',
                    link: '#/thought'
                }
            }).$promise.then(function (addedThought){
                $location.path('/manage/' + addedThought.docs[0]._id);
            });
        };
    }])

    .controller('ManageAThoughtController', ['$scope', '$routeParams', 'GetAThought', 'UploadThoughtImg', function ($scope, $routeParams, GetAThought, UploadThoughtImg){
    
        function updateState (newState){
            $scope.saveState = newState;
            $scope.showAlert = true;
        }

        $scope.saveState = 0;
        $scope.showAlert = true;
        $scope.thought = {
            img: undefined
        };


        $scope.thoughtInstance = GetAThought.query($routeParams, function(thought){
            $scope.thought = thought.docs[0];
            $scope.thought.img.scale = ($scope.thought.img.scale !== 'contain') ? 'cover' : $scope.thought.img.scale;
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
        
        $scope.uploadFiles = function(){
            updateState(3);
            UploadThoughtImg($scope.imgFile).then(function (data){
                $scope.thought.img.src = 'http://roshow.net/public/images/thinkbatman/' + data.docs[0];
                $scope.saveThought();
            });
        };

    }]);
