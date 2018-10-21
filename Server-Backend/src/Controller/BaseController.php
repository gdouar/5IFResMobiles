<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class BaseController extends Controller
{
    protected $serializer;

    function __construct()
    {
        $encoders         = [new XmlEncoder(), new JsonEncoder()];
        $normalizers      = [new ObjectNormalizer()];
        $this->serializer = new Serializer($normalizers, $encoders);
    }

    protected function getObjects($collection)
    {
        $jsonCollection = ($this->serializer)->serialize($collection, 'json');
        $response       = new Response($jsonCollection);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    protected function checkObjectAttribute($object, $fieldName)
    {
        return (property_exists($object, $fieldName)) && ($object->$fieldName !== null);
    }
}