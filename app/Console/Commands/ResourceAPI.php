<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use CMS\Generators\EntityGenerator as Entity;
use CMS\Generators\RepositoryGenerator as Repository;
use CMS\Generators\ValidatorGenerator as Validator;
use CMS\Generators\ManagerGenerator as Manager;
use CMS\Generators\ControllerGenerator as Controller;

class ResourceAPI extends Command
{
    protected $base;

    protected $table;

    protected $entity;

    protected $repository;

    protected $validator;

    protected $manager;

    protected $controller;

    protected $layers = [
        'entity',
        'repository',
        'validator',
        'manager',
        'controller',
    ];

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create-resource-api
                            {entity : The entity singular name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate a new API Resource';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(Entity $Entity, Repository $Repository, Validator $Validator, Manager $Manager, Controller $Controller)
    {
        parent::__construct();

        $this->entity = $Entity;

        $this->repository = $Repository;

        $this->validator = $Validator;

        $this->manager = $Manager;

        $this->controller = $Controller;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        $this->base = ucfirst(camel_case(str_singular($this->argument('entity'))));

        $this->table = $this->ask('Table name' , snake_case(str_plural($this->base)));

        $createLayers = [];

        foreach($this->layers as $layer)
        {

            $createLayer = $this->checkIfCreate($layer);

            if(!$createLayer)
            {
                $this->error('Aborted!');

                exit();
            }

            $createLayers[$layer] = true;

        }

        $this->info("The following files will be created:");

        foreach($createLayers as $layer => $create)
        {
            $file = $this->$layer->getFilename();

            $this->info($file);
        }

        if($this->confirm('Continue? [y|N]'))
        {


            foreach($createLayers as $layer => $create)
            {
                $generate = $this->$layer->generate();

                $this->info($generate);
            }

            $this->call('make:migration', [
                'name' => 'create_'.$this->table.'_table',
                '--create' => $this->table,
                '--table' => $this->table,
                '--path' => 'app/CMS/database/migrations'
            ]);

            $this->call('migrate', []);

        }
        else
        {
            $this->error('Aborted!');
        }

    }

    public function checkIfCreate($layer)
    {

        $this->$layer->setEntity($this->base);

        if($layer == 'entity')
        {
            $this->$layer->setTable($this->table);
        }

        $filename = $this->$layer->getFilename();

        $exists = $this->$layer->checkExists();

        if($exists)
        {
            return $this->confirm('File '.$filename.' exists. Overwrite? [y|N]');
        }

        return true;

    }

}
