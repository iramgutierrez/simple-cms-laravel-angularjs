'use strict'

angular.module('cms.language' , [])
    .value('lang' , {
        es : {
            company : 'CMS',
            posts : 'entradas',
            categories : 'categorias',
            logout : 'salir',
            name : 'nombre',
            slug : 'slug',
            available : 'disponible',
            excerpt : 'extracto',
            content : 'contenido',
            category : 'categoría',
            created_date : 'fecha de creación',
            updated_date : 'última modificación',
            custom_fields : 'campos personalizados',
            field : 'campo',
            value : 'valor',
            post_saved : 'entrada guardada',
            post_updated : 'entrada actualizada',
            post_deleted : 'entrada eliminada',
            category_saved : 'categoría guardada',
            category_updated : 'categoría actualizada',
            category_deleted : 'categoría eliminada',
            invalid_format_image : 'formato de imagen invalido',
            image : 'imagen',
            username : 'nombre de usuario',
            password : 'contraseña',
            unauthorized : 'no autorizado',
            server_error : 'error de servidor',
            the_name_field_is_required : 'el campo nombre es requerido',
            the_category_id_field_is_required : 'el campo categoría es requerido',
            the_excerpt_field_is_required : 'el campo extracto es requerido',
            the_content_field_is_required : 'el campo contenido es requerido',
            the_name_has_already_been_taken : 'el campo nombre tiene que ser único'
        },
        en: {

        }
    })
    .factory('language' , ['$http' ,'$q' , 'config' , 'lang', function($http , $q , config , lang){

        function get(input , capitalize) {

            var locale = config.locale;

            if(lang.hasOwnProperty(locale))
            {
                if (lang[locale].hasOwnProperty(input)) {

                    input = lang[locale][input]
                }
            }

            if (capitalize) {
                return input.toLowerCase().substring(0, 1).toUpperCase() + input.substring(1);
            }

            return input;


        }

        return {
            get : get
        }
        
    }])
    .filter('language', function (config, language , $q) {

            return function(input, capitalize) {

                var input = input || '';

                var capitalize = capitalize || false;

                return language.get(input , capitalize);

            }

    })