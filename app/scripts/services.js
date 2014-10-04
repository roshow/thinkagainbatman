'use strict';
var urlPrefix = 'http://0.0.0.0:5000';
angular.module('thinkagainbatmanApp')
.factory('GetAThought', ['$resource', function($resource){
    function transformResponse(response){
        var jsonResponse = angular.fromJson(response);
        if (jsonResponse.docs[0]._id){
            sessionStorage.setItem(jsonResponse.docs[0]._id, response);
        }
        return jsonResponse;
    }
    return $resource('http://www.thinkingaboutbatman.com/thought/:id', {}, {
        query: {
            method: 'GET',
            isArray: false,
            transformResponse: transformResponse
        },
        random: {
            method:'GET',
            params: {
                random:true
            },
            isArray:false,
            transformResponse: transformResponse
        }
    });
}])

.factory('UploadThoughtImg', ['$q', function($q){

    return function(file){
        var deferred = $q.defer();
        var url = urlPrefix + '/uploadImg',
            formData = new FormData();

        formData.append(file.name, file);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.responseType = 'json';
        xhr.onload = function(){
            deferred.resolve(xhr.response);
        };
        xhr.send(formData);  // multipart/form-data

        return deferred.promise;
    };

}]);
