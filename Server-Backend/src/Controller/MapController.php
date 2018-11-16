<?php

namespace App\Controller;

use App\Entity\Mesures;
use App\Entity\Reseaux;
use App\Repository\MesuresRepository;
use App\Repository\ReseauxRepository;
use App\Service\DBScanClustering;
use App\Util\GeoUtil;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Class MapController
 * @package App\Controller
 */
class MapController extends BaseController
{
    /**
     * Collecte les paramètres d'affichage et renvoie la carte
     * @param Request $request
     * @return Response
     * @throws \Doctrine\ORM\Query\QueryException
     */
    public function getMap(Request $request)
    {
        ini_set('memory_limit','1024M');

        $em = $this->getDoctrine()->getManager();
        /** @var MesuresRepository $mesuresRepo */
        $mesuresRepo = $em->getRepository(Mesures::class);
        $allMeasures = [];
        /** @var ReseauxRepository $networkRepo */
        $networkRepo = $em->getRepository(Reseaux::class);
        $requestBody = json_decode($request->getContent());
        // 1. Filtrage résultats
        if ($this->checkObjectAttribute($requestBody, "parametres")) {
            $parameters  = $requestBody->parametres;
            $allNetworks = [];
            // Filtrage réseaux
            if ($this->checkObjectAttribute($parameters, "wifi") && $this->checkObjectAttribute($parameters, "mobile")) {
                $filters = [];
                if (($parameters->wifi || $parameters->mobile)) {
                    if ($parameters->wifi) {
                        array_push($filters, "wifi");
                    }
                    if ($parameters->mobile) {
                        array_push($filters, "mobile");
                    }
                    $networkRepo->addTypeFilter($filters);
                    $allNetworks = $networkRepo->executeFilteredRequest();
                }
                // Filtrage bande passante
                if ($this->checkObjectAttribute($parameters, "bande_passante_minimale")) {
                    $mesuresRepo->addBandwidthFilter($parameters->bande_passante_minimale);
                    $mesuresRepo->sort();
                }
                $allMeasures = $mesuresRepo->executeFilteredRequest();
                // Filtrage géographique
                if ($this->checkObjectAttribute($parameters, "rayon_recherche") && $parameters->rayon_recherche != 0) {
                    if ($this->checkObjectAttribute($requestBody, "longitudeActuelle") && $this->checkObjectAttribute($requestBody, "latitudeActuelle")) {
                        $longitude      = $requestBody->longitudeActuelle;
                        $latitude       = $requestBody->latitudeActuelle;
                        $rayonRecherche = $parameters->rayon_recherche;
                        $allMeasures    = $this->geoFilter($allMeasures, $rayonRecherche, $latitude, $longitude);
                    } else {
                        throw new BadRequestHttpException('ERREUR : filtre de rayon de recherche demandé sans avoir toutes les coordonnées actuelles', null, 400);
                    }
                }
            }
        } else {
            throw new BadRequestHttpException('ERREUR : paramètres non fournis', null, 400);
        }       // L'utilisation du serializer a l'air de bugguer ici

        $data = $this->reverseObjectsAssociations($allNetworks, $allMeasures);

        foreach ($data as $network)
            $network->zones = GeoUtil::cluster($network->zones, 0.01);

        $response = new Response(json_encode($data));
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    }

    // il faudrait réfléchir à un changement d'association...
    private function reverseObjectsAssociations($allNetworks, $allMesures)
    {
        $finalArray = [];
        /** @var Reseaux $network */
        foreach ($allNetworks as $network) {
            $networkMesures = [];

            /** @var Mesures $measure */
            foreach ($allMesures as $measure) {
                if ($measure->getReseau() === $network) {
                    $networkMesures[] = (object)[
                        "idmesure"      => $measure->getIdMesure(),
                        "latitude"      => $measure->getLatitude(),
                        "longitude"     => $measure->getLongitude(),
                        "datemesure"    => $measure->getDateMesure(),
                        "bandepassante" => $measure->getBandePassante(),
                        "forcesignal"   => $measure->getForceSignal(),
                    ];
                }
            }

            $clusterer    = new DBScanClustering($networkMesures);
            $finalArray[] = (object)[
                "id_reseau" => $network->getIdReseau(),
                "ssid"      => $network->getSsid(),
                "zones"     => $clusterer->cluster(),
            ];
        }

        return $finalArray;
    }

    // Filtre géographique "rayon"
    // Eventuellement l'intégrer plus tard aux requêtes si possible ?
    private function geoFilter($mesuresArray, $nbKm, $currentLat, $currentLng)
    {
        return array_filter($mesuresArray, function ($mesure) use ($nbKm, $currentLat, $currentLng) {
            /** @var Mesures $mesure */
            return GeoUtil::isInRange($currentLat, $currentLng, $mesure->getLatitude(), $mesure->getLongitude(), $nbKm);
        });
    }
}