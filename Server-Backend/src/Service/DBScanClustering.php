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
        $encodedMatrix    = json_encode($this->measuresMatrix);
        $pythonDir        = __DIR__ . "/../../python/";
        $dataFile         = "data.json";
        $fullPathDataFile = $pythonDir . $dataFile;
        $fp               = fopen($fullPathDataFile, "a");
        $result           = [];
        if (flock($fp, LOCK_EX)) { // acquière un verrou exclusif
            fwrite($fp, $encodedMatrix . "\r\n");
            fflush($fp);            // libère le contenu avant d'enlever le verrou
            flock($fp, LOCK_UN);    // Enlève le verrou
            fclose($fp);
            $command = self::getPythonShellCommand() . " " . $pythonDir . "dbscan.py " . $fullPathDataFile;
            $output  = shell_exec($command);
            $result  = json_decode($output);
        } else {
            echo "Impossible de verrouiller le fichier dump !";
        }

        return $result;
        /* $encodedMatrix = json_encode($this->measuresMatrix);
         $encodedMatrix = str_replace("\"", "\\\"", $encodedMatrix);
         // pirouette pour faire tout passer en ligne de commande

         $command = CommandsUtil::getPythonShellCommand() . " " . __DIR__ . "/../../python/dbscan.py " . $encodedMatrix;
         $output  = shell_exec($command);
         $result  = json_decode($output);
         return $result;*/
    }

    public static function getPythonShellCommand(): string
    {
        return 'python3';
    }
}