'use strict';

angular.module('thinkagainbatmanApp')
    .factory('GetAThought', function($resource){
        return $resource('http://thinkingaboutbatman.herokuapp.com/thought/:id', {}, {
            query: {
                method: 'GET',
                responseType: 'json',
                transformResponse: function(data){
                    return data.docs[0];
                },
                sArray:false
            },
            random: {
                method:'GET',
                params: {
                    random:true
                },
                responseType: 'json',
                transformResponse: function(data){
                    return data.docs[0];
                },
                isArray:false
            }
        });
    });