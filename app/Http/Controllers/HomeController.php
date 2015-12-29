<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use CMS\Repositories\PostRepository as Repository;

class HomeController extends Controller
{
    protected $repository;

    public function __construct(Repository $Repository)
    {
        $this->repository = $Repository;
    }

    public function index(Request $request)
    {
        $skills = $this->repository->getByCategory('skills');

        return response()->json($skills);
    }
}
