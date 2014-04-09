'use strict';

angular.module('thinkagainbatmanApp')
    .factory('GetAThought', function($resource){
        return $resource('http://0.0.0.0:7777/thought/:id', {}, {
            query: {
                method: 'GET',
                responseType: 'json',
                transformResponse: function(data){
                    return data.docs[0];
                }
            },
            random: {
                method:'GET',
                params: {
                    random:true
                },
                responseType: 'json',
                transformResponse: function(data){
                    return data.docs[0];
                }
            }
        });
    });