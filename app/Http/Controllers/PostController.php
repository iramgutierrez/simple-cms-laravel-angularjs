<?php

namespace App\Http\Controllers;

use CMS\Repositories\PostRepository as Repository;
use CMS\Managers\PostManager as Manager;
use Illuminate\Http\Request;

class PostController extends BaseController
{

    public function __construct(Repository $Repository, Manager $Manager)
    {
        parent::__construct($Repository, $Manager);

        $this->middleware('auth');
    }

    public function uploadImage(Request $request)
    {

        if(!$request->hasFile('image'))
        {
            return response()->json([
                'error' => 'Image file is required'
            ], 400);
        }

        if(!$request->file('image')->isValid())
        {
            return response()->json([
                'error' => 'Invalid file'
            ], 400);
        }

        $image = $request->file('image');

        $filename = time().'.jpg';

        if($image->move('cms/posts_images' , $filename))
        {

            return response()->json([
                'name' => $filename
            ], 200);
        }
        else
        {
            return response()->json([
                'response' => 'Server error'
            ], 500);
        }
    }

}
