'use strict'

angular.module(
    'cms',
    [
        'validation',
        'validation.rule',
        'ngRoute',
        'ngResource',
        'angular.filter',
        'textAngular',
        'cms.config',
        'cms.language',
        'cms.root',
        'cms.middleware',
        'cms.routes',
        'user.controllers',
        'post.controllers',
        'post.services',
        'category.controllers',
        'category.services',
        'cms.components',
    ]
)