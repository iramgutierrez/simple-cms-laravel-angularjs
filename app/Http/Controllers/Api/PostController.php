<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use CMS\Repositories\PostRepository as Repository;
use CMS\Managers\PostManager as Manager;
use App\Http\Controllers\CMS\BaseController;

class PostController extends BaseController
{

    public function __construct(Repository $Repository, Manager $Manager)
    {
        parent::__construct($Repository, $Manager);
    }

    public function show(Request $request, $id)
    {
        if(is_numeric($id))
        {

            $resource = $this->repository->findById($id);
        }
        else
        {

            $resource = $this->repository->findBySlug($id);
        }

        if (!$resource) {
            return response()->json(['error' => 'Entity not found'], 404);
        }
        return response()->json($resource);
    }

}
