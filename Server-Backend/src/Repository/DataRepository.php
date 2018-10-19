<?php

namespace App\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;

class DataRepository extends EntityRepository
{
    /**
     * @var QueryBuilder
     */
    protected $queryBuilder;

    protected function getQueryBuilder()
    {
        if ($this->queryBuilder == null)
            $this->queryBuilder = $this->createQueryBuilder("T");

        return $this->queryBuilder;
    }

    //exécution requête filtrée
    public function executeFilteredRequest()
    {
        return $this->getQueryBuilder()->getQuery()->execute();
    }

    // Requête sans filtre
    public function getAllData()
    {
        return $this->getEntityManager()->getRepository($this->getClassName())->findAll();
    }
}