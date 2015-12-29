<?php

namespace App\Http\Controllers;

use IG\Repositories\CategoryRepository as Repository;
use IG\Managers\CategoryManager as Manager;

class CategoryController extends BaseController
{

    public function __construct(Repository $Repository , Manager $Manager)
    {
       parent::__construct($Repository , $Manager);
    }
}
