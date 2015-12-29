'use strict'

angular.module('category.services' , [])
    .factory('Category', function($resource) {

        return $resource('categories/:id',
            {id: '@_id'},
            {
                all: {
                    method:'GET',
                    url : 'categories',
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
