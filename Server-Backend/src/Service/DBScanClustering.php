<?php

namespace App\Service;
use App\Util\CommandsUtil;

class DBScanClustering extends BaseClustering
{
    private static $factory;

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
        $pythonDir = __DIR__ . "/../../python/";
        $dataFile = "data.json";
        $fullPathDataFile = $pythonDir . $dataFile;
        if(!file_exists($fullPathDataFile)){
            $fp = fopen($fullPathDataFile , "w");
        }
        else {
            $fp = fopen($fullPathDataFile, "r+");
        }
        if (flock($fp, LOCK_EX )) { // acquière un verrou exclusif
            ftruncate($fp, 0);     // effacement du contenu
            fwrite($fp, $encodedMatrix);
            fflush($fp);            // libère le contenu avant d'enlever le verrou
            flock($fp, LOCK_UN);    // Enlève le verrou
            
            //TODO corriger bug de synchro ici, éventuellement utiliser des mutex ? => difficile car pas supportées sous Windows >:(
            $command = CommandsUtil::getPythonShellCommand() . " " . $pythonDir . "dbscan.py " . $fullPathDataFile;
            $output  = shell_exec($command); 
            
            fclose($fp);
        } else {
            echo "Impossible de verrouiller le fichier dump !";
        }
        $result  = json_decode($output);
        return $result;
    }
}