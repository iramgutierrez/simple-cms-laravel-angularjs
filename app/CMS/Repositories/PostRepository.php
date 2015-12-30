<?php

namespace CMS\Repositories;

use CMS\Entities\PostEntity as Entity;
use CMS\Entities\CategoryEntity as Category;

/**
 * Class PostRepository
 * @package CMS\Repositories
 */
class PostRepository extends BaseRepository
{

    /**
     * @var Category
     */
    protected $category;

    /**
     * @param Entity $Entity
     * @param Category $Category
     */
    public function __construct(Entity $Entity, Category $Category)
    {
        parent::__construct($Entity);

        $this->category = $Category;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function all()
    {
        return $this->entity->with('category')->get();
    }

    /**
     * @param $id
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null
     */
    public function findById($id)
    {
        return $this->entity->with('category', 'custom_fields')->find($id);
    }

    public function findBySlug($slug)
    {
        return $this->entity->with('category', 'custom_fields')->where('slug',$slug)->first();
    }


    /**
     * @param $category_name
     * @return array
     */
    public function getByCategory($category_name)
    {
        $category = $this->category->where('slug', $category_name)->first();

        if (!$category) {
            return [];
        }

        return $this->entity->where('category_id', $category->id)->get();
    }
}