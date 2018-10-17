<?php

namespace App\Service;

class DataService 
{
    protected $doctrine;

    function __construct($doctrine)
    {
        $this->doctrine = $doctrine;
    }
}