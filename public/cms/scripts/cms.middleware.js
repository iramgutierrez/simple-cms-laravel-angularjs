'use strict'

angular.module('cms.middleware' , [])
    .provider('checkLogin', function() {

        this.$get = [ "$q" , "config", "$http" , "$location" ,  function($q , config , $http , $location) {

            var deferred = $q.defer();

            $http.get(config.backendUrl+'/checkLogin')
                .success(function(login){
                    console.log(login);
                    if(login.loggedIn)
                    {
                        deferred.resolve();
                    }else
                    {
                        deferred.reject();

                        window.location = 'login';
                    }
                })
                .error(function(err){

                    console.log(err);

                })

            return deferred.promise;

        }];
    })

