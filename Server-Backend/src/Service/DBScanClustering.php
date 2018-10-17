<?php

namespace App\Service;

use Phpml\Clustering\DBSCAN;
use App\Service\BaseClustering;

class DBScanClustering extends BaseClustering
{
    private $minPoints;
    private $epsilon;

    function __construct($matrix, $minPoints, $epsilon)
    {
        parent::__construct($matrix);
        $this->minPoints = $minPoints;
        $this->epsilon = $epsilon;
    }

    protected function cluster(){
        $dbscan = new DBSCAN($epsilon, $minPoints);
        return $dbscan->cluster($matrix);
    }
}