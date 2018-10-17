<?php

namespace App\Controller;

use App\Entity\Mesures;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class MapController
 * @package App\Controller
 */
class MapController extends BaseController
{
    public function getMap()
    {
        $allMeasures = $this->forward('App\Controller\MesuresController::getAllMesures');
        $response = new Response( $allMeasures->getContent());
        //TODO prendre en compte les filtres utilisateur
        //TODO clustering des mesures en fonction des réseaux
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}