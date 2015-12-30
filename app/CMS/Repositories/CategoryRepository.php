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
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function allWithPosts()
    {
        return $this->entity->with('posts.custom_fields')->get();
    }

    /**
     * @param $id
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null
     */
    public function findById($id)
    {
        return $this->entity->find($id);
    }

    /**
     * @param $id
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null
     */
    public function findByIdWithPosts($id)
    {
        return $this->entity->with('posts.custom_fields')->find($id);
    }


    /**
     * @param $slug
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null
     */
    public function findBySlug($slug)
    {
        return $this->entity->where('slug',$slug)->first();
    }

    /**
     * @param $id
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null
     */
    public function findBySlugWithPosts($slug)
    {
        return $this->entity->with('posts.custom_fields')->where('slug',$slug)->first();
    }
}