'use strict'

angular.module('cms.config', [
    'validation',
    'validation.rule'
])
    .value('config', {
        locale: 'es',
        backendUrl : 'http://localhost:8000'
    })
    .config(['$validationProvider', function ($validationProvider) {

        $validationProvider
            .setErrorHTML(function (msg) {

                return "<label class=\"control-label has-error error\">" + msg + "</label>";

            })
            .setDefaultMsg({
                required: {
                    error: 'Requerido',
                    success: ''
                },
                number: {
                    error: 'Debes ingresar un número',
                    success: ''
                }
            });
    }])
