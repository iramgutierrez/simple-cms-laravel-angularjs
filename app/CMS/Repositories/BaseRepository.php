<?php

namespace CMS\Repositories;

use CMS\Entities\BaseEntity as Entity;

class BaseRepository
{
    protected $entity;

    public function __construct(Entity $Entity)
    {

        $this->entity = $Entity;

    }

    public function findById($id)
    {
        return $this->entity->find($id);
    }
}