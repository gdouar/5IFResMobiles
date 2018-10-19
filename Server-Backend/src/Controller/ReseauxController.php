<?php

namespace App\Controller;

use App\Entity\Reseaux;
use App\Service\ReseauxService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class ReseauxController
 *
 * @package App\Controller
 */
class ReseauxController extends BaseController
{
    public function createReseaux(Request $request)
    {
        // you can fetch the EntityManager via $this->getDoctrine()
        // or you can add an argument to your action: index(EntityManagerInterface $entityManager)
        $entityManager = $this->getDoctrine()->getManager();

        $reseau = new Reseaux();
        $reseau->setSsid($request->get('ssid'));
        $reseau->setType($request->get('type'));

        // tell Doctrine you want to (eventually) save the Network (no queries yet)
        $entityManager->persist($reseau);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        return new Response(json_encode(['status' => 'OK']));
    }

    public function getAllReseaux()
    {
        $service = new ReseauxService($this->getDoctrine());
        return $this->getObjects($service->getAllData());
    }
}