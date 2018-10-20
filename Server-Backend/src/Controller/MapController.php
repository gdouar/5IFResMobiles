<?php

namespace App\Controller;

use App\Util\GeoUtil;
use App\Entity\Mesures;
use App\Entity\Reseaux;
use App\Service\MesuresService;
use App\Service\ReseauxService;
use App\Service\DBScanClustering;
use App\Repository\MesuresRepository;
use App\Repository\ReseauxRepository;
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
        $em = $this->getDoctrine()->getManager();
        $mesuresRepo = new MesuresRepository($em); //$this->getDoctrine()->getRepository(Mesures::class);
        $allMeasures    = [];
        $networkRepo = new ReseauxRepository($em);
        $requestBody    = json_decode($request->getContent());
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
        $response = new Response(json_encode($this->reverseObjectsAssociations($allNetworks, $allMeasures)));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    // il faudrait réfléchir à un changement d'association...
    private function reverseObjectsAssociations($allNetworks, $allMesures)
    {
        $finalArray = [];
        foreach ($allNetworks as $network) {
            $networkMesures = [];
            //TODO clustering des mesures en fonction des réseaux
            foreach ($allMesures as $measure) {
                if ($measure->getIdReseau()->getIdReseau() == $network->getIdReseau()) {
                    array_push($networkMesures, (object)[
                        "idmesure"      => $measure->getIdMesure(),
                        "latitude"      => $measure->getLatitude(),
                        "longitude"     => $measure->getLongitude(),
                        "datemesure"    => $measure->getDateMesure(),
                        "bandepassante" => $measure->getBandePassante(),
                        "forcesignal"   => $measure->getForceSignal(),
                    ]);
                }
            }
            $clusterer = new DBScanClustering($networkMesures);
            array_push($finalArray, (object)[
                "id_reseau" => $network->getIdReseau(),
                "ssid"      => $network->getSsid(),
                "zones"   => $clusterer->cluster(),
            ]);
        }
        return $finalArray;
    }

    // Filtre géographique "rayon"
    // Eventuellement l'intégrer plus tard aux requêtes si possible ?
    private function geoFilter($mesuresArray, $nbKm, $currentLat, $currentLng)
    {
        return array_filter($mesuresArray, function ($mesure) use ($nbKm, $currentLat, $currentLng) {
            return GeoUtil::getDist($currentLat, $currentLng,
                                    $mesure->getLatitude(), $mesure->getLongitude(), $nbKm);
        });
    }


}