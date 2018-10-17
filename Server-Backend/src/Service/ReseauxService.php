<?php

namespace App\Service;

use App\Entity\Reseaux;
use App\Service\DataService;
use App\Service\ReseauxService;

class ReseauxService extends DataService
{
    function __construct($doctrine)
    {
        parent::__construct($doctrine);
    }

    public function getAllData(){
        return  $this->doctrine->getRepository(Reseaux::class)->findAll();
    }
}