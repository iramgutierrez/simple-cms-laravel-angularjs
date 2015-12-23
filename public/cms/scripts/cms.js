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
        'cms.routes',
        'post.controllers',
        'post.services',
        'cms.components',
    ]
)