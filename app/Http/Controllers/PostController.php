<?php

namespace App\Http\Controllers;

use IG\Repositories\PostRepository as Repository;
use IG\Managers\PostManager as Manager;

class PostController extends BaseController
{

    public function __construct(Repository $Repository , Manager $Manager)
    {
       parent::__construct($Repository , $Manager);
    }
}
