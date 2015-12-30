<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use CMS\Repositories\CategoryRepository as Repository;
use CMS\Managers\CategoryManager as Manager;
use App\Http\Controllers\BaseController;
use Illuminate\Support\Facades\Input;

class CategoryController extends BaseController
{

    public function __construct(Repository $Repository , Manager $Manager)
    {
       parent::__construct($Repository , $Manager);
    }

    public function index(Request $request)
    {
        $posts = (Input::has('posts') && Input::get('posts') == 'true') ? true : false;

        if($posts)
        {
            return response()->json($this->repository->allWithPosts());
        }

        return response()->json($this->repository->all());
    }

    public function show(Request $request, $id)
    {
        $posts = (Input::has('posts') && Input::get('posts') == 'true') ? true : false;

        if(is_numeric($id))
        {
            if($posts)
            {
                $resource = $this->repository->findByIdWithPosts($id);
            }
            else
            {
                $resource = $this->repository->findById($id);
            }

        }
        else
        {
            if($posts)
            {
                $resource = $this->repository->findBySlugWithPosts($id);
            }
            else
            {
                $resource = $this->repository->findBySlug($id);
            }
        }

        if (!$resource) {
            return response()->json(['error' => 'Entity not found'], 404);
        }
        return response()->json($resource);
    }

    public function getPosts($id)
    {
        if(is_numeric($id))
        {
            $resource = $this->repository->findByIdWithPosts($id);

        }
        else
        {
            $resource = $this->repository->findBySlugWithPosts($id);
        }

        if (!$resource) {
            return response()->json(['error' => 'Entity not found'], 404);
        }
        return response()->json($resource->posts);
    }

}
