'use strict';

angular.module('thinkagainbatmanApp')
    .factory('GetAThought', ['$resource', function($resource){
        return $resource('http://10.0.1.8:7777/thought/:id', {}, {
            query: {
                method: 'GET',
                isArray: false
            },
            find: {
                method: 'GET',
                isArray: false
            },
            random: {
                method:'GET',
                params: {
                    random:true
                },
                isArray:false
            },
            getData: {
                method: 'GET',
                isArray: false
            },
        });
    }]);