'use strict'

angular.module(
    'cms',
    [
        'validation',
        'validation.rule',
        'ngRoute',
        'ngResource',
        'cms.config',
        'cms.language',
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