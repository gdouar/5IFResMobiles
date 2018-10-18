<?php

namespace App\Service;

use App\Entity\Reseaux;
use App\Service\DataService;
use App\Service\ReseauxService;
use Doctrine\Common\Collections\Criteria;

// Service accès aux données des réseaux
class ReseauxService extends DataService
{
    function __construct($doctrine)
    {
        parent::__construct($doctrine, Reseaux::class);
    }

    // ajout filtrage sur le TYPE IN
    public function addTypeFilter($typeFilters){
       return $this->getQueryBuilder()->addCriteria(Criteria::create()->andWhere(Criteria::expr()->in('T.type', $typeFilters)));
    }

    //exécution requête filtrée
    public function executeFilteredRequest(){
        return $this->getQueryBuilder()->getQuery()->execute();
    }

    // Requête sans filtre
    public function getAllData(){
        return  $this->doctrine->getRepository(Reseaux::class)->findAll();
    }


}