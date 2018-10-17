<?php

namespace App\Controller;

use App\Entity\Mesures;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class MesuresController
 *
 * @package App\Controller
 */
class MesuresController extends BaseController
{
    public function createMesures(Request $request)
    {
        // you can fetch the EntityManager via $this->getDoctrine()
        // or you can add an argument to your action: index(EntityManagerInterface $entityManager)
        $entityManager = $this->getDoctrine()->getManager();

        $mesure = new Mesures();
        $mesure->setIdreseau($request->get('reseau'));
        $mesure->setBandepassante($request->get('bande_passante'));
        $mesure->setDatemesure(new \DateTime());
        $mesure->setForcesignal($request->get('force'));
        $mesure->setLatitude($request->get('lat'));
        $mesure->setLongitude($request->get('lon'));

        // tell Doctrine you want to (eventually) save the Network (no queries yet)
        $entityManager->persist($mesure);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        return new Response(json_encode(['status' => 'OK']));
    }

    public function getAllMesures()
    {
        return $this->getObjects(Mesures::class);
    }
}