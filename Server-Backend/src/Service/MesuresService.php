<?php

namespace App\Service;

use App\Entity\Mesures;
use App\Service\DataService;
use App\Service\MesuresService;

class MesuresService extends DataService
{
    function __construct($doctrine)
    {
        parent::__construct($doctrine, Mesures::class);
    }

    public function getAllData(){
        return  $this->doctrine->getRepository(Mesures::class)->findAll();
    }
}