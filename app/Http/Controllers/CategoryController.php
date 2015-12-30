<?php

namespace App\Http\Controllers;

use CMS\Repositories\CategoryRepository as Repository;
use CMS\Managers\CategoryManager as Manager;

class CategoryController extends BaseController
{

    public function __construct(Repository $Repository , Manager $Manager)
    {
       parent::__construct($Repository , $Manager);
    }
}