<?php

namespace CMS\Repositories;

use CMS\Entities\CategoryEntity as Entity;

/**
 * Class CategoryRepository
 * @package CMS\Repositories
 */
class CategoryRepository extends BaseRepository{

    /**
     * @var Category
     */
    protected $category;

    /**
     * @param Entity $Entity
     * @param Category $Category
     */
    public function __construct(Entity $Entity)
    {
        parent::__construct($Entity);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function all()
    {
        return $this->entity->get();
    }

    /**
     * @param $id
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null
     */
    public function findById($id)
    {
        return $this->entity->with('posts.custom_fields')->find($id);
    }
}