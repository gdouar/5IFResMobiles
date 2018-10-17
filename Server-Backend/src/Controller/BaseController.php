<?php
/**
 * Created by PhpStorm.
 * User: Webcretaire
 * Date: 17/10/2018
 * Time: 09:11
 */

namespace App\Controller;


use App\Controller\DataService;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

class BaseController extends Controller
{
    protected $serializer;

    function __construct()
    {
        $encoders         = [new XmlEncoder(), new JsonEncoder()];
        $normalizers      = [new ObjectNormalizer()];
        $this->serializer = new Serializer($normalizers, $encoders);
    }

    protected function getObjects($service) {
        $collection      = $service->getAllData();
        $jsonCollection = ($this->serializer)->serialize($collection, 'json');
        $response     = new Response($jsonCollection); 
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}