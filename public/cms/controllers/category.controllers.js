'use strict'

angular.module('category.controllers' , [])
    .controller('CategoryIndexController' , ['$scope' , '$http' , 'Category' , '$filter', function($scope , $http , Category , $filter){

        $scope.categories = [];

        Category.all()
            .$promise.then(function(categories) {

                $scope.categories = categories;

            });

        $scope.delete = function(id , k)
        {
            Category.delete({id : id})
                .$promise.then(
                    function(category){

                        $scope.categories.splice(k , 1);

                        Materialize.toast(
                            $('<span>' + $filter('language')('category_deleted' , true) + '</span>'),
                            1000
                        );
                    },
                    function(err)
                    {
                        Materialize.toast(
                            $('<span>' + err.data.error + '</span>'),
                            1000
                        );
                    }
                )
        }



    }])
    .controller('CategoryCreateController' , ['$scope' , '$http' , 'Category' , '$filter' , '$location', function($scope , $http , Category , $filter , $location){

        $scope.category = {
            custom_fields : []
        };

        $scope.sendForm = function() {

            Category.save($scope.category)
                .$promise.then(
                    function(category) {
                        if(angular.isDefined(category.id))
                        {
                            Materialize.toast(
                                $('<span>' + $filter('language')('category_saved' , true) + '</span>'),
                                1000,
                                '',
                                function()
                                {
                                    $scope.$apply(function() {  $location.path('/categories'); })
                                }

                            );
                        }
                    },
                    function(err){

                        var message = '';

                        if(err.status == 400)
                        {
                            angular.forEach(err.data , function(field){
                                angular.forEach(field , function(error){
                                    if(message != '')
                                    {
                                        message += '<br>';
                                    }
                                    message += error;
                                })
                            })
                        }
                        else if(err.status == 500)
                        {
                            message += err.data.error;
                        }
                        else
                        {
                            message += 'server_error';
                        }

                        Materialize.toast($('<span class="error">'+message+'</span>'), 5000);

                    }
                )
        }

        $scope.deleteCustomField = function(k)
        {
            $scope.category.custom_fields.splice(k , 1);
        }

    }])
    .controller('CategoryShowController' , ['$scope' , '$http' , 'Category' , '$routeParams', '$filter' , '$location', function($scope , $http , Category , $routeParams , $filter , $location){

        $scope.category = {};

        Category.get({id : $routeParams.id})
            .$promise.then(
                function(category) {

                    $scope.category = category;

                },
                function(err)
                {
                    $location.path('/categories');
                }
            );

        $scope.isArray = function(value)
        {
            return angular.isArray(value);
        }

        $scope.delete = function(id , k)
        {
            Category.delete({id : id})
                .$promise.then(
                function(category){

                    Materialize.toast(
                        $('<span>' + $filter('language')('category_deleted' , true) + '</span>'),
                        1000,
                        '',
                        function()
                        {
                            $scope.$apply(function() {  $location.path('/categories'); })
                        }
                    );
                },
                function(err)
                {
                    Materialize.toast(
                        $('<span>' + err.data.error + '</span>'),
                        1000
                    );
                }
            )
        }



    }])
    .controller('CategoryEditController' , ['$scope' , '$http' , 'Category' , '$routeParams' , '$filter' , '$location', function($scope , $http , Category , $routeParams, $filter , $location){

        $scope.category = {};

        Category.get({id : $routeParams.id})
            .$promise.then(function(category) {

                category.custom_fields = [];

                angular.forEach(category.custom_data , function(field , f){

                    if(angular.isArray(field.value))
                    {
                        angular.forEach(field.value , function(value){

                            category.custom_fields.push({
                                name : field.name,
                                value : value
                            })
                        })
                    }
                    else
                    {
                        category.custom_fields.push({
                            name : field.name,
                            value : field.value
                        })
                    }

                });

                $scope.category = category;

                console.log($scope.category);

            });

        $scope.sendForm = function() {

            Category.update({ id : $routeParams.id } , $scope.category)
                .$promise.then(
                function(category) {
                    if(angular.isDefined(category.id))
                    {
                        Materialize.toast(
                            $('<span>' + $filter('language')('category_updated' , true) + '</span>'),
                            1000,
                            '',
                            function()
                            {
                                $scope.$apply(function() {  $location.path('/categories'); })
                            }

                        );
                    }
                },
                function(err){

                    var message = '';

                    if(err.status == 400)
                    {
                        angular.forEach(err.data , function(field){
                            angular.forEach(field , function(error){
                                if(message != '')
                                {
                                    message += '<br>';
                                }
                                message += error;
                            })
                        })
                    }
                    else if(err.status == 500)
                    {
                        message += err.data.error;
                    }
                    else
                    {
                        message += 'server_error';
                    }

                    Materialize.toast($('<span class="error">'+message+'</span>'), 5000);

                }
            )
        }

        $scope.deleteCustomField = function(k)
        {
            $scope.category.custom_fields.splice(k , 1);
        }

    }])
    .controller('CategoryFormController' , ['$scope' , function($scope){

    }])