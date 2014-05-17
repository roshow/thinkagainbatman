'use strict';

angular.module('thinkagainbatmanApp')
    .factory('GetAThought', [ '$resource', function ($resource){
        return $resource('http://thinkingaboutbatman.herokuapp.com/thought/:id', {}, {
            query: {
                method: 'GET',
                transformResponse: function(data){
                    console.log('anything')
                    return JSON.parse(data);
                },
                isArray: false
            },
            random: {
                method:'GET',
                params: {
                    random:true
                },
                transformResponse: function(data){
                    return JSON.parse(data).docs[0];
                },
                isArray:false
            },
            getData: {
                method: 'GET',
                isArray: false
            },
        });
    }]);