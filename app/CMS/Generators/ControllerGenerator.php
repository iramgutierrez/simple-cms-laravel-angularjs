<?php

namespace CMS\Generators;

use Memio\Memio\Config\Build;
use Memio\Model\File;
use Memio\Model\Object;
use Memio\Model\Property;
use Memio\Model\Method;
use Memio\Model\Argument;
use Memio\Model\Constant;
use Memio\Model\FullyQualifiedName;
use Memio\Model\Phpdoc\LicensePhpdoc;
use Memio\Model\Phpdoc\ApiTag;
use Memio\Model\Phpdoc\Description;
use Memio\Model\Phpdoc\DeprecationTag;
use Memio\Model\Phpdoc\MethodPhpdoc;
use Memio\Model\Phpdoc\ParameterTag;

use Illuminate\Http\Request;

use App\Http\Controllers\CMS\BaseController;

class ControllerGenerator extends BaseGenerator{

    protected $prefix;

    protected $documentation;

    protected $pathfile = 'app/Http/Controllers/CMS/';

    protected $layer = 'Controller';

    protected $namespace = 'App\\Http\\Controllers\\CMS\\';

    public function generate()
    {

        $prefix = ($this->prefix) ? $this->prefix.'/' : '';

        $repository = File::make($this->filename)
            ->setLicensePhpdoc(new LicensePhpdoc(self::PROJECT_NAME, self::AUTHOR_NAME, self::AUTHOR_EMAIL))
            ->addFullyQualifiedName(new FullyQualifiedName(\Illuminate\Http\Request::class))
            ->addFullyQualifiedName(new FullyQualifiedName("CMS\Repositories\\".$this->entity."Repository as Repository"))
            ->addFullyQualifiedName(new FullyQualifiedName("CMS\Managers\\".$this->entity."Manager as Manager"))
            ->setStructure(
                Object::make($this->namespace.$this->entity.$this->layer)
                    ->extend(new Object(BaseController::class))
                    ->addMethod(
                        Method::make('__construct')
                            ->addArgument(new Argument('Repository', 'Repository'))
                            ->addArgument(new Argument('Manager', 'Manager'))
                            ->setBody('        return parent::__construct($Repository , $Manager);')
                    )
                    ->addMethod(
                        Method::make('index')
                            ->setPhpdoc(MethodPhpdoc::make()
                                ->setDescription(Description::make('@api {get} /'.$prefix.snake_case(str_plural($this->entity)).' 1 Request all '.snake_case(str_plural($this->entity)))
                                    ->addLine('@apiVersion 1.0.0')
                                    ->addLine('@apiName All'.str_plural($this->entity))
                                    ->addLine('@apiGroup '.str_plural($this->entity))
                                    ->addEmptyLine()
                                    ->addLine('@apiSuccess {Array[]} '.snake_case(str_plural($this->entity)).' List of '.snake_case(str_plural($this->entity)).'.')
                                    ->addLine('@apiSuccess {Number} '.snake_case(str_plural($this->entity)).'.id Id.')
                                    ->addLine('@apiSuccess {DateTime} '.snake_case(str_plural($this->entity)).'.created_at  Created date.')
                                    ->addLine('@apiSuccess {DateTime} '.snake_case(str_plural($this->entity)).'.updated_at  Last modification date.')
                                    ->addEmptyLine()
                                    ->addLine("@apiSuccessExample Success Response Example")
                                    ->addLine(" HTTP/1.1 200 OK")
                                    ->addLine("[")
                                    ->addLine("    {")
                                    ->addLine('        id: 1,')
                                    ->addLine('        created_at: '.date('Y-m-d h:i:s').',')
                                    ->addLine('        updated_at: '.date('Y-m-d h:i:s'))
                                    ->addLine("    },")
                                    ->addLine("    {")
                                    ->addLine('        id: 2,')
                                    ->addLine('        created_at: '.date('Y-m-d h:i:s').',')
                                    ->addLine('        updated_at: '.date('Y-m-d h:i:s'))
                                    ->addLine("    }")
                                    ->addLine("]")
                                )

                            )
                            ->addArgument(new Argument('Request', 'Request'))
                            ->setBody('        return parent::index($Request);')
                    )
                    ->addMethod(
                        Method::make('show')
                            ->setPhpdoc(MethodPhpdoc::make()
                                ->setDescription(Description::make('@api {get} /'.$prefix.snake_case(str_plural($this->entity)).'/:id 2 Request a specific '.snake_case($this->entity))
                                    ->addLine('@apiVersion 1.0.0')
                                    ->addLine('@apiName Get'.str_plural($this->entity))
                                    ->addLine('@apiGroup '.str_plural($this->entity))
                                    ->addEmptyLine()
                                    ->addLine('@apiSuccess {Number} id Id.')
                                    ->addLine('@apiSuccess {DateTime} created_at  Created date.')
                                    ->addLine('@apiSuccess {DateTime} updated_at  Last modification date.')
                                    ->addEmptyLine()
                                    ->addLine("@apiSuccessExample {json} Success Response Example")
                                    ->addLine(" HTTP/1.1 200 OK")
                                    ->addLine("{")
                                    ->addLine('    id: 1,')
                                    ->addLine('    created_at: '.date('Y-m-d h:i:s').',')
                                    ->addLine('    updated_at: '.date('Y-m-d h:i:s'))
                                    ->addLine("}")
                                    ->addEmptyLine()
                                    ->addLine("@apiError {string} error The id of the ".snake_case($this->entity)." was not found.")
                                    ->addEmptyLine()
                                    ->addLine("@apiErrorExample {json} Error Response Example")
                                    ->addLine("  HTTP/1.1 404 Not Found")
                                    ->addLine("{")
                                    ->addLine('    error: Entity not found')
                                    ->addLine("}")
                                )

                            )
                            ->addArgument(new Argument('Request', 'Request'))
                            ->addArgument(new Argument('integer','id'))
                            ->setBody('        return parent::show($Request , $id);')
                    )
                    ->addMethod(
                        Method::make('store')
                            ->addArgument(new Argument('Request', 'Request'))
                            ->setBody('        return parent::store($Request);')
                    )
                    ->addMethod(
                        Method::make('update')
                            ->addArgument(new Argument('Request', 'Request'))
                            ->addArgument(new Argument('integer','id'))
                            ->setBody('        return parent::update($Request , $id);')
                    )
                    ->addMethod(
                        Method::make('destroy')
                            ->addArgument(new Argument('Request', 'Request'))
                            ->addArgument(new Argument('integer','id'))
                            ->setBody('        return parent::destroy($Request , $id);')
                    )
            );

        $prettyPrinter = Build::prettyPrinter();
        $generatedCode = $prettyPrinter->generateCode($repository);

        $myfile = fopen($this->filename, "w") or die("Unable to open file!");
        fwrite($myfile, $generatedCode);
        fclose($myfile);

        return "File ".$this->filename." created successfully";
    }

    public function setPrefix($prefix)
    {
        $this->prefix = $prefix;
    }

    public function setDocumentation($documentation)
    {
        $this->documentation = $documentation;
    }
}