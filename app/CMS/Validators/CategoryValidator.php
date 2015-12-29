<?php

namespace CMS\Validators;

use CMS\Entities\CategoryEntity as Entity;

/**
 * Class CategoryValidator
 * @package CMS\Validators
 */
class CategoryValidator extends BaseValidator {

    /**
     * @var array
     */
    protected $rules = array(
        'name' => 'required|unique:categories,name',
        'slug' => 'required',
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