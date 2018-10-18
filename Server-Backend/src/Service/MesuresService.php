<?php

namespace App\Service;

use App\Entity\Mesures;
use App\Service\DataService;
use App\Service\MesuresService;
use Doctrine\Common\Collections\Criteria;

class MesuresService extends DataService
{
    function __construct($doctrine)
    {
        parent::__construct($doctrine, Mesures::class);
    }

    // ajout filtrage GT sur la bande passante
    public function addBandwidthFilter($bandwidth){
        return $this->getQueryBuilder()->addCriteria(Criteria::create()->andWhere(Criteria::expr()->gte('T.bandepassante', $bandwidth)));
    }
    
    public function getAllData(){
        return  $this->doctrine->getRepository(Mesures::class)->findAll();
    }
}