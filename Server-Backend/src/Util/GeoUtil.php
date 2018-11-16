<?php

namespace App\Util;

use App\Entity\Mesures;

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

    /**
     * Regroupe les mesures dans des clusters géograhiques
     * @param array $mesures Tableau de mesures
     * @param int   $nbKm    Distance pour le clustering
     * @return array Tableau groupé
     */
    public static function cluster($mesures, $nbKm): array
    {
        $out = [];

        /** @var Mesures $mesure */
        foreach ($mesures as $mesure) {
            $cluster = -1;

            foreach ($out as $key => $bag) {
                /** @var Mesures $compare */
                foreach ($bag as $compare) {
                    if (self::isInRange(
                        $mesure->getLatitude(), $mesure->getLongitude(),
                        $compare->getLatitude(), $compare->getLongitude(),
                        $nbKm)
                    ) {
                        $cluster = $key;
                        break;
                    }
                }
            }

            if ($cluster >= 0)
                $out[$cluster][] = $mesure;
            else
                $out[] = [$mesure];
        }

        return $out;
    }
}