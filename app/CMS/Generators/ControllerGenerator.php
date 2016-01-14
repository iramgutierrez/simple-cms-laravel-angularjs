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

use Illuminate\Http\Request;

use App\Http\Controllers\CMS\BaseController;

class ControllerGenerator extends BaseGenerator{

    protected $pathfile = 'app/Http/Controllers/CMS/';

    protected $layer = 'Controller';

    protected $namespace = 'app\\Http\\Controllers\\CMS\\';

    public function generate()
    {
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
                            ->addArgument(new Argument('Request', 'Request'))
                            ->setBody('        return parent::index($Request);')
                    )
                    ->addMethod(
                        Method::make('show')
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
}