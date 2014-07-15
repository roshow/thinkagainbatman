'use strict';

angular.module('thinkagainbatmanApp')
    .factory('GetAThought', ['$resource', function($resource){
        return $resource('/thought/:id', {}, {
            query: {
                method: 'GET',
                isArray: false
            },
            random: {
                method:'GET',
                params: {
                    random:true
                },
                isArray:false
            }
        });
    }]);