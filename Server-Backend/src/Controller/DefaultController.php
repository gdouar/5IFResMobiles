<?php

namespace App\Controller;

use App\Entity\Mesures;
use App\Entity\Reseaux;
use Doctrine\ORM\Query\ResultSetMapping;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\Query\ResultSetMappingBuilder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

/**
 * Class DefaultController
 * Contrôleur central
 * @package App\Controller
 */
class DefaultController extends Controller
{
    //TODO refactor 
    private $serializer;

    function __construct()
    {
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());
        $this->serializer = new Serializer($normalizers, $encoders);
    }

    /**
     * Retourne les différents réseaux et mesures correspondantes au format JSON.
     * TODO ajouter les filtres utilisateur
     * @return Response JSON la réponse backend
     * @throws \Exception 
     */
    public function getAllNetworksAndMeasures()
    {
        $em = $this->getDoctrine()->getManager();
        $rsm = new ResultSetMappingBuilder($em);  
        $rsm->addRootEntityFromClassMetadata(Reseaux::class, 'r');
        //$rsm->addJoinedEntityFromClassMetadata(Mesures::class, 'm', 'r', 'mesures');
        //TODO erreur ORM lorsqu'une jointure est faite => vérifier le mapping ? 

        $selectClause = $rsm ->generateSelectClause();
        $queryString = 'SELECT '.$selectClause.' from reseaux r '; //.'INNER JOIN mesures m on r.idreseau = m.idreseau';
        $query = $em->createNativeQuery($queryString, $rsm);
        $networks = $query->getResult();
        $jsonNetworks = ($this->serializer)->serialize($networks, 'json');
        $response = new Response($jsonNetworks);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}