'use strict';

angular.module('thinkagainbatmanApp')
    .factory('GetAThought', function($resource){
        return $resource('http://thinkingaboutbatman.herokuapp.com/thought/:id', {}, {
            query: {
                method: 'GET',
                transformResponse: function(data){
                    return JSON.parse(data).docs[0];
                },
                sArray:false
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
            }
        });
    });