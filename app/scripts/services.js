'use strict';

angular.module('thinkagainbatmanApp')
    .factory('GetAThought', ['$resource', function($resource){
        return $resource('http://0.0.0.0:5000/thought/:id', {}, {
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