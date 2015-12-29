'use strict'

angular.module('user.controllers' , [])
    .controller('LoginController' , ['$scope' , function($scope){

    }])
    .controller('MenuController' , ['$scope' , '$http' , '$q' , 'config' , function($scope , $http , $q , config){

        $scope.login = function()
        {
            $http.post('http://localhost:8000/login' , {
                email: 'iram@mail.com',
                password: 'Hpk+RJ_xHG>+/h93'
            }).then(
                function(response)
                {
                    console.log(response);
                },
                function(err)
                {
                    console.log(err);
                }
            )
        }
    }])