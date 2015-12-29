'use strict'

angular.module('cms.language' , [])
    .value('language' , {
        es : {
            company : 'CMS',
            posts : 'entradas',
            categories : 'categorías',
            logout : 'salir',
            name : 'nombre',
            slug : 'slug',
            available : 'disponible',
            excerpt : 'extracto',
            content : 'contenido',
            category : 'categoria',
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
            category_deleted : 'categoría eliminada'
        },
        en : {

        }
    })
    .filter('language' , ['config' , 'language' , function(config , language){

        return function(input , capitalize) {

            var input = input || '';

            var capitalize = capitalize || false;

            if(config.hasOwnProperty('locale'))
            {
                var locale = config.locale;

                if(language.hasOwnProperty(locale))
                {
                    var lang = language[locale]

                    if(lang.hasOwnProperty(input)){

                        input = lang[input]
                    }
                }
            }

            if(capitalize)
            {
                return input.toLowerCase().substring(0,1).toUpperCase()+input.substring(1);
            }

            return input;

        }

    }])