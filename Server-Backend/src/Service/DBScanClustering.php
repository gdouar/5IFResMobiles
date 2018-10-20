<?php

namespace App\Service;

class DBScanClustering extends BaseClustering
{
    function __construct($matrix)
    {
        parent::__construct($matrix);
    }

    /**
     * Clustering DBScan
     */
    public function cluster()
    {
        $output = shell_exec("python ../python/dbscan.py \"[]\"");
        $result = json_decode($output);
        return  $result;
    }
}