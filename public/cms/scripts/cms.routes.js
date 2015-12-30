    'use strict'

angular.module('cms.routes', [])
    .config(['$routeProvider' , 'checkLoginProvider' , 'checkGuestProvider', function ($routeProvider , checkLoginProvider , checkGuestProvider) {

        var checkLoggedIn = checkLoginProvider.$get;
        var checkGuest = checkGuestProvider.$get;

        $routeProvider
            .when('/login', {
                templateUrl: "views/users/login.html",
                controller: "LoginController",
                resolve: {
                    guest: checkGuest
                }
            })
            .when('/', {
                templateUrl: "views/posts/index.html",
                controller: "PostIndexController",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/posts' , {
                templateUrl: "views/posts/index.html",
                controller: "PostIndexController",
                resolve : {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/posts/create' , {
                templateUrl: "views/posts/create.html",
                controller: "PostCreateController",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/posts/:id', {
                templateUrl: "views/posts/show.html",
                controller: "PostShowController",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/posts/:id/edit', {
                templateUrl: "views/posts/edit.html",
                controller: "PostEditController",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/categories' , {
                templateUrl: "views/categories/index.html",
                controller: "CategoryIndexController",
                resolve : {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/categories/create' , {
                templateUrl: "views/categories/create.html",
                controller: "CategoryCreateController",
                resolve : {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/categories/:id' , {
                templateUrl: "views/categories/show.html",
                controller: "CategoryShowController",
                resolve : {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/categories/:id/edit' , {
                templateUrl: "views/categories/edit.html",
                controller: "CategoryEditController",
                resolve : {
                    loggedIn: checkLoggedIn
                }
            })
    }])
