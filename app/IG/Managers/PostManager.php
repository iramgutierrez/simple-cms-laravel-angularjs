<?php

namespace IG\Managers;

use IG\Entities\CustomFieldEntity;
use IG\Entities\PostEntity as Entity;
use IG\Validators\PostValidator as Validator;

/**
 * Class PostRepository
 * @package IG\Repositories
 */
class PostManager extends BaseManager{


    /**
     * @param Entity $Entity
     * @param Category $Category
     */
    public function __construct(Entity $Entity , Validator $Validator)
    {
        parent::__construct($Entity , $Validator);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function save($data)
    {
        $response = parent::save($data);

        if($response instanceof Entity)
        {

            $response->custom_fields()->delete();

            $custom_fields = [];

            foreach($this->data['custom_fields'] as $field)
            {
                $field['field'] = isset($field['name']) ? $field['name'] : '';

                if(!empty($field['field']))
                {
                    $field['slug'] = str_slug($field['field']);

                    array_push(
                        $custom_fields,
                        new CustomFieldEntity($field)
                    );

                }
            }

            $response->custom_fields()->saveMany($custom_fields);
        }

        return $response;

    }

    public function update($data)
    {
        $response = parent::update($data);

        if($response instanceof Entity)
        {

            $response->custom_fields()->delete();

            $custom_fields = [];

            foreach($this->data['custom_fields'] as $field)
            {
                $field['field'] = isset($field['name']) ? $field['name'] : '';

                if(!empty($field['field']))
                {
                    $field['slug'] = str_slug($field['field']);

                    array_push(
                        $custom_fields,
                        new CustomFieldEntity($field)
                    );

                }
            }

            $response->custom_fields()->saveMany($custom_fields);
        }

        return $response;

    }

    /**
     *
     */

    public function prepareData()
    {
        $data = $this->data;

        if(isset($data['name']))
        {
            $data['slug'] = str_slug($data['name']);
        }

        $this->data = $data;

    }
}