<?php

namespace App\Util;

class GeoUtil
{
    /**
     * Retourne vrai si le point 2 est dans un rayon de NbKm du point 1
     */
    public static function isInRange($lat1, $lng1, $lat2, $lng2, $nbKm)
    {
        return (6371 * acos(
                    cos(deg2rad($lat1))
                    * cos(deg2rad($lat2))
                    * cos(deg2rad($lng2) - deg2rad($lng1))
                    + sin(deg2rad($lat1))
                    * sin(deg2rad($lat2))
                )
            ) < $nbKm;
    }

}