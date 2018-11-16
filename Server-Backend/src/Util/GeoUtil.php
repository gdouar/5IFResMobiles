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

    public static function cluster($zones, $nbKm): array
    {
        $out = [];

        foreach ($zones as $zone => $mesures) {
            foreach ($mesures as $mesure) {
                $cluster = -1;
                foreach ($out as $out_zone => $out_mesures) {
                    if (
                    self::isInRange(
                        $mesure->latitude, $mesure->longitude,
                        $out_mesures->latitude, $out_mesures->longitude,
                        $nbKm)
                    ) {
                        $cluster = $out_zone;
                        break;
                    }
                }
                if ($cluster >= 0) {
                    $out[$zone][$cluster]['mesures'][] = [
                        "idmesure"      => $mesure->idmesure,
                        "datemesure"    => $mesure->datemesure,
                        "bandepassante" => $mesure->bandepassante,
                        "forcesignal"   => $mesure->forcesignal,
                    ];
                } else {
                    $out[$zone][] = [
                        'latitude'  => $mesure->latitude,
                        'longitude' => $mesure->longitude,
                        'mesures'   => [
                            [
                                "idmesure"      => $mesure->idmesure,
                                "datemesure"    => $mesure->datemesure,
                                "bandepassante" => $mesure->bandepassante,
                                "forcesignal"   => $mesure->forcesignal,
                            ],
                        ],
                    ];
                }
            }
        }

        return $out;
    }
}