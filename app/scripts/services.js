'use strict';

angular.module('thinkagainbatmanApp')
    .factory('GetAThought', ['$resource', function($resource){
        return $resource('http://www.thinkingaboutbatman.com/thought/:id', {}, {
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