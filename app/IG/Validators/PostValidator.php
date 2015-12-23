<?php

namespace IG\Validators;

use IG\Entities\PostEntity as Entity;

/**
 * Class PostValidator
 * @package IG\Validators
 */
class PostValidator extends BaseValidator {

    /**
     * @var array
     */
    protected $rules = array(
        'name' => 'required|unique:posts,name',
        'slug' => 'required',
        'category_id' => 'required|exists:categories,id',
        'excerpt' => 'required',
        'content' => 'required',

    );

    /**
     * @param Entity $Entity
     */
    public function __construct(Entity $Entity)
    {
        return parent::__construct($Entity);
    }


    /**
     * @return Rules
     */
    public function getUpdateRules()
    {
        $rules = $this->getRules();

        if(!empty($this->data['name']) && !empty($rules['name']) )
        {
            $rules['name'] .= ','.$this->entity->id;
        }

        return $rules;
    }

}