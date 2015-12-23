'use strict'

angular.module('post.services' , [])
    .factory('Post', function($resource) {

        return $resource('posts/:id',
            {id: '@_id'},
            {
                all: {
                    method:'GET',
                    url : 'posts',
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
