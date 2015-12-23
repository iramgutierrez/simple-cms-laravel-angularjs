<?php

namespace IG\Repositories;

use IG\Entities\BaseEntity as Entity;

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