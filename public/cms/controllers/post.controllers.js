'use strict'

angular.module('post.controllers' , [])
    .controller('PostIndexController' , ['$scope' , '$http' , 'Post', function($scope , $http , Post){

        $scope.posts = [];

        Post.all()
            .$promise.then(function(posts) {

                $scope.posts = posts;

            });



    }])
    .controller('PostCreateController' , ['$scope' , '$http' , 'Post' , '$filter' , '$location', function($scope , $http , Post , $filter , $location){

        $scope.post = {
            custom_fields : []
        };

        $scope.sendForm = function() {

            Post.save($scope.post)
                .$promise.then(
                    function(post) {
                        if(angular.isDefined(post.id))
                        {
                            Materialize.toast(
                                $('<span>' + $filter('language')('post_saved' , true) + '</span>'),
                                1000,
                                '',
                                function()
                                {
                                    $scope.$apply(function() {  $location.path('/posts/'+post.id); })
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

    }])
    .controller('PostShowController' , ['$scope' , '$http' , 'Post' , '$routeParams', function($scope , $http , Post , $routeParams){

        $scope.post = {};

        Post.get({id : $routeParams.id})
            .$promise.then(function(post) {

                $scope.post = post;

                console.log($scope.post);

            });

        $scope.isArray = function(value)
        {
            return angular.isArray(value);
        }



    }])
    .controller('PostEditController' , ['$scope' , '$http' , 'Post' , '$routeParams' , '$filter' , '$location', function($scope , $http , Post , $routeParams, $filter , $location){

        $scope.post = {};

        Post.get({id : $routeParams.id})
            .$promise.then(function(post) {

                post.custom_fields = [];

                angular.forEach(post.custom_data , function(field , f){

                    if(angular.isArray(field.value))
                    {
                        angular.forEach(field.value , function(value){

                            post.custom_fields.push({
                                name : field.name,
                                value : value
                            })
                        })
                    }
                    else
                    {
                        post.custom_fields.push({
                            name : field.name,
                            value : field.value
                        })
                    }

                });

                $scope.post = post;

                console.log($scope.post);

            });

        $scope.sendForm = function() {

            Post.update({ id : $routeParams.id } , $scope.post)
                .$promise.then(
                function(post) {
                    if(angular.isDefined(post.id))
                    {
                        Materialize.toast(
                            $('<span>' + $filter('language')('post_updated' , true) + '</span>'),
                            1000,
                            '',
                            function()
                            {
                                $scope.$apply(function() {  $location.path('/posts/'+post.id); })
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

    }])
    .controller('FormController' , ['$scope' , function($scope){

        $scope.categories = [
            {
                id : 1,
                name : 'Categoria 1'
            },
            {
                id : 2,
                name : 'Categoria 2'
            }
        ];

        $scope.isArray = function(value)
        {
            return angular.isArray(value);
        }

        $scope.initSelect = function()
        {
            setTimeout(function(){
                $('select').material_select();
            },1000);

        }

        $scope.initTextarea = function(el)
        {
            $(el).characterCounter();
        }

        $scope.addCustomField = function()
        {
            $scope.post.custom_fields.push({
                name : '',
                value : ''
            });

        }

    }])