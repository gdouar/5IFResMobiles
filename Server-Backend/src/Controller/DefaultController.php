<?php

namespace App\Controller;

use App\Entity\Mesures;
use App\Entity\Reseaux;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

/**
 * Class DefaultController
 *
 * Contrôleur central
 * @package App\Controller
 */
class DefaultController extends Controller
{
    //TODO refactor
    private $serializer;

    function __construct()
    {
        $encoders         = [new XmlEncoder(), new JsonEncoder()];
        $normalizers      = [new ObjectNormalizer()];
        $this->serializer = new Serializer($normalizers, $encoders);
    }

    /**
     * Retourne les différents réseaux et mesures correspondantes au format JSON.
     * TODO ajouter les filtres utilisateur
     * @return Response JSON la réponse backend
     * @throws \Exception
     */
    public function getAllNetworks()
    {
        return $this->getObjects(Reseaux::class);
    }

    public function getAllMeasures()
    {
        return $this->getObjects(Mesures::class);
    }

    private function getObjects(string $type) {
        $mesures      = $this->getDoctrine()->getRepository($type)->findAll();
        $jsonNetworks = ($this->serializer)->serialize($mesures, 'json');
        $response     = new Response($jsonNetworks);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}