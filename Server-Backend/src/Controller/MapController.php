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
    public function getMap(Request $request)
    {
        $mesuresService = new MesuresService($this->getDoctrine());
        $allMeasures = $mesuresService->getAllData();
        $networkService = new ReseauxService($this->getDoctrine());
        $requestBody = json_decode($request->getContent());
        $parameters = $requestBody->parametres;
        if($parameters != null && property_exists($parameters, "wifi") && property_exists($parameters, "mobile")){
            $allNetworks = array();
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
            //TODO filtres des mesures
            if(property_exists($parameters, "rayon_recherche") && $parameters->rayon_recherche != 0){
                if(property_exists($requestBody, "longitudeActuelle") && property_exists($requestBody, "latitudeActuelle")){
                    $longitude = $requestBody->longitudeActuelle;
                    $latitude = $requestBody->latitudeActuelle;
                    $rayonRecherche = $parameters->rayon_recherche;
                } else throw new BadRequestHttpException('ERREUR : filtre de rayon de recherche demandé sans avoir toutes les coordonnées actuelles', null, 400);
            } 
            //$parameters["bande_passante_minimale"];
        } else {
            throw new BadRequestHttpException('ERREUR : paramètres non fournis', null, 400);
        }
      //  $response = new Response( "{test: 'test'}");
        //TODO prendre en compte les filtres utilisateur
        //TODO clustering des mesures en fonction des réseaux
        return $this->getObjects($allNetworks);
    }
}