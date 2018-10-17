<?php
/**
 * Created by PhpStorm.
 * User: Webcretaire
 * Date: 17/10/2018
 * Time: 09:11
 */

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class BaseController extends Controller
{
    private $serializer;

    function __construct()
    {
        $encoders         = [new XmlEncoder(), new JsonEncoder()];
        $normalizers      = [new ObjectNormalizer()];
        $this->serializer = new Serializer($normalizers, $encoders);
    }

    protected function getObjects(string $type) {
        $mesures      = $this->getDoctrine()->getRepository($type)->findAll();
        $jsonNetworks = ($this->serializer)->serialize($mesures, 'json');
        $response     = new Response($jsonNetworks);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}