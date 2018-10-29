<?php

namespace App\Service;
use App\Util\CommandsUtil;

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
        $encodedMatrix = json_encode($this->measuresMatrix);
        $encodedMatrix = str_replace("\"", "\\\"", $encodedMatrix);
        // pirouette pour faire tout passer en ligne de commande

        $command = CommandsUtil::getPythonShellCommand() . " " . __DIR__ . "/../../python/dbscan.py " . $encodedMatrix;
        $output  = shell_exec($command);
        $result  = json_decode($output);
        return $result;
    }
}