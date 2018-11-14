<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class NetworkController
 *
 * @package App\Controller
 */
class NetworkController extends Controller
{
    public function getIp(Request $request)
    {
        $response = new Response(json_encode(['ip' => $request->getClientIp()]));
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    }
}