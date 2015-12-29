'use strict'

angular.module('cms.routes',[
        'ngRoute'
    ])
    .config(['$routeProvider' , function($routeProvider){

        $routeProvider
            .when('/' , {
                templateUrl: "views/posts/index.html",
                controller: "PostIndexController",
                resolve : {

                }
            })
            .when('/posts' , {
                templateUrl: "views/posts/index.html",
                controller: "PostIndexController",
                resolve : {

                }
            })
            .when('/posts/create' , {
                templateUrl: "views/posts/create.html",
                controller: "PostCreateController",
                resolve : {

                }
            })
            .when('/posts/:id' , {
                templateUrl: "views/posts/show.html",
                controller: "PostShowController",
                resolve : {

                }
            })
            .when('/posts/:id/edit' , {
                templateUrl: "views/posts/edit.html",
                controller: "PostEditController",
                resolve : {

                }
            })
            .when('/categories' , {
                templateUrl: "views/categories/index.html",
                controller: "CategoryIndexController",
                resolve : {

                }
            })
            .when('/categories/create' , {
                templateUrl: "views/categories/create.html",
                controller: "CategoryCreateController",
                resolve : {

                }
            })
            .when('/categories/:id' , {
                templateUrl: "views/categories/show.html",
                controller: "CategoryShowController",
                resolve : {

                }
            })
            .when('/categories/:id/edit' , {
                templateUrl: "views/categories/edit.html",
                controller: "CategoryEditController",
                resolve : {

                }
            })
    }])
