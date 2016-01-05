'use strict'

angular.module('category.services' , [])
    .factory('Category', function($resource , config) {

        return $resource(config.backendUrl+'/categories/:id',
            {id: '@_id'},
            {
                all: {
                    method:'GET',
                    url : config.backendUrl+'/categories',
                    isArray: true
                },
                get: {
                    isArray: false
                },
                update: {
                    method: 'PUT'
                }

            }
        );
    })
