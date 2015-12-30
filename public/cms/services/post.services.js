'use strict'

angular.module('post.services', [])
    .factory('Post', function ($resource , config) {

        return $resource(config.backendUrl+'/posts/:id',
            {id: '@_id'},
            {
                all: {
                    method: 'GET',
                    url: 'posts',
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
    .service('fileUpload', ['$http' , '$q', function ($http , $q) {

        this.uploadFileToUrl = function(file, uploadUrl , field){
            var deferred = $q.defer();
            var fd = new FormData();
            fd.append(field, file);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
                .success(function(response){
                    deferred.resolve(response);
                })
                .error(function(err){

                });

            return deferred.promise;

        }
    }])
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])


