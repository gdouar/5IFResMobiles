<?php

namespace App\Controller;

use App\Entity\Reseaux;
use App\Repository\ReseauxRepository;
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
        $reseau->setIprouteur($request->get('iprouteur'));

        // tell Doctrine you want to (eventually) save the Network (no queries yet)
        $entityManager->persist($reseau);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        return new Response(json_encode(['id' => $reseau->getIdreseau()]));
    }

    public function getAllReseaux()
    {
        /** @var ReseauxRepository $repo */
        $repo = $this->getDoctrine()->getRepository(Reseaux::class);
        return $this->getObjects($repo->getAllData());
    }
}