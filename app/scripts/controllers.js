'use strict';

angular.module('thinkagainbatmanApp')
    .controller('ThoughtController', ['$scope', '$routeParams', '$location', 'GetAThought', function ($scope, $routeParams, $location, GetAThought){
        function getRandom(){
            GetAThought.random(function (thought){
                $location.path('thought/' + thought.docs[0]._id);
            });
        }
        $scope.getRandom = getRandom;
        if ($routeParams.batId){
            var q = {
                // id: ($routeParams.batId.length === 24) ? $routeParams.batId.slice(19) : $routeParams.batId
                id: $routeParams.batId
            };
            GetAThought.query(q).$promise.then(function(thoughts){
                $scope.thought = thoughts.docs[0];
            });
        }
        else {
            getRandom();
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

    .controller('ManageAThoughtController', ['$scope', '$routeParams', 'GetAThought', function ($scope, $routeParams, GetAThought){
    
        function updateState (newState){
            $scope.saveState = newState;
            $scope.showAlert = true;
        }

        $scope.saveState = 0;
        $scope.showAlert = true;


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

            var url = '/uploadImg',
                files = document.querySelector('input[type="file"]').files,
                formData = new FormData();

            for (var i = 0, file; file = files[i]; ++i) {
                formData.append(file.name, file);
            }

            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.responseType = 'json';
            xhr.onload = function(data){
                $scope.thought.img.src = 'http://roshow.net/public/images/thinkbatman/' + xhr.response.docs[0];
                $scope.saveThought();
                console.log(data);
                // console.log(xhr);
            };
            xhr.send(formData);  // multipart/form-data
        };
    }]);
