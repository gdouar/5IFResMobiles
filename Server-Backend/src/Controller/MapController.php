<?php

namespace App\Controller;

use App\Entity\Mesures;
use App\Service\MesuresService;
use App\Service\ReseauxService;
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
     */
    public function getMap(Request $request)
    {
        $mesuresService = new MesuresService($this->getDoctrine());
        $allMeasures = array();
        $networkService = new ReseauxService($this->getDoctrine());
        $requestBody = json_decode($request->getContent());
        if($this->checkObjectAttribute($requestBody, "parametres")){
            $parameters = $requestBody->parametres;
            $allNetworks = array();
            if($this->checkObjectAttribute($parameters, "wifi") && $this->checkObjectAttribute($parameters, "mobile")){
                $filters = array();
                if(($parameters->wifi || $parameters->mobile)){
                    if($parameters->wifi){
                        array_push($filters, "wifi");
                    }
                    if($parameters->mobile){
                        array_push($filters, "mobile");
                    }
                    $networkService->addTypeFilter($filters);
                    $allNetworks = $networkService->executeFilteredRequest();
                }
                if($this->checkObjectAttribute($parameters, "bande_passante_minimale")){
                    $mesuresService->addBandwidthFilter($parameters->bande_passante_minimale);
                }
                $allMeasures = $mesuresService->executeFilteredRequest();
                //TODO filtres des mesures
                if($this->checkObjectAttribute($parameters, "rayon_recherche") && $parameters->rayon_recherche != 0){
                    if($this->checkObjectAttribute($requestBody, "longitudeActuelle") && $this->checkObjectAttribute($requestBody, "latitudeActuelle")){
                        $longitude = $requestBody->longitudeActuelle;
                        $latitude = $requestBody->latitudeActuelle;
                        $rayonRecherche = $parameters->rayon_recherche;
                        $allMeasures = $this->geoFilter($allMeasures, $rayonRecherche, $latitude, $longitude);
                    } else throw new BadRequestHttpException('ERREUR : filtre de rayon de recherche demandé sans avoir toutes les coordonnées actuelles', null, 400);
                }
            }
           
        } else {
            throw new BadRequestHttpException('ERREUR : paramètres non fournis', null, 400);
        }

      //  $response = new Response( "{test: 'test'}");
        //TODO prendre en compte les filtres utilisateur
        //TODO clustering des mesures en fonction des réseaux
        return $this->getObjects($allNetworks);
    }

    // Filtre géographique "rayon"
    // Eventuellement l'intégrer plus tard aux requêtes si possible ?
    private function geoFilter($mesuresArray, $nbKm, $currentLat, $currentLng){
        return array_filter($mesuresArray, function($mesure) use($nbKm, $currentLat, $currentLng) {
                return (6371 * acos (
                      cos ( deg2rad($currentLat) )
                      * cos( deg2rad( $mesure->getLatitude()))
                      * cos( deg2rad( $mesure->getLongitude()) - deg2rad($currentLng) )
                      + sin ( deg2rad($currentLat))
                      * sin( deg2rad( $mesure->getLatitude()))
                    )
                  ) < $nbKm;
        });  
      } 

}