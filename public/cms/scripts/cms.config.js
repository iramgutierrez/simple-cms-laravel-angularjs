'use strict'

angular.module('cms.config', [
    'validation',
    'validation.rule'
])
    .value('config', {
        locale: 'es',
        backendUrl : ''
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

    .config(function($provide) {
        // this demonstrates how to register a new tool and add it to the default toolbar
        $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions) { // $delegate is the taOptions we are decorating
            /*taRegisterTool('blackspace', {
             buttontext: ' ',
             action: function() {

             }
             });
             taOptions.toolbar[1].push('blackspace');
             taRegisterTool('colourRed', {
             iconclass: "fa fa-square red",
             action: function() {
             this.$editor().wrapSelection('forecolor', 'red');
             }
             });
             // add the button to the default toolbar definition
             taOptions.toolbar[1].push('colourRed');*/

            taOptions.toolbar = [
                ['h1', 'h2', 'h3', 'h4', 'h5', 'h6','p', 'pre', 'quote','bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear','justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent','html', 'insertImage','insertLink', 'insertVideo']
            ];

            return taOptions;

        }]);

    })
