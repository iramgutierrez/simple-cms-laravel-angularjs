'use strict'

angular.module('post.controllers' , [])
    .controller('PostIndexController' , ['$scope' , '$http' , 'Post' , '$filter', function($scope , $http , Post , $filter){

        $scope.posts = [];

        Post.all()
            .$promise.then(function (posts) {

                $scope.posts = posts;

            });

        $scope.delete = function(id , k)
        {
            Post.delete({id : id})
                .$promise.then(
                    function(post){

                        $scope.posts.splice(k , 1);

                        Materialize.toast(
                            $('<span>' + $filter('language')('post_deleted' , true) + '</span>'),
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
    .controller('PostCreateController', ['$scope', '$http', 'Post', '$filter', '$location' , 'fileUpload', function ($scope, $http, Post, $filter, $location , fileUpload) {

        $scope.post = {
            custom_fields: [],
            available : true
        };

        var imagesPermitted = ['image/jpeg' , 'image/png'];

        $scope.image = false;

        $scope.sendForm = function () {

            if(angular.isDefined($scope.image.type) )
            {
                if(!(imagesPermitted.indexOf($scope.image.type) !== -1) )
                {
                    Materialize.toast(
                        $('<span  class="error">' + $filter('language')('invalid_format_image', true) + '</span>'),
                        1000
                    )
                }
                else
                {
                    var file = $scope.image;

                    if(file)
                    {

                        var uploadUrl = "posts/upload-image/";

                        fileUpload.uploadFileToUrl(file, uploadUrl , 'image')
                            .then(
                            function(response)
                            {
                                $scope.post.image= response.name;

                                $scope.save();


                            }
                        )


                    }
                }
            }
            else
            {

                $scope.save();
            }



        }

        $scope.save = function()
        {

            Post.save($scope.post)
                .$promise.then(
                function (post) {
                    if (angular.isDefined(post.id)) {
                        Materialize.toast(
                            $('<span>' + $filter('language')('post_saved', true) + '</span>'),
                            1000,
                            '',
                            function () {
                                $scope.$apply(function () {
                                    $location.path('/posts/' + post.id);
                                })
                            }
                        );
                    }
                },
                function (err) {

                    var message = '';

                    if (err.status == 400) {
                        angular.forEach(err.data, function (field) {
                            angular.forEach(field, function (error) {
                                if (message != '') {
                                    message += '<br>';
                                }
                                message += error;
                            })
                        })
                    }
                    else if (err.status == 500) {
                        message += err.data.error;
                    }
                    else {
                        message += 'server_error';
                    }

                    Materialize.toast($('<span class="error">' + message + '</span>'), 5000);

                }
            )
        }

        $scope.deleteCustomField = function(k)
        {
            $scope.post.custom_fields.splice(k , 1);
        }

    }])
    .controller('PostShowController' , ['$scope' , '$http' , 'Post' , '$routeParams', '$filter' , '$location', function($scope , $http , Post , $routeParams , $filter , $location){

        $scope.post = {};

        Post.get({id : $routeParams.id})
            .$promise.then(
                function(post) {

                    $scope.post = post;

                },
                function(err)
                {
                    $location.path('/posts');
                }
            );

        $scope.isArray = function (value) {
            return angular.isArray(value);
        }

        $scope.delete = function(id , k)
        {
            Post.delete({id : id})
                .$promise.then(
                function(post){

                    Materialize.toast(
                        $('<span>' + $filter('language')('post_deleted' , true) + '</span>'),
                        1000,
                        '',
                        function()
                        {
                            $scope.$apply(function() {  $location.path('/posts'); })
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
    .controller('PostEditController', ['$scope', '$http', 'Post', '$routeParams', '$filter', '$location' , 'fileUpload', function ($scope, $http, Post, $routeParams, $filter, $location , fileUpload) {

        $scope.post = {};

        Post.get({id: $routeParams.id})
            .$promise.then(function (post) {

                post.custom_fields = [];

                post.available = (post.available == 1) ? true : false;

                angular.forEach(post.custom_data, function (field, f) {

                    if (angular.isArray(field.value)) {
                        angular.forEach(field.value, function (value) {

                            post.custom_fields.push({
                                name: field.name,
                                value: value
                            })
                        })
                    }
                    else {
                        post.custom_fields.push({
                            name: field.name,
                            value: field.value
                        })
                    }

                });

                $scope.post = post;

                console.log($scope.post);

            });



        var imagesPermitted = ['image/jpeg' , 'image/png'];

        $scope.image = false;

        $scope.sendForm = function () {

            if(angular.isDefined($scope.image.type) )
            {
                if(!(imagesPermitted.indexOf($scope.image.type) !== -1) )
                {
                    Materialize.toast(
                        $('<span  class="error">' + $filter('language')('invalid_format_image', true) + '</span>'),
                        1000
                    )
                }
                else
                {
                    var file = $scope.image;

                    if(file)
                    {

                        var uploadUrl = "posts/upload-image/";

                        fileUpload.uploadFileToUrl(file, uploadUrl , 'image')
                            .then(
                            function(response)
                            {
                                $scope.post.image= response.name;

                                $scope.update();


                            }
                        )


                    }
                }
            }
            else
            {

                $scope.update();
            }



        }

        $scope.update = function () {

            Post.update({id: $routeParams.id}, $scope.post)
                .$promise.then(
                function (post) {
                    if (angular.isDefined(post.id)) {
                        Materialize.toast(
                            $('<span>' + $filter('language')('post_updated', true) + '</span>'),
                            1000,
                            '',
                            function () {
                                $scope.$apply(function () {
                                    $location.path('/posts/' + post.id);
                                })
                            }
                        );
                    }
                },
                function (err) {

                    var message = '';

                    if (err.status == 400) {
                        angular.forEach(err.data, function (field) {
                            angular.forEach(field, function (error) {
                                if (message != '') {
                                    message += '<br>';
                                }
                                message += error;
                            })
                        })
                    }
                    else if (err.status == 500) {
                        message += err.data.error;
                    }
                    else {
                        message += 'server_error';
                    }

                    Materialize.toast($('<span class="error">' + message + '</span>'), 5000);

                }
            )
        }

        $scope.deleteCustomField = function(k)
        {
            $scope.post.custom_fields.splice(k , 1);
        }

    }])
    .controller('PostFormController' , ['$scope' , 'Category' , function($scope , Category){

        $scope.categories = [];

        Category.all()
            .$promise.then(
                function(categories)
                {
                    $scope.categories = categories;
                }
            );

        $scope.isArray = function (value) {
            return angular.isArray(value);
        }

        $scope.initSelect = function () {
            setTimeout(function () {
                $('select').material_select();
            }, 1000);

        }

        $scope.initTextarea = function (el) {
            $(el).characterCounter();
        }

        $scope.addCustomField = function () {
            $scope.post.custom_fields.push({
                name: '',
                value: ''
            });

        }

    }])