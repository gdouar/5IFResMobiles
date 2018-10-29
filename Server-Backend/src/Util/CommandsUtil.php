<?php

namespace App\Util;

class CommandsUtil
{
    /**
     * Remplacer cette valeur pour les tests en local par "python"
     */
    public static function getPythonShellCommand()
    {
        return "python3";
    }

}