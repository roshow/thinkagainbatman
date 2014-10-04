'use strict';

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
    }]);