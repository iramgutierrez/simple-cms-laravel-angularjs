<?php

namespace IG\Managers;

use IG\Entities\CustomFieldEntity;
use IG\Entities\CategoryEntity as Entity;
use IG\Validators\CategoryValidator as Validator;

/**
 * Class CategoryRepository
 * @package IG\Repositories
 */
class CategoryManager extends BaseManager{


    /**
     * @param Entity $Entity
     * @param Category $Category
     */
    public function __construct(Entity $Entity , Validator $Validator)
    {
        parent::__construct($Entity , $Validator);
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