'use strict'

angular.module('user.controllers' , [])
    .controller('LoginController' , ['$scope' ,'$http' ,'$location', 'config' , '$filter' , function($scope , $http , $location , config , $filter){

        $scope.login = function()
        {
            $http.post(config.backendUrl+'/login' , {
                username: $scope.username,
                password: $scope.password
            }).then(
                function(response)
                {
                    if(response.data.success)
                    {
                        $location.path('/');
                    }
                    else
                    {
                        Materialize.toast(
                            $('<span class="error">' + $filter('language')('unauthorized' , true) + '</span>'),
                            1000
                        );
                    }

                },
                function(err)
                {
                    if(err.status == 401)
                    {
                        Materialize.toast(
                            $('<span class="error">' + $filter('language')('unauthorized' , true) + '</span>'),
                            1000
                        );
                    }
                    else
                    {
                        Materialize.toast(
                            $('<span class="error">' + $filter('language')('server_error' , true) + '</span>'),
                            1000
                        );
                    }
                }
            )
        }
    }])
    .controller('MenuController' , ['$scope' ,'$http' ,'$location', 'config' , function($scope , $http , $location , config){

        $scope.logout = function()
        {
            $http.get(config.backendUrl+'/logout')
                .then(
                    function(response)
                    {
                        if(response.data.success)
                        {
                            $location.path('/login');
                        }

                    },
                    function(err)
                    {
                        console.log(err);
                    }
                )
        }

        $scope.loggedIn = false;

        $scope.checkLoggedIn = function()
        {

            $http.get(config.backendUrl+'/checkLogin')
                .success(function(check){

                    if(check.loggedIn)
                    {
                        $scope.loggedIn = true;
                    }
                    else
                    {
                        $scope.loggedIn = false;
                    }
                })
                .error(function(err){

                    $scope.loggedIn = false;
                    console.log(err);

                })

        }

        $scope.$on('$routeChangeSuccess', function () {

            $scope.checkLoggedIn();
        });

    }])