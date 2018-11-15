<?php

namespace App\Controller;

use App\Entity\Mesures;
use App\Entity\Reseaux;
use App\Repository\MesuresRepository;
use GuzzleHttp\Client;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

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
        $test = $request->get('ssid');
        $test2 =  $request->get('type');
        $reseaux = $entityManager->getRepository(Reseaux::class)->findBy(
            [
                'ssid'      => $request->get('ssid'),
                'type'      => $request->get('type'),
                'iprouteur' => $request->get('ip'),
            ]
        );

        /** @var Reseaux $reseau */
        $reseau = empty($reseaux)
            // Le réseau n'existe pas, on le crée via une requête POST au controller des réseaux
            ? $entityManager->getRepository(Reseaux::class)->find( // On récupère le réseau nouvellement créé
                json_decode( // On décode la réponse JSON
                    (new Client())->post( // Requête de création
                        $this->generateUrl( // Génération de l'URL par le routeur Symfo
                            'create_reseaux',
                            [],
                            UrlGeneratorInterface::ABSOLUTE_URL
                        ),
                        [ // Paramètres de création
                            'json' => [
                                'ssid' => $request->get('ssid'),
                                'type' => $request->get('type'),
                                'iprouteur' => $request->get('ip'),
                            ],
                        ]
                    )->getBody(),
                    true // On décode dans un tableau et pas un objet
                )['id'] // On récupère l'id dans le corp de la réponse
            )
            // Le réseau existe, on l'utilise tel quel
            : $reseaux[0];

        $mesure->setReseau($reseau);
        $mesure->setBandepassante($request->get('bande_passante'));
        $mesure->setDatemesure(new \DateTime());
        $mesure->setForcesignal($request->get('force'));
        $mesure->setLatitude($request->get('lat'));
        $mesure->setLongitude($request->get('lon'));

        // tell Doctrine you want to (eventually) save the Network (no queries yet)
        $entityManager->persist($mesure);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        $response = new Response(json_encode(['id' => $mesure->getIdmesure()]));
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    }

    public function getAllMesures()
    {
        /** @var MesuresRepository $repo */
        $repo = $this->getDoctrine()->getRepository(Mesures::class);
        return $this->getObjects($repo->getAllData());
    }

    // je hais cors
    public function sendShittyProtocolResponse(){
        $response = new Response();
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Headers', '*');
        return $response;
    }
}