<?php

namespace App\Service;

use Doctrine\ORM\EntityRepository;
use Doctrine\Common\Collections\ArrayCollection;

class DataService extends EntityRepository
{
    protected $doctrine;
    protected $criteria;
    protected $queryBuilder;
    protected $class;

    function __construct($doctrine, $class)
    {
        $em = $doctrine->getManager();
        parent::__construct($em, $em->getClassMetadata($class));
        $this->class = $class;
        $this->doctrine = $doctrine;
        $this->criteria = new ArrayCollection();
    }

    protected function getQueryBuilder(){
        if ($this->queryBuilder == null){
            $this->queryBuilder = $this->createQueryBuilder("T");
        }
        return $this->queryBuilder;
    }

        //exécution requête filtrée
    public function executeFilteredRequest(){
        return $this->getQueryBuilder()->getQuery()->execute();
    }
}