'use strict'

angular.module('cms.components', [])
    .directive('postForm', function () {
        return {
            restrict: 'E',
            scope: '&',
            templateUrl: '/cms/views/posts/components/form.html',
            controller: 'PostFormController'
        };
    })
    .directive('categoryForm', function() {
        return {
            restrict: 'E',
            scope: '&',
            templateUrl: '/cms/views/categories/components/form.html',
            controller: 'CategoryFormController'
        };
    })
